const mongoose = require('mongoose')
const { Schema, model } = mongoose
const userSchema = new Schema({

  username: { type: String, required: true },
  password: { type: String, required: true },
  // 
  // order 订单信息
  orders: { type: [{ type: Schema.Types.ObjectId, ref: "Order" }], select: false },

  // 选购的套餐信息
  combos: { type: [{ type: Schema.Types.ObjectId, ref: "Combo" }], select: false }
})
module.exports = model('User', userSchema)