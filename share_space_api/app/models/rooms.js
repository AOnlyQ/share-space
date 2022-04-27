const mongoose = require('mongoose')
const { Schema, model } = mongoose
const roomSchema = new Schema({

  name: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  remainings: { type: String, required: true },
  img_url: { type: String, required: true },

})
module.exports = model('Room', roomSchema)