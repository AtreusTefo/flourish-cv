import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (elementId: string, fileName: string = 'resume.pdf') => {
  const element = document.getElementById(elementId);

  if (!element) {
    const error = new Error(`Element with id "${elementId}" not found for PDF export`);
    console.error(error.message);
    throw error;
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      removeContainer: false,
      imageTimeout: 15000,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas has no dimensions. The element may be empty or hidden.');
    }

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let pdfHeight = imgHeight;
    const maxPdfHeight = 297;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgData = canvas.toDataURL('image/png', 1.0);

    if (!imgData || imgData === 'data:,') {
      throw new Error('Failed to generate image data from canvas');
    }

    if (pdfHeight <= maxPdfHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pdfHeight);
    } else {
      let heightLeft = imgHeight;
      let position = 0;

      while (heightLeft > 0) {
        const pageHeight = Math.min(heightLeft, maxPdfHeight);

        if (position > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          imgData,
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -= maxPdfHeight;
        position -= maxPdfHeight;
      }
    }

    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
