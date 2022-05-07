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
}, {
  timestamps: true
})
module.exports = model('Reservation', reservationSchema)