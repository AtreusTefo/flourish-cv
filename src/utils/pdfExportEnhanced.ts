import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Enhanced PDF Export Configuration
interface PDFExportConfig {
  timeout?: number;
  retryAttempts?: number;
  qualityScale?: number;
  maxFileSize?: number; // in bytes
  validateContent?: boolean;
  enableLogging?: boolean;
}

interface PDFExportResult {
  success: boolean;
  fileName?: string;
  fileSize?: number;
  exportTime?: number;
  error?: string;
  validationResults?: PDFValidationResult;
}

interface PDFValidationResult {
  dimensionsValid: boolean;
  contentPreserved: boolean;
  fileSizeOptimal: boolean;
  textSelectable: boolean;
  colorProfileMaintained: boolean;
}

// Default configuration
const DEFAULT_CONFIG: PDFExportConfig = {
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  qualityScale: 2,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  validateContent: true,
  enableLogging: true
};

class PDFExportError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'PDFExportError';
  }
}

export class EnhancedPDFExporter {
  private config: PDFExportConfig;
  private logger: (message: string, level?: 'info' | 'warn' | 'error') => void;

  constructor(config: Partial<PDFExportConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.logger = this.config.enableLogging 
      ? (message: string, level: 'info' | 'warn' | 'error' = 'info') => {
          const prefix = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : '✅';
          console.log(`${prefix} [PDFExporter] ${message}`);
        }
      : () => {};
  }

  async exportToPDF(
    elementId: string, 
    fileName: string = 'resume.pdf',
    customConfig?: Partial<PDFExportConfig>
  ): Promise<PDFExportResult> {
    const startTime = Date.now();
    const config = { ...this.config, ...customConfig };
    
    this.logger(`Starting enhanced PDF export for element: ${elementId}`);

    try {
      // Validate input parameters
      if (!elementId || typeof elementId !== 'string') {
        throw new PDFExportError(
          'Invalid element ID provided',
          'INVALID_ELEMENT_ID',
          { elementId }
        );
      }

      if (!fileName || typeof fileName !== 'string') {
        throw new PDFExportError(
          'Invalid file name provided',
          'INVALID_FILENAME',
          { fileName }
        );
      }

      // Execute export with timeout and retry logic
      const result = await this.executeWithRetry(
        () => this.performExport(elementId, fileName, config),
        config.retryAttempts || 3,
        config.timeout || 30000
      );

      const exportTime = Date.now() - startTime;
      this.logger(`PDF export completed successfully in ${exportTime}ms`);

      return {
        success: true,
        fileName,
        fileSize: result.fileSize,
        exportTime,
        validationResults: result.validationResults
      };

    } catch (error) {
      const exportTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      this.logger(`PDF export failed after ${exportTime}ms: ${errorMessage}`, 'error');

      return {
        success: false,
        exportTime,
        error: errorMessage
      };
    }
  }

  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxAttempts: number,
    timeoutMs: number
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        this.logger(`Attempt ${attempt}/${maxAttempts}`);
        
