const mongoose = require('mongoose')
const { Schema, model } = mongoose
const seatSchema = new Schema({
  code: { type: Number, required: true },
  name: { type: String, required: true },
  roomId: { type: String, required: true },
  roomName: { type: String, required: true },
  reservations: { type: [{ type: Schema.Types.ObjectId, ref: "Reservation" }] },

  //  { type: Boolean, enum: [true, false], default: true, required: true },

  // order 预约信息
  // 

})
module.exports = model('Seat', seatSchema)