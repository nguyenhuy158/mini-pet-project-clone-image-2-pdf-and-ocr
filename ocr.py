import pytesseract
from PIL import Image
import os

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

output_file = 'chapter2.txt'
prefix = 'chapter2/'
output_file = 'chapter4.txt'
prefix = 'chapter4/'

with open(output_file, 'w') as f:
    for i in range(1, 38):
        filename = prefix + f'{i}.jpg'
        img = Image.open(filename)
        text = pytesseract.image_to_string(img, lang='eng')
        f.write(f'--- {filename} ---\n\n')
        f.write(f'{text}\n\n')
        print(f'Finished processing {filename}')

print(f'All OCR results saved to {output_file}')