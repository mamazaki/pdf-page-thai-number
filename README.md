# pdf-page-thai-number

## Description / คำอธิบาย
The `pdf-page-thai-number` project is a tool to add page numbers to PDF files using either Thai or Arabic numerals. It allows users to specify the position and margin of the page numbers. This tool uses JavaScript and PDFLib to create and modify PDF files easily.

โปรเจค `pdf-page-thai-number` เป็นเครื่องมือที่ช่วยในการเติมเลขหน้าในไฟล์ PDF โดยใช้ตัวเลขไทยหรือตัวเลขอารบิกได้ตามต้องการ และสามารถกำหนดตำแหน่งและระยะห่างของเลขหน้าได้ตามต้องการเช่นกัน โดยใช้ JavaScript และ PDFLib เป็นเครื่องมือหลักในการสร้างและแก้ไขไฟล์ PDF อย่างสะดวกและง่ายดาย

## Installation / การติดตั้ง
1. Clone this repository from GitHub to your local machine.
2. Open Terminal or Command Prompt and navigate to the cloned folder.
3. Install dependencies using the command: `npm install`.

1. Clone repository นี้จาก GitHub ไปยังเครื่องคอมพิวเตอร์ของคุณ
2. เปิด Terminal หรือ Command Prompt และเข้าไปในโฟลเดอร์ที่คุณ Clone ไว้
3. ติดตั้ง dependencies โดยใช้คำสั่ง `npm install`

## Usage / การใช้งาน
1. Open `index.html` to use the application.
2. Select the PDF file you want to add page numbers to.
3. Choose the position for the page numbers (top-center, top-right, bottom-center, bottom-right).
4. Specify pages to exclude from numbering (if any).
5. Choose the number type (Thai or Arabic).
6. Specify the font size and weight.
7. Specify the margin from the edges of the page for the page numbers.
8. Specify the file name for download.

1. เปิดไฟล์ `index.html` เพื่อใช้งานแอพพลิเคชั่น
2. เลือกไฟล์ PDF ที่ต้องการเพิ่มเลขหน้า
3. เลือกตำแหน่งที่ต้องการแสดงเลขหน้า (บนกลาง, ขวาบน, ล่างกลาง, ขวาล่าง)
4. ระบุหน้าที่ไม่ต้องการให้แสดงเลขหน้า (ถ้ามี)
5. เลือกประเภทของตัวเลข (ไทยหรืออารบิก)
6. ระบุขนาดและความหนาของตัวอักษรที่ต้องการ
7. ระบุระยะห่างขอบกระดาษของเลขหน้าที่จะเพิ่ม
8. ระบุชื่อไฟล์สำหรับการดาวน์โหลด

## Example / ตัวอย่างการใช้งาน

```javascript
// Example usage in JavaScript / ตัวอย่างการเรียกใช้งานฟังก์ชันใน JavaScript
generatePDF(file, position, pagesToExclude, numberType, fontSize, fontWeight, topMargin, rightMargin, bottomMargin, fileName);
```
