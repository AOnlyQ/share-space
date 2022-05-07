// 通过  npm install dayjs 安装依赖
// 
var dayjs = require('dayjs')
var isBetween = require('dayjs/plugin/isBetween')

dayjs.extend(isBetween);

// 使用日为颗粒度进行比较
const result1 = dayjs("2010-10-21").isBetween(dayjs("2010-10-20"), dayjs("2010-10-25"), "day");
// 输出: true
console.log("result1", result1)
// 使用年为颗粒度进行比较
const result2 = dayjs("2010-10-21").isBetween(dayjs("2010-10-20"), dayjs("2010-10-25"), "year");
// 输出: false
console.log("result2", result2)
const result3 = dayjs(1318781876406).format('YYYY-MM-DD HH:mm:ss');  // 2011-10-17 00:17:56
const result4 = dayjs("2010-10-21 7:8").format('YYYY-MM-DD HH:mm:ss');
console.log("result4", result4)