import pytesseract
from PIL import Image
import os

output_file = 'chapter2.txt'
prefix = 'chapter2/'

with open(output_file, 'w') as f:
    for i in range(1, 51):
        filename = prefix + f'{i}.jpg'
        img = Image.open(filename)
        text = pytesseract.image_to_string(img, lang='eng')
        f.write(f'--- {filename} ---\n\n')
        f.write(f'{text}\n\n')
        print(f'Finished processing {filename}')

print(f'All OCR results saved to {output_file}')