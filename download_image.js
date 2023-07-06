const axios = require("axios");
const fs = require("fs");
const readline = require("readline");

// const inputFile = "output_chapter2.txt";
// const prefix = "chapter2/";
const inputFile = "output_chapter3.txt";
const prefix = "chapter3/";

if (!fs.existsSync(prefix)) {
  fs.mkdirSync(prefix);
  console.log(`Created directory ${prefix}`);
} else {
  console.log(`Directory ${prefix} already exists`);
}

const rl = readline.createInterface({
  input: fs.createReadStream(inputFile),
  crlfDelay: Infinity,
});

let lineNumber = 1;

rl.on("line", (url) => {
  const outputFile = prefix + `${lineNumber}.jpg`;
  axios({
    url,
    responseType: "stream",
  })
    .then((response) => {
      response.data.pipe(fs.createWriteStream(outputFile)).on("close", () => {
        console.log(`Saved image to ${outputFile}`);
      });
    })
    .catch((error) => {
      console.log(`Error downloading image: ${error}`);
    });
  lineNumber++;
});
