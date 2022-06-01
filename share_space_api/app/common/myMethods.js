// 判断预约时间是否可用
exports.judgeTimeAvailable = function (start_time, end_time, input_start, input_end) {
  let startTime = new Date(start_time); //将-转化为/，使用new Date
  let endTime = new Date(end_time); //将-转化为/，使用new Date
  let inputStart = new Date(input_start);
  let inputEnd = new Date(input_end);
  // 输入为空，直接返回true
  if (!input_start || !input_end) {
    return true
  }
  // 不在范围内
  if (inputStart.getTime() <= startTime.getTime() && inputEnd.getTime() <= startTime.getTime()) {
    return true
  } else if (inputStart.getTime() >= endTime.getTime() && inputEnd.getTime() >= endTime.getTime()) {
    return true
  } else {
    return false
  }
};

// 将时间戳格式变为
exports.dateFormat = (Timestamp) => {
  let date1 = new Date(Timestamp);
  return (
    date1.toLocaleDateString().replace(/\//g, "-") +
    " " +
    date1.toTimeString().substr(0, 8)
  );
};


