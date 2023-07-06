// const regex = /data:image\/jpg;base64,([^"';,\s]+)/g;
// const regex = /\"(.+?)\"/g;

const fs = require("fs");
const readline = require("readline");

// Tạo interface để đọc dữ liệu từ tệp tin
const rl = readline.createInterface({
  // input: fs.createReadStream("input_chapter2.txt"),
  input: fs.createReadStream("input_chapter3.txt"),
  crlfDelay: Infinity,
});

// Biểu thức chính quy để tìm kiếm các chuỗi khớp
const regex = /data:image\/jpg;base64,([^"';,\s]+)/g;

// Mảng để lưu các chuỗi khớp
const matches = [];

// Đọc từng dòng trong tệp tin
rl.on("line", (line) => {
  // Tìm kiếm các chuỗi khớp và thêm vào mảng matches
  const match = line.match(regex);
  if (match) {
    matches.push(match[0]);
  }
});

// Khi đã đọc xong tệp tin, ghi kết quả vào tệp tin output.txt
rl.on("close", () => {
  // fs.writeFileSync("output_chapter2.txt", matches.join("\n"));
  fs.writeFileSync("output_chapter3.txt", matches.join("\n"));
  console.log("Đã lưu kết quả vào tệp tin output.txt");
});
