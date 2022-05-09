const Room = require("../models/rooms")
const Seat = require("../models/seats")
const Reservation = require("../models/reservations")
const { judgeTimeAvailable } = require("../common/myMethods")
class RoomsCtl {
  // 新增自习室
  async create (ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      description: { type: 'string', required: true },
      time: { type: 'string', required: true },
      remainings: { type: 'number', required: true },
      img_url: { type: 'string', required: true },
    })
    const { name } = ctx.request.body
    const requestRoom = await Room.findOne({ name })
    if (requestRoom) ctx.throw(409, '自习室名字已经存在')
    let room = await new Room(ctx.request.body).save()
    ctx.body = room
  }
  // 查询自习室
  async find (ctx) {
    ctx.body = await Room.find()
  }
  async findById (ctx) {
    const room = await Room.findById(ctx.params.id).select('+seats').populate('seats')
    if (!room) ctx.throw(404, '自习室不存在')
    ctx.body = room
  }
  // 根据预约时间，查询某自习室的所有座位的状态
  async findSeatsStatus (ctx) {

    const seatList = await Seat.find({
      roomId: ctx.params.id
    }).select('+reservations').populate('reservations')
    let seatsStatus = []
    seatList.forEach((item, index) => {
      let reservations = JSON.parse(JSON.stringify(item.reservations))
      // console.log("reservations", reservations)
      // 如果有预约记录，查询输入的时间段是否与预约记录有交集，若没有，则状态为可预约
      if (reservations.length) {
        for (let record of reservations) {
          // console.log("record", record)
          let start_time = record.start_time;
          let end_time = record.end_time
          let input_start = ctx.request.body.input_start
          let input_end = ctx.request.body.input_end
          // console.log(start_time, end_time, input_start, input_end)
          let result = judgeTimeAvailable(start_time, end_time, input_start, input_end)
          // 只要存在一个就返回不可预约的状态
          if (!result) {
            seatsStatus[index] = {
              status: "false", seatId: item._id, start_time: input_start, end_time: input_end
            }
            break;
          } else {
            seatsStatus[index] = {
              status: "true", seatId: item._id, start_time: input_start, end_time: input_end
            }
          }

        }
      } else {
        seatsStatus[index] = {
          status: "true", seatId: item._id, start_time: ctx.request.body.input_start, end_time: ctx.request.body.input_end
        }


      }
    })
    ctx.body = seatsStatus
  }
}
module.exports = new RoomsCtl()