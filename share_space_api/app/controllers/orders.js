const Order = require("../models/orders")
const User = require("../models/users")
class OrdersCtl {
  // 新增订单
  async createOrder (ctx) {
    ctx.verifyParams({
      userId: { type: 'string', required: true },
      // combo: { type: 'number', required: true },

    })
    let order = await new Order(ctx.request.body).save()
    let me = await User.findById(ctx.state.user._id).select('+orders')
    me.orders.push(order._id)
    me.save()
    // ctx.body = order
    ctx.status = 204
  }
  // 查询某用户所有订单
  async findUserOrders (ctx) {
    let user = await User.findById(ctx.state.user._id).select('+orders').populate('orders')

    // console.log("user",user)

    ctx.body = user.orders
  }
  // 查询某订单，（下面所有套餐）
}
module.exports = new OrdersCtl()