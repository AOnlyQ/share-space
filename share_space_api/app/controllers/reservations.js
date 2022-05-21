const Reservation = require("../models/reservations")
const User = require("../models/users")
const Seat = require("../models/seats")
const Room = require("../models/rooms")
const { judgeTimeAvailable } = require("../common/myMethods")
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
    let me = await User.findById(ctx.state.user._id).populate('reservations')
    // 新增预约单前检查用户在该时间段是否已经有预约座位
    let reserveAble = true
    // 筛选出状态为success的预约单
    let mySuccReserveList = me.reservations.filter(item =>
      item.status === "success"
    )
    console.log("mySuccReserveList", mySuccReserveList)
    for (let item of mySuccReserveList) {
      let start_time = item.start_time;
      let end_time = item.end_time
      let input_start = ctx.request.body.start_time
      let input_end = ctx.request.body.end_time
      let result = judgeTimeAvailable(start_time, end_time, input_start, input_end)
      // 只要存在一个就退出程序并返回不可预约的状态
      if (!result) {
        reserveAble = false
        break
      }
    }
    if (reserveAble) {
      let reservation = await new Reservation(ctx.request.body).save()
      let seat = await Seat.findById(ctx.request.body.seatId).select('+reservations').populate('reservations')
      if (me && seat) {
        me.reservations.push(reservation._id)
        me.save()
        seat.reservations.push(reservation._id)
        seat.save()
      }
      ctx.body = { status: 204, reservationId: reservation._id }
    } else {
      ctx.body = {
        msg: "该时间已预约座位,无法预约",
        status: 409
      }
    }

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
      reservationList = reservationList.reverse()
      // sort(function (a, b) {
      //   return b.createdAt < a.createdAt ? -1 : 1
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

  // 取消预约
  async cancelReserve (ctx) {
    let reservation = await Reservation.findById(ctx.params.id)
    if (!reservation) ctx.throw(404, '该预约单不存在')
    // 取消预约前检查预约时间范围是否已经成为过去式
    if (new Date(reservation.start_time).getTime() <= new Date().getTime()) {
      reservation.status = 'invalid'
      reservation.save()
      ctx.body = {
        msg: "无法取消预约",
        status: 409
      }
      return false
    }
    console.log("reservation.seatId", reservation.seatId.toString())
    let seat = await Seat.findById(reservation.seatId.toString()).select('+reservations').populate('reservations')
    console.log("seat", seat)

    if (seat) {
      let index = seat.reservations.findIndex((el, index) => el._id.toString() === reservation._id.toString());
      console.log("index", index)
      if (index > -1) {//大于0 代表存在，
        seat.reservations.splice(index, 1);//存在就删除
      }
      seat.save()
    }
    reservation.status = 'cancel'
    reservation.save()
    ctx.status = 204
  }

}
module.exports = new ReservationsCtl()