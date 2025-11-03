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
    scale: 3, // Higher scale for better quality on high-DPI displays
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
    
    console.log('🚀 Starting improved PDF export for element:', elementId);
    console.log('📋 Export configuration:', config);

    try {
      // Set timeout for the entire operation
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('PDF export timeout')), config.timeout);
      });

      const exportPromise = this.performExport(elementId, config);
      
      return await Promise.race([exportPromise, timeoutPromise]);
      
    } catch (error) {
      console.error('❌ PDF export failed:', error);
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
    
    // Step 2: Prepare element for capture
    await this.prepareElementForCapture(element);
    
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
  }

  private static async findAndValidateElement(elementId: string): Promise<HTMLElement> {
    console.log('🔍 Finding element:', elementId);
    
    let element = document.getElementById(elementId);
    
    if (!element) {
      console.warn('⚠️ Element not found, trying fallback strategies...');
      
      const fallbackSelectors = [
        `[id*="cv-template"]`,
        `[id*="cv-preview"]`,
        `.cv-template`,
        `.cv-preview`,
        `[data-testid="cv-template"]`,
        `[data-testid="cv-preview"]`,
        '[class*="cv"]',
        '[class*="resume"]',
        '[class*="template"]'
      ];
      
      for (const selector of fallbackSelectors) {
        const fallbackElement = document.querySelector(selector) as HTMLElement;
        if (fallbackElement && fallbackElement.offsetWidth > 0 && fallbackElement.offsetHeight > 0) {
          console.log('✅ Found fallback element with selector:', selector);
          element = fallbackElement;
          break;
        }
      }
      
      if (!element) {
        throw new Error(`Element with ID "${elementId}" not found and no suitable fallback found`);
      }
    }

    // Validate element has content and dimensions
    if (element.offsetWidth === 0 || element.offsetHeight === 0) {
      throw new Error('Element has zero dimensions');
    }

    if (element.innerHTML.trim().length === 0) {
      throw new Error('Element has no content');
    }

    console.log('✅ Element validated:', {
      id: element.id,
      className: element.className,
      dimensions: `${element.offsetWidth}x${element.offsetHeight}`,
      contentLength: element.innerHTML.length
    });

    return element;
  }

  private static async prepareElementForCapture(element: HTMLElement): Promise<void> {
    console.log('🎨 Preparing element for capture...');
    
    // Ensure element is visible
    const originalStyles = {
      display: element.style.display,
      visibility: element.style.visibility,
      opacity: element.style.opacity,
      position: element.style.position
    };

    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.opacity = '1';
    
    // Force layout recalculation
    element.offsetHeight;
    
    // Wait for any CSS transitions to complete
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('✅ Element prepared for capture');
  }

  private static async waitForResources(element: HTMLElement): Promise<void> {
    console.log('⏳ Waiting for resources to load...');
    
    // Wait for fonts
    console.log('📝 Waiting for fonts...');
    await document.fonts.ready;
    
    // Additional wait to ensure web fonts are fully applied
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Wait for images
    const images = element.querySelectorAll('img');
    console.log('🖼️ Found images:', images.length);
    
    if (images.length > 0) {
      await Promise.all(Array.from(images).map((img, index) => {
        if (img.complete && img.naturalWidth > 0) {
          console.log(`✅ Image ${index} already loaded`);
          return Promise.resolve();
        }
        
        return new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            console.warn(`⚠️ Image ${index} load timeout`);
            resolve(); // Don't fail the entire export for one image
          }, 5000);
          
          img.onload = () => {
            clearTimeout(timeout);
            console.log(`✅ Image ${index} loaded`);
            resolve();
          };
          
          img.onerror = () => {
            clearTimeout(timeout);
            console.warn(`⚠️ Image ${index} failed to load`);
            resolve(); // Don't fail the entire export for one image
          };
        });
      }));
    }
    
    console.log('✅ All resources loaded');
  }

  private static async checkIfMultiPageNeeded(element: HTMLElement): Promise<boolean> {
    // A4 dimensions in pixels at 96 DPI
    const A4_HEIGHT_PX = 1123; // 297mm at 96 DPI
    const elementHeight = element.scrollHeight;
    
    console.log('📏 Checking if multi-page needed:', {
      elementHeight,
      A4_HEIGHT_PX,
      needsMultiPage: elementHeight > A4_HEIGHT_PX
    });
    
    return elementHeight > A4_HEIGHT_PX;
  }

  private static async exportSinglePage(
    element: HTMLElement, 
    config: Required<PDFExportOptions>
  ): Promise<PDFExportResult> {
    console.log('📄 Exporting single page PDF...');
    
    const canvas = await html2canvas(element, {
      scale: config.scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 10000,
      removeContainer: true,
      foreignObjectRendering: true,
      onclone: (clonedDoc) => {
        // Ensure all styles are preserved in the clone
        const clonedElement = clonedDoc.getElementById(element.id) || 
                             clonedDoc.querySelector(`[class="${element.className}"]`);
        if (clonedElement) {
          // Force high-quality text rendering with proper type casting
          const style = (clonedElement as HTMLElement).style as any;
          style.fontSmooth = 'always';
          style.webkitFontSmoothing = 'antialiased';
          style.mozOsxFontSmoothing = 'grayscale';
        }
      }
    });

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas has zero dimensions');
    }

    const imgData = canvas.toDataURL('image/png', config.quality);
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // If content is taller than page, scale it down to fit
    if (imgHeight > pdfHeight) {
      const scaleFactor = pdfHeight / imgHeight;
      const scaledWidth = imgWidth * scaleFactor;
      const scaledHeight = pdfHeight;
      const xOffset = (pdfWidth - scaledWidth) / 2;
      
      pdf.addImage(imgData, 'PNG', xOffset, 0, scaledWidth, scaledHeight);
    } else {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    }

    pdf.save(config.fileName);
    
    console.log('✅ Single page PDF exported successfully');
    
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
    console.log('📄📄 Exporting multi-page PDF...');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate how many "pages" we need based on element height
    const A4_HEIGHT_PX = 1123; // 297mm at 96 DPI
    const elementHeight = element.scrollHeight;
    const pageCount = Math.min(Math.ceil(elementHeight / A4_HEIGHT_PX), config.maxPages);
    
    console.log('📊 Multi-page calculation:', {
      elementHeight,
      A4_HEIGHT_PX,
      calculatedPages: pageCount
    });

    for (let page = 0; page < pageCount; page++) {
      console.log(`📄 Processing page ${page + 1}/${pageCount}...`);
      
      const yOffset = page * A4_HEIGHT_PX;
      const pageHeight = Math.min(A4_HEIGHT_PX, elementHeight - yOffset);
      
      // Create a temporary container for this page's content
      const pageContainer = document.createElement('div');
      pageContainer.style.position = 'absolute';
      pageContainer.style.left = '-9999px';
      pageContainer.style.top = '0';
      pageContainer.style.width = `${element.offsetWidth}px`;
      pageContainer.style.height = `${pageHeight}px`;
      pageContainer.style.overflow = 'hidden';
      
      // Clone the element content
      const clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.style.marginTop = `-${yOffset}px`;
      pageContainer.appendChild(clonedElement);
      
      document.body.appendChild(pageContainer);
      
      try {
        const canvas = await html2canvas(pageContainer, {
          scale: config.scale,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          width: element.offsetWidth,
          height: pageHeight
        });

        const imgData = canvas.toDataURL('image/png', config.quality);
        
        if (page > 0) {
          pdf.addPage();
        }
        
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pdfHeight));
        
      } finally {
        document.body.removeChild(pageContainer);
      }
    }

    pdf.save(config.fileName);
    
    console.log('✅ Multi-page PDF exported successfully');
    
    return {
      success: true,
      fileName: config.fileName,
      pageCount: pageCount
    };
  }
}

// Backward compatibility export
export const exportToPDF = async (elementId: string, fileName: string = 'resume.pdf') => {
  const result = await ImprovedPDFExporter.exportToPDF(elementId, { fileName });
  if (!result.success) {
    throw new Error(result.error || 'PDF export failed');
  }
  return result.success;
};

// Enhanced export function with full options
export const exportToPDFEnhanced = async (
  elementId: string, 
  options: PDFExportOptions = {}
): Promise<PDFExportResult> => {
  return await ImprovedPDFExporter.exportToPDF(elementId, options);
};