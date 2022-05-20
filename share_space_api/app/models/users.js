const mongoose = require('mongoose')
const { Schema, model } = mongoose
const userSchema = new Schema({

  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar_url: { type: String }, // 用户头像
  gender: { type: String, enum: ['male', 'female'], default: 'male', required: true },
  age: { type: Number },
  location: { type: Object },
  personal_signature: { type: String },
  liking_exams: { type: [{ type: Schema.Types.ObjectId, ref: "Exam" }], select: false },
  // order 订单信息
  orders: { type: [{ type: Schema.Types.ObjectId, ref: "Order" }], select: false },

  // 选购的套餐信息,可不加，用户的订单信息里包括套餐
  // combos: { type: [{ type: Schema.Types.ObjectId, ref: "Combo" }], select: false }
  // 预约信息单
  reservations: { type: [{ type: Schema.Types.ObjectId, ref: "Reservation" }], select: false },

})
module.exports = model('User', userSchema)