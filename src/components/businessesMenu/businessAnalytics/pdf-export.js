import { jsPDF } from 'jspdf';

export const exportChartsToPDF = (chartIds, dimensions) => {
    const pdf = new jsPDF('p', 'mm', 'a4');

    chartIds.forEach((chartId, index) => {
        const chartElement = document.getElementById(chartId);
        if (chartElement) {
            const dataURL = chartElement.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(dataURL);
            const pdfWidth = dimensions[ index ][ 2 ] || imgProps.width * 0.2645833333; // Convert width from px to mm (1px = 0.2645833333mm)
            const pdfHeight = dimensions[ index ][ 3 ] || imgProps.height * 0.2645833333; // Convert height from px to mm (1px = 0.2645833333mm)

            pdf.addImage(dataURL, 'PNG', dimensions[ index ][ 0 ] || 10, dimensions[ index ][ 1 ] || 10, pdfWidth, pdfHeight);
        } else {
            console.log(`Chart element with ID ${chartId} not found`);
        }
    });

    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const fileName = `${month}-${year}.pdf`;

    pdf.save(fileName);
};