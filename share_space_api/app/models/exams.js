const mongoose = require('mongoose')
const { Schema, model } = mongoose

const examSchema = new Schema({
  name: { type: String, required: true }
})
module.exports = model('Exam', examSchema)