const mongoose = require('mongoose')
const combos = require('./combos')
const { Schema, model } = mongoose
// 订单
const orderSchema = new Schema({

  //  用户Id
  userId: { type: "String", required: true },
  // 订单交易状态
  status: { type: String, enum: ['success', 'error'], default: 'success', required: true },
  // combos
  combosInfo: { type: [{ type: "Object" }] },

}, {
  timestamps: true
})
module.exports = model('Order', orderSchema)