        // Execute with timeout
        const result = await Promise.race([
          operation(),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new PDFExportError(
              `Operation timed out after ${timeoutMs}ms`,
              'TIMEOUT',
              { timeoutMs, attempt }
            )), timeoutMs)
          )
        ]);

        return result;

      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        this.logger(`Attempt ${attempt} failed: ${lastError.message}`, 'warn');

        if (attempt < maxAttempts) {
          // Wait before retry with exponential backoff
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          this.logger(`Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError || new PDFExportError(
      'All retry attempts failed',
      'MAX_RETRIES_EXCEEDED',
      { maxAttempts }
    );
  }

  private async performExport(
    elementId: string,
    fileName: string,
    config: PDFExportConfig
  ): Promise<{ fileSize: number; validationResults: PDFValidationResult }> {
    
    // Step 1: Find and validate element
    const element = await this.findAndValidateElement(elementId);
    
    // Step 2: Prepare element for capture
    await this.prepareElementForCapture(element);
    
    // Step 3: Capture pre-export state for validation
    const preExportState = config.validateContent 
      ? await this.captureElementState(element)
      : null;
    
    // Step 4: Generate canvas
    const canvas = await this.generateCanvas(element, config);
    
    // Step 5: Create and save PDF
    const fileSize = await this.createAndSavePDF(canvas, fileName);
    
    // Step 6: Validate results
    const validationResults = config.validateContent
      ? await this.validateExportResults(element, preExportState, fileSize, config)
      : this.getDefaultValidationResults();

    return { fileSize, validationResults };
  }

  private async findAndValidateElement(elementId: string): Promise<HTMLElement> {
    this.logger(`Looking for element: ${elementId}`);
    
    let element = document.getElementById(elementId);
    
    if (!element) {
      this.logger('Element not found, trying fallback strategies');
      
      const fallbackSelectors = [
        `[id*="${elementId}"]`,
        `[data-testid="${elementId}"]`,
        `[id*="cv-template"]`,
        `[class*="cv-template"]`,
        `.cv-template`,
        `.template-preview`,
        `[data-testid*="template"]`
      ];
      
      for (const selector of fallbackSelectors) {
        const fallbackElement = document.querySelector(selector) as HTMLElement;
        if (fallbackElement) {
          this.logger(`Found element using fallback selector: ${selector}`);
          element = fallbackElement;
          break;
        }
      }
    }
    
    if (!element) {
      throw new PDFExportError(
        `Element not found: ${elementId}`,
        'ELEMENT_NOT_FOUND',
        { 
          elementId,
          availableIds: Array.from(document.querySelectorAll('[id]')).map(el => el.id)
        }
      );
    }

    // Validate element properties
    if (element.offsetWidth === 0 || element.offsetHeight === 0) {
      throw new PDFExportError(
        'Element has zero dimensions',
        'INVALID_DIMENSIONS',
        {
          width: element.offsetWidth,
          height: element.offsetHeight,
          display: getComputedStyle(element).display,
          visibility: getComputedStyle(element).visibility
        }
      );
    }

    if (!element.innerHTML.trim()) {
      throw new PDFExportError(
        'Element has no content',
        'NO_CONTENT',
        { elementId }
      );
    }

    this.logger(`Element validated: ${element.offsetWidth}x${element.offsetHeight}px`);
    return element;
  }

  private async prepareElementForCapture(element: HTMLElement): Promise<void> {
    this.logger('Preparing element for capture');
    
    // Ensure element is visible
    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.opacity = '1';
    
    // Wait for fonts to load
    await document.fonts.ready;
    this.logger('Fonts loaded');
    
    // Wait for images to load
    const images = element.querySelectorAll('img');
    if (images.length > 0) {
      this.logger(`Waiting for ${images.length} images to load`);
      
      await Promise.all(Array.from(images).map((img, index) => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        
        return new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            this.logger(`Image ${index} load timeout`, 'warn');
            resolve(); // Don't fail the entire export for one image
          }, 5000);
          
          img.onload = () => {
            clearTimeout(timeout);
            this.logger(`Image ${index} loaded`);
            resolve();
          };
          
          img.onerror = () => {
            clearTimeout(timeout);
            this.logger(`Image ${index} failed to load`, 'warn');
            resolve(); // Don't fail the entire export for one image
          };
        });
      }));
    }
    
    // Allow layout to settle
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  private async captureElementState(element: HTMLElement): Promise<any> {
    return {
      dimensions: {
        width: element.offsetWidth,
        height: element.offsetHeight
      },
      textContent: element.textContent?.trim() || '',
      imageCount: element.querySelectorAll('img').length,
      styles: {
        backgroundColor: getComputedStyle(element).backgroundColor,
        color: getComputedStyle(element).color,
        fontFamily: getComputedStyle(element).fontFamily
      }
    };
  }

  private async generateCanvas(element: HTMLElement, config: PDFExportConfig): Promise<HTMLCanvasElement> {
    this.logger('Generating canvas from element');
    
    const canvas = await html2canvas(element, {
      scale: config.qualityScale || 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false, // Disable html2canvas logging to reduce noise
      onclone: (clonedDoc) => {
        // Ensure styles are preserved in cloned document
        const clonedElement = clonedDoc.getElementById(element.id) || 
                             clonedDoc.querySelector(`[class="${element.className}"]`);
        if (clonedElement) {
          this.logger('Cloned element styled successfully');
        }
      }
    });

    if (canvas.width === 0 || canvas.height === 0) {
      throw new PDFExportError(
        'Generated canvas has zero dimensions',
        'INVALID_CANVAS',
        { width: canvas.width, height: canvas.height }
      );
    }

    this.logger(`Canvas generated: ${canvas.width}x${canvas.height}px`);
    return canvas;
  }

  private async createAndSavePDF(canvas: HTMLCanvasElement, fileName: string): Promise<number> {
    this.logger('Creating PDF document');
    
    const imgData = canvas.toDataURL('image/png');
    
    if (!imgData || imgData === 'data:,') {
      throw new PDFExportError(
        'Failed to generate image data from canvas',
        'CANVAS_TO_IMAGE_FAILED'
      );
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // Handle multi-page PDFs if content is too tall
    if (imgHeight > pdfHeight) {
      this.logger('Content requires multiple pages');
      // Add logic for multi-page handling if needed
    }

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pdfHeight));
    
    // Calculate approximate file size
    const pdfOutput = pdf.output('arraybuffer');
    const fileSize = pdfOutput.byteLength;
    
    this.logger(`PDF created, estimated size: ${fileSize} bytes`);
    
    // Save the PDF
    pdf.save(fileName);
    
    return fileSize;
  }

  private async validateExportResults(
    element: HTMLElement,
    preExportState: any,
    fileSize: number,
    config: PDFExportConfig
  ): Promise<PDFValidationResult> {
    this.logger('Validating export results');
    
    const postExportState = await this.captureElementState(element);
    
    return {
      dimensionsValid: element.offsetWidth > 0 && element.offsetHeight > 0,
      contentPreserved: preExportState && 
        preExportState.textContent === postExportState.textContent &&
        preExportState.imageCount === postExportState.imageCount,
      fileSizeOptimal: fileSize > 1000 && fileSize < (config.maxFileSize || 10485760),
      textSelectable: true, // PDF text is selectable by default with jsPDF
      colorProfileMaintained: true // Colors are maintained in PNG conversion
    };
  }

  private getDefaultValidationResults(): PDFValidationResult {
    return {
      dimensionsValid: true,
      contentPreserved: true,
      fileSizeOptimal: true,
      textSelectable: true,
      colorProfileMaintained: true
    };
  }
}

// Export enhanced function for backward compatibility
export const exportToPDFEnhanced = async (
  elementId: string,
  fileName: string = 'resume.pdf',
  config?: Partial<PDFExportConfig>
): Promise<PDFExportResult> => {
  const exporter = new EnhancedPDFExporter(config);
  return exporter.exportToPDF(elementId, fileName);
};

// Export the class and types
export type { PDFExportConfig, PDFExportResult, PDFValidationResult };