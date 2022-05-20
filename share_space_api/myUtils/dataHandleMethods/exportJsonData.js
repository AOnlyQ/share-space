
const fs = require("fs")
let originData = JSON.parse(fs.readFileSync("../jsonData/origin.json").toString())
// console.log("originData", originData.length)
let originData2 = JSON.parse(fs.readFileSync("../jsonData/origin2.json").toString())
// console.log("originData2", originData2.length)
for (let i = 0; i < 20; i++) {
  Object.assign(originData[i], originData2[i])
}

// console.log("originData", originData)
let result = originData

// 将处理后的数据导出
let fileString = JSON.stringify(result)
// 以文件形式导出
const content = `${fileString}`;
fs.writeFile("../jsonData/result.json", content, (err) => {
  if (err != null) {
    console.log(err);
    return;
  }
  console.log("文件写入成功");
});