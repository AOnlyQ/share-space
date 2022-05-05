const mongoose = require('mongoose')
const { Schema, model } = mongoose
const seatSchema = new Schema({
  code: { type: Number, required: true },
  name: { type: String, required: true },
  roomId: { type: String, required: true },
  status: { type: Boolean, enum: [true, false], default: true, required: true },
  // order 预约信息
  // 

})
module.exports = model('Seat', seatSchema)