const mongoose = require('mongoose')
const { Schema, model } = mongoose
// 选购套餐
const comboSchema = new Schema({

  name: { type: String, required: true },
  price: { type: Number, required: true },
  origin_price: { type: Number, required: true },
  chargeMethod: { type: String, required: true }, // 计费方式，如按时、按天、按月、
  consumableNum: { type: String, required: true }, // 可消费数量，如1小时，1天，1月
  tag: { type: String },
  desc: { type: String }
})
module.exports = model('Combo', comboSchema)