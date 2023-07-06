const { createWorker } = require("tesseract.js");
const fs = require("fs");

const worker = createWorker();

(async () => {
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize("chapter2/1.jpg");
  console.log(text);
  await worker.terminate();

  fs.writeFile("output.txt", text, function (err) {
    if (err) throw err;
    console.log("Text saved to output.txt");
  });
})();
