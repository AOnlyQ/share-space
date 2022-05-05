const Seat = require("../models/seats")
const Room = require("../models/rooms")
class SeatsCtl {
  // 新增座位
  async createSeat (ctx) {
    ctx.verifyParams({
      code: { type: 'number', required: true },
      name: { type: 'string', required: true },
      roomId: { type: 'string', required: true },
      status: { type: 'boolean' },

    })
    let seat = await new Seat(ctx.request.body).save()
    // console.log("seat", seat)
    // console.log("ctx.state.room", ctx.state.room)
    let room = await Room.findById(ctx.request.body.roomId).select('+seats')
    room.seats.push(seat._id)
    room.save()
    // ctx.body = seat
    ctx.status = 204
  }
  // 查询某自习室的所有座位
  async find (ctx) {
    // let seats = await Room.find({ seats: ctx.state.room._id })
    let room = await Room.findById(ctx.params.roomId).select(' +seats').populate('seats')

    // console.log("room", room)

    ctx.body = room.seats
  }
}
module.exports = new SeatsCtl()