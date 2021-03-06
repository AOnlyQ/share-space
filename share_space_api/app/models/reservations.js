// 预约单

const mongoose = require('mongoose')
const { Schema, model } = mongoose
const reservationSchema = new Schema({
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
  roomName: { type: String, required: true },
  seatId: { type: Schema.Types.ObjectId, ref: 'Seat' },
  seatName: { type: String, required: true },
  // 预约状态success成功预约，cancel预约取消
  status: { type: String, required: true, default: 'success' }
}, {
  timestamps: true
})
module.exports = model('Reservation', reservationSchema)