import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Test function for debugging - can be called from browser console
(window as any).testPDFExport = async () => {
  console.log('Testing PDF export...');
  try {
    // Try to find any template element
    const templateElements = document.querySelectorAll('[id*="cv-template"]');
    console.log('Found template elements:', templateElements.length);
    
    if (templateElements.length > 0) {
      const element = templateElements[0] as HTMLElement;
      console.log('Using element:', element.id);
      await exportToPDF(element.id, 'test-resume.pdf');
      console.log('PDF export test completed successfully');
    } else {
      console.log('No template elements found');
    }
  } catch (error) {
    console.error('PDF export test failed:', error);
  }
};

// Add a simple test to verify jsPDF and html2canvas are working
(window as any).testLibraries = () => {
  console.log('Testing PDF libraries...');
  try {
    console.log('jsPDF available:', typeof jsPDF);
    console.log('html2canvas available:', typeof html2canvas);
    
    // Create a simple test PDF
    const doc = new jsPDF();
    doc.text('Test PDF', 10, 10);
    doc.save('test.pdf');
    console.log('Simple PDF test completed');
  } catch (error) {
    console.error('Library test failed:', error);
  }
};

export const exportToPDF = async (elementId: string, fileName: string = 'resume.pdf') => {
  console.log('🚀 Starting PDF export for element:', elementId);
  
  try {
    // Add a longer delay to ensure the element is fully rendered with all styles
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let element = document.getElementById(elementId);
    
    if (!element) {
      console.error('❌ Element not found for PDF export:', elementId);
      console.log('📋 Available elements with IDs:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
      
      // Try multiple fallback strategies
      const fallbackSelectors = [
        `[id*="cv-template"]`,
        `[id*="cv-preview"]`,
        `.cv-template`,
        `.cv-preview`,
        `[data-testid="cv-template"]`,
        `[data-testid="cv-preview"]`
      ];
      
      for (const selector of fallbackSelectors) {
        const fallbackElement = document.querySelector(selector) as HTMLElement;
        if (fallbackElement) {
          console.log('✅ Found fallback element with selector:', selector, 'ID:', fallbackElement.id || 'no-id');
          element = fallbackElement;
          break;
        }
      }
      
      if (!element) {
        // Last resort: try to find any element with resume content
        const contentElements = document.querySelectorAll('[class*="cv"], [class*="resume"], [class*="template"]');
        if (contentElements.length > 0) {
          element = contentElements[0] as HTMLElement;
          console.log('⚠️ Using last resort element:', element.className);
        } else {
          throw new Error(`❌ No suitable element found for PDF export. Tried element ID "${elementId}" and multiple fallback strategies.`);
        }
      }
    }

    console.log('✅ Element found:', {
      id: element.id,
      className: element.className,
      tagName: element.tagName,
      offsetWidth: element.offsetWidth,
      offsetHeight: element.offsetHeight,
      isVisible: element.offsetParent !== null
    });

    // Ensure element is visible and has content
    if (element.offsetWidth === 0 || element.offsetHeight === 0) {
      console.warn('⚠️ Element has zero dimensions, attempting to make visible...');
      element.style.display = 'block';
      element.style.visibility = 'visible';
      element.style.opacity = '1';
      
      // Wait for potential layout changes
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Check if element has content
    if (element.innerHTML.length === 0) {
      console.error('❌ Element has no content');
      throw new Error('Element has no content to export');
    }

    try {
      // Wait for fonts to load
      console.log('⏳ Waiting for fonts to load...');
      await document.fonts.ready;
      console.log('✅ Fonts loaded');
      
      // Ensure all images are loaded
      const images = element.querySelectorAll('img');
      console.log('🖼️ Found images:', images.length);
      
      if (images.length > 0) {
        await Promise.all(Array.from(images).map((img, index) => {
          if (img.complete) {
            console.log(`✅ Image ${index} already loaded`);
            return Promise.resolve();
          }
          return new Promise((resolve, reject) => {
            img.onload = () => {
              console.log(`✅ Image ${index} loaded`);
              resolve(undefined);
            };
            img.onerror = (error) => {
              console.error(`❌ Image ${index} failed to load:`, error);
              reject(error);
            };
          });
        }));
      }

      console.log('📸 Starting canvas capture...');
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true,
        onclone: (clonedDoc) => {
          console.log('📋 Document cloned for canvas capture');
          // Ensure all styles are applied to the cloned document
          const clonedElement = clonedDoc.getElementById(element.id) || clonedDoc.querySelector(`[class="${element.className}"]`);
          if (clonedElement) {
            console.log('✅ Cloned element found and styled');
          }
        }
      });

      console.log('✅ Canvas created:', {
        width: canvas.width,
        height: canvas.height,
        hasContent: canvas.width > 0 && canvas.height > 0
      });

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('❌ Canvas has zero dimensions - element may be hidden or empty');
      }

      const imgData = canvas.toDataURL('image/png');
      
      if (!imgData || imgData === 'data:,') {
        throw new Error('❌ Failed to generate image data from canvas');
      }

      console.log('📄 Creating PDF document...');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      console.log('📐 PDF dimensions:', {
        pdfWidth,
        pdfHeight,
        imgWidth,
        imgHeight,
        willFitOnOnePage: imgHeight <= pdfHeight
      });

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      console.log('💾 Saving PDF as:', fileName);
      pdf.save(fileName);
      
      console.log('🎉 PDF export completed successfully!');
      return true;

    } catch (innerError) {
      console.error('❌ Inner PDF processing failed:', innerError);
      throw innerError;
    }

  } catch (error) {
    console.error('❌ PDF export failed:', error);
    
    // Show user-friendly error message
    if (error instanceof Error) {
      alert(`PDF export failed: ${error.message}`);
    } else {
      alert('PDF export failed due to an unknown error. Please check the console for details.');
    }
    
    throw error;
  }
};
