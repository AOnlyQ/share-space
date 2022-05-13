const mongoose = require('mongoose')
const { Schema, model } = mongoose
const roomSchema = new Schema({

  name: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  total_nums: { type: Number, required: true },
  img_url: { type: String, required: true },
  seats: { type: [{ type: Schema.Types.ObjectId, ref: "Seat" }] },


})
module.exports = model('Room', roomSchema)