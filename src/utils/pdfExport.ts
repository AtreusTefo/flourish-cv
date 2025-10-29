import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Validates that the PDF content matches the source element
 */
const validatePDFContent = (element: HTMLElement, canvas: HTMLCanvasElement): boolean => {
  // Check if canvas has content
  if (canvas.width === 0 || canvas.height === 0) {
    console.error('PDF validation failed: Canvas has no dimensions');
    return false;
  }

  // Check if element has visible content
  const hasText = element.textContent && element.textContent.trim().length > 0;
  if (!hasText) {
    console.error('PDF validation failed: Element has no text content');
    return false;
  }

  // Verify canvas has actual pixel data (not just blank)
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;

  const imageData = ctx.getImageData(0, 0, Math.min(canvas.width, 100), Math.min(canvas.height, 100));
  const hasContent = imageData.data.some((value, index) => {
    // Check RGB values (skip alpha channel at index % 4 === 3)
    return index % 4 !== 3 && value !== 255;
  });

  if (!hasContent) {
    console.error('PDF validation failed: Canvas appears to be blank');
    return false;
  }

  return true;
};

/**
 * Exports HTML element to PDF with multi-page support and style preservation
 */
export const exportToPDF = async (elementId: string, fileName: string = 'resume.pdf'): Promise<boolean> => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error('Element not found for PDF export');
    throw new Error('Element not found for PDF export');
  }

  try {
    // Clone element to avoid modifying original
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Ensure all images and fonts are loaded
    await document.fonts.ready;
    
    // Wait for images to load
    const images = element.querySelectorAll('img');
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve(true);
            } else {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(true);
            }
          })
      )
    );

    // Create canvas with high quality settings
    const canvas = await html2canvas(element, {
      scale: 3, // Higher quality for better text rendering
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
      imageTimeout: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // Ensure all styles are computed and visible
          clonedElement.style.display = 'block';
          clonedElement.style.visibility = 'visible';
        }
      },
    });

    // Validate PDF content
    if (!validatePDFContent(element, canvas)) {
      throw new Error('PDF validation failed: Content does not match source');
    }

    // A4 dimensions in mm
    const a4Width = 210;
    const a4Height = 297;
    
    // Calculate image dimensions
    const imgWidth = a4Width;
    const imgHeight = (canvas.height * a4Width) / canvas.width;
    
    // Create PDF in portrait mode
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Handle multi-page content
    let heightLeft = imgHeight;
    let position = 0;
    const imgData = canvas.toDataURL('image/png', 1.0);

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= a4Height;

    // Add additional pages if content exceeds one page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= a4Height;
    }
    
    // Add metadata
    pdf.setProperties({
      title: fileName.replace('.pdf', ''),
      subject: 'Professional Resume',
      author: 'CV Builder',
      creator: 'CV Builder Application',
    });

    // Save PDF
    pdf.save(fileName);
    
    // Return success
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
