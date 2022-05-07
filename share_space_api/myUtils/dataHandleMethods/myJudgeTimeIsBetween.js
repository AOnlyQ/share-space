
var start_time = "2022-5-5 20:00"
var end_time = "2022-5-6 0:51"
var input_start = "2022-5-5 0:50"
var input_end = "2022-5-5 21:53"

function getTime (start_time, end_time, input_start, input_end) {

  let startTime = new Date(start_time); //将-转化为/，使用new Date
  let endTime = new Date(end_time); //将-转化为/，使用new Date
  let inputStart = new Date(input_start);
  let inputEnd = new Date(input_end);



  if (inputStart.getTime() <= startTime.getTime() && inputEnd.getTime() <= startTime.getTime()) {
    return true
  } else if (inputStart.getTime() >= endTime.getTime() && inputEnd.getTime() >= endTime.getTime()) {
    return true
  } else {
    return false
  }
}
console.log(getTime(start_time, end_time, input_start, input_end))