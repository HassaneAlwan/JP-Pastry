document.getElementById('downloadButton').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add title and header content to the PDF
    doc.setFontSize(22);
    doc.text('JP Pastries Menu', 20, 20);
    doc.setFontSize(16);
    doc.text('Our delicious pastries:', 20, 30);

    const products = document.querySelectorAll('.product');
    let yPos = 40;

    // Loop through each product and add it to the PDF
    products.forEach((product, index) => {
        const title = product.querySelector('h3').textContent;
        const desc = product.querySelector('p').textContent;
        const price = product.querySelector('span').textContent;
        const imgSrc = product.querySelector('img').src;

        // Use html2canvas to capture the image of the product
        html2canvas(product.querySelector('img'), {
            onrendered: function(canvas) {
                const imgData = canvas.toDataURL('image/png');

                // If it's not the first product, we need to create a new page
                if (index > 0) {
                    doc.addPage();
                }

                // Add the product info and image to the PDF
                doc.setFontSize(14);
                doc.text(`${title}: ${desc} - ${price}`, 20, yPos);
                yPos += 10;

                doc.addImage(imgData, 'PNG', 20, yPos, 60, 60);  // Insert the image into PDF
                yPos += 70;  // Adjust for image height

                // If there are too many products, adjust the yPos to add a new page
                if (yPos > 250) {
                    doc.addPage();
                    yPos = 20;  // Reset y position on new page
                }

                // After adding all products, save the PDF
                if (index === products.length - 1) {
                    doc.save('pastry-menu.pdf');
                }
            }
        });
    });
});
