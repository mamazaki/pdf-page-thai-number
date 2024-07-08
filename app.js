document.getElementById('pdfForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById('pdfFile');
    const position = document.getElementById('position').value;
    const pagesToExclude = document.getElementById('pageNumbers').value.split(',').map(num => parseInt(num.trim()));
    const numberType = document.getElementById('numberType').value;
    const fontSize = parseInt(document.getElementById('fontSize').value);
    const fontWeight = document.getElementById('fontWeight').value;

    const file = fileInput.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);

    // Register fontkit
    pdfDoc.registerFontkit(window.fontkit);

    const totalPages = pdfDoc.getPageCount();
    const thaiNumbers = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];
    const cmToPt = 28.3465; // 1 cm = 28.3465 points
    const inchToPt = 72; // 1 inch = 72 points

    // Load Thai font
    const fontUrl = './fonts/THSarabunNew.ttf';
    const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
    const thaiFont = await pdfDoc.embedFont(fontBytes);

    let topMargin = parseFloat(document.getElementById('topMargin')?.value || 0) * (document.getElementById('unit')?.value === 'cm' ? cmToPt : inchToPt);
    let bottomMargin = parseFloat(document.getElementById('bottomMargin')?.value || 0) * (document.getElementById('unit')?.value === 'cm' ? cmToPt : inchToPt);
    let rightMargin = parseFloat(document.getElementById('rightMargin')?.value || 0) * (document.getElementById('unit')?.value === 'cm' ? cmToPt : inchToPt);

    for (let i = 0; i < totalPages; i++) {
        if (!pagesToExclude.includes(i + 1)) {
            const page = pdfDoc.getPage(i);
            const text = (numberType === 'thai') ? (i + 1).toString().split('').map(digit => thaiNumbers[digit]).join('') : (i + 1).toString();
            let x, y;
            switch (position) {
                case 'top-center':
                    x = (page.getWidth() / 2) - (thaiFont.widthOfTextAtSize(text, fontSize) / 2);
                    y = page.getHeight() - topMargin;
                    break;
                case 'top-right':
                    x = page.getWidth() - rightMargin - thaiFont.widthOfTextAtSize(text, fontSize);
                    y = page.getHeight() - topMargin;
                    break;
                case 'bottom-center':
                    x = (page.getWidth() / 2) - (thaiFont.widthOfTextAtSize(text, fontSize) / 2);
                    y = bottomMargin - fontSize;
                    break;
                case 'bottom-right':
                    x = page.getWidth() - rightMargin - thaiFont.widthOfTextAtSize(text, fontSize);
                    y = bottomMargin - fontSize;
                    break;
            }
            const textColor = PDFLib.rgb(0, 0, 0); // Create Color object from RGB values
            page.drawText(text, { x, y, size: fontSize, font: thaiFont, color: textColor, fontWeight: fontWeight });
        }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<a href="${url}" target="_blank" class="btn btn-success">Download PDF</a>`;
});

function updateMarginFields() {
    const position = document.getElementById('position').value;
    const marginFields = document.getElementById('marginFields');
    let fieldsHtml = '';

    if (position === 'top-center') {
        fieldsHtml = `
            <label for="topMargin">ขอบบน:</label>
            <input type="number" id="topMargin" class="form-control mb-2" step="0.01">
            <label for="unit">หน่วย:</label>
            <select id="unit" class="form-control">
                <option value="cm">เซนติเมตร</option>
                <option value="in">นิ้ว</option>
            </select>
        `;
    } else if (position === 'top-right') {
        fieldsHtml = `
            <label for="topMargin">ขอบบน:</label>
            <input type="number" id="topMargin" class="form-control mb-2" step="0.01">
            <label for="rightMargin">ขอบขวา:</label>
            <input type="number" id="rightMargin" class="form-control mb-2" step="0.01">
            <label for="unit">หน่วย:</label>
            <select id="unit" class="form-control">
                <option value="cm">เซนติเมตร</option>
                <option value="in">นิ้ว</option>
            </select>
        `;
    } else if (position === 'bottom-center') {
        fieldsHtml = `
            <label for="bottomMargin">ขอบล่าง:</label>
            <input type="number" id="bottomMargin" class="form-control mb-2" step="0.01">
            <label for="unit">หน่วย:</label>
            <select id="unit" class="form-control">
                <option value="cm">เซนติเมตร</option>
                <option value="in">นิ้ว</option>
            </select>
        `;
    } else if (position === 'bottom-right') {
        fieldsHtml = `
            <label for="bottomMargin">ขอบล่าง:</label>
            <input type="number" id="bottomMargin" class="form-control mb-2" step="0.01">
            <label for="rightMargin">ขอบขวา:</label>
            <input type="number" id="rightMargin" class="form-control mb-2" step="0.01">
            <label for="unit">หน่วย:</label>
            <select id="unit" class="form-control">
                <option value="cm">เซนติเมตร</option>
                <option value="in">นิ้ว</option>
            </select>
        `;
    }

    marginFields.innerHTML = fieldsHtml;
}
