const Reservation = require("../models/reservations")
const User = require("../models/users")
const Seat = require("../models/seats")
const Room = require("../models/rooms")

class ReservationsCtl {

  // 新增预约单
  async create (ctx) {
    ctx.verifyParams({
      start_time: { type: 'string', required: true },
      end_time: { type: 'string', required: true },
      // type: Schema.Types.ObjectId,
      userId: { type: 'string', required: true },
      roomId: { type: 'string', required: true },
      roomName: { type: 'string', required: true },
      seatId: { type: 'string', required: true },
      seatName: { type: 'string', required: true },
    })
    let reservation = await new Reservation(ctx.request.body).save()
    let me = await User.findById(ctx.state.user._id).populate('reservations')
    let seat = await Seat.findById(ctx.request.body.seatId).select('+reservations').populate('reservations')
    if (me && seat) {
      me.reservations.push(reservation._id)
      me.save()
      seat.reservations.push(reservation._id)
      seat.save()
    }
    ctx.body = { reservationId: reservation._id }
    // ctx.status = 204
  }
  // 查询某用户所有的预约单
  async findByUser (ctx) {
    // console.log(ctx.params.userId)
    const user = await User.findById(ctx.params.userId).select('+reservations').populate('reservations')
    let reservationList = []
    if (user) {
      reservationList = user.reservations
      // reservationList.forEach(async (item, index) => {
      //   let room = await Room.findById(item.roomId)
      //   // Room.findById(item.roomId)
      //   // Object.assign(reservationList[index], { name: room.name })
      //   reservationList[index].name = room.name
      //   // console.log("room", room)
      //   console.log("reservationList[index]", reservationList[index])
      // })
      ctx.body = reservationList

      // setTimeout(() => {
      //   console.log("reservationList", reservationList)
      //   ctx.body = reservationList
      // }, 1000)

    }
  }
  // 根据预约单id查询预约单
  async findById (ctx) {
    // console.log("test")
    const reservation = await Reservation.findById(ctx.params.id)
    // console.log("reservation",reservation)
    if (!reservation) ctx.throw(404, '该预约单不存在')
    ctx.body = reservation
  }

  // 取消预约，未写完
  async cancelReserve (ctx) {
    const reservation = await Reservation.findById(ctx.params.id)
    if (!reservation) ctx.throw(404, '该预约单不存在')
    reservation.status = 'cancel'
    let me = await User.findById(ctx.state.user._id).populate('reservations')
    let seat = await Seat.findById(ctx.request.body.seatId).select('+reservations').populate('reservations')
   

    if (me && seat) {
      me.reservations.push(reservation._id)
      me.save()
      let index = seat.reservations.findIndex((el,index)=> el._id === reservation._id);
      if(index>-1){//大于0 代表存在，
        seat.reservations.splice(index,1);//存在就删除
      }
      seat.save()
    }
    ctx.body = { reservationId: reservation._id }
  }

}
module.exports = new ReservationsCtl()