import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PDFExportOptions {
  fileName?: string;
  scale?: number;
  maxPages?: number;
  pageBreakSelector?: string;
  quality?: number;
  timeout?: number;
}

interface PDFExportResult {
  success: boolean;
  fileName: string;
  pageCount: number;
  fileSize?: number;
  error?: string;
}

export class ImprovedPDFExporter {
  private static readonly DEFAULT_OPTIONS: Required<PDFExportOptions> = {
    fileName: 'resume.pdf',
    scale: 3, // Increased scale for better quality
    maxPages: 10,
    pageBreakSelector: '.page-break, .cv-section',
    quality: 0.95,
    timeout: 30000, // 30 seconds timeout
  };

  /**
   * Export element to PDF with improved quality and multi-page support
   */
  static async exportToPDF(
    elementId: string, 
    options: PDFExportOptions = {}
  ): Promise<PDFExportResult> {
    const config = { ...this.DEFAULT_OPTIONS, ...options };

    try {
      // Set timeout for the entire operation
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('PDF export timeout')), config.timeout);
      });

      const exportPromise = this.performExport(elementId, config);
      
      return await Promise.race([exportPromise, timeoutPromise]);
      
    } catch (error) {
      return {
        success: false,
        fileName: config.fileName,
        pageCount: 0,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private static async performExport(
    elementId: string, 
    config: Required<PDFExportOptions>
  ): Promise<PDFExportResult> {
    
    // Step 1: Find and validate the element
    const element = await this.findAndValidateElement(elementId);
    
    // Step 2: Prepare element for capture; receive a restore callback
    const restoreStyles = await this.prepareElementForCapture(element);
    
    try {
      // Step 3: Wait for all resources to load
      await this.waitForResources(element);
      
      // Step 4: Determine if multi-page export is needed
      const needsMultiPage = await this.checkIfMultiPageNeeded(element);
      
      // Step 5: Export based on content size
      if (needsMultiPage) {
        return await this.exportMultiPage(element, config);
      } else {
        return await this.exportSinglePage(element, config);
      }
    } finally {
      // Always restore original styles after capture, success or failure
      restoreStyles();
    }
  }

  private static async findAndValidateElement(elementId: string): Promise<HTMLElement> {
    let element = document.getElementById(elementId);
    
    if (!element) {
      const fallbackSelectors = [
        `[id*="cv-template"]`,
        `[id*="cv-preview"]`,
        `.cv-template`,
        `.cv-preview`,
        `[class*="template"]`
      ];
      
      for (const selector of fallbackSelectors) {
        const fallbackElement = document.querySelector(selector) as HTMLElement;
        if (fallbackElement) {
          element = fallbackElement;
          break;
        }
      }
    }
    
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found and no fallback elements available`);
    }
    
    // Validate element has content
    if (element.offsetHeight === 0 || element.offsetWidth === 0) {
      throw new Error('Element has no visible content');
    }
    
    return element;
  }

  private static async prepareElementForCapture(element: HTMLElement): Promise<() => void> {
    // Snapshot current inline styles so we can restore them after capture
    const originalStyle = element.style.cssText;
    
    // Apply minimal styles needed to ensure proper rendering
    element.style.position = 'relative';
    element.style.backgroundColor = element.style.backgroundColor || '#ffffff';
    
    // Wait for layout to stabilize
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Return a restore callback — caller must invoke this after capture completes
    return () => {
      element.style.cssText = originalStyle;
    };
  }

  private static async waitForResources(element: HTMLElement): Promise<void> {
    // Wait for images to load
    const images = element.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve; // Continue even if image fails to load
        setTimeout(resolve, 2000); // Timeout after 2 seconds
      });
    });
    
    await Promise.all(imagePromises);
    
    // Additional wait for any remaining resources
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  private static async checkIfMultiPageNeeded(element: HTMLElement): Promise<boolean> {
    const elementHeight = element.scrollHeight;
    const maxSinglePageHeight = 1200; // Approximate A4 height in pixels
    
    return elementHeight > maxSinglePageHeight;
  }

  private static async exportSinglePage(
    element: HTMLElement, 
    config: Required<PDFExportOptions>
  ): Promise<PDFExportResult> {
    
    const canvas = await html2canvas(element, {
      scale: config.scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      removeContainer: true,
      imageTimeout: 5000,
      onclone: (clonedDoc) => {
        // Ensure all styles are applied to the cloned document
        const clonedElement = clonedDoc.getElementById(element.id);
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.position = 'static';
        }
      }
    });

    const imgData = canvas.toDataURL('image/jpeg', config.quality);
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    if (imgHeight <= pdfHeight) {
      // Fits on one page
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else {
      // Scale to fit page height
      const scaledHeight = pdfHeight;
      const scaledWidth = (canvas.width * pdfHeight) / canvas.height;
      pdf.addImage(imgData, 'JPEG', (pdfWidth - scaledWidth) / 2, 0, scaledWidth, scaledHeight);
    }
    
    pdf.save(config.fileName);
    
    return {
      success: true,
      fileName: config.fileName,
      pageCount: 1,
      fileSize: imgData.length
    };
  }

  private static async exportMultiPage(
    element: HTMLElement, 
    config: Required<PDFExportOptions>
  ): Promise<PDFExportResult> {
    
    const canvas = await html2canvas(element, {
      scale: config.scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      height: element.scrollHeight,
      windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/jpeg', config.quality);
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;
    let pageCount = 0;
    
    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
    pageCount++;
    
    // Add additional pages if needed
    while (heightLeft >= 0 && pageCount < config.maxPages) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      pageCount++;
    }
    
    pdf.save(config.fileName);
    
    return {
      success: true,
      fileName: config.fileName,
      pageCount,
      fileSize: imgData.length
    };
  }
}

// Export the main function for backward compatibility
export const exportToPDF = async (
  elementId: string, 
  fileName: string = 'resume.pdf'
): Promise<void> => {
  const result = await ImprovedPDFExporter.exportToPDF(elementId, { fileName });
  
  if (!result.success) {
    throw new Error(result.error || 'PDF export failed');
  }
};