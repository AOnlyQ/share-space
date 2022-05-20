
const User = require('../models/users')
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')
const Order = require("../models/orders")
class UsersCtl {
  // 检查用户名是否存在
  async checkUsernameExist (ctx, next) {
    const { username } = ctx.request.body
    const repeatedUser = await User.findOne({ username })
    if (repeatedUser && username !== ctx.state.user.username) ctx.throw(409, '用户名已经存在')
    await next()

  }

  async login (ctx) {
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    let user = await User.findOne(ctx.request.body).select('+password')
    if (!user) ctx.throw(401, { message: '用户名或密码不正确' })
    const { _id, username } = user
    // 过期事件为一天
    const token = jsonwebtoken.sign({ _id, username }, secret, { expiresIn: '1d' })
    ctx.body = { userInfo: user, token }
  }
  // 检查要删除或修改的用户是否为当前用户
  async checkOwner (ctx, next) {
    if (ctx.params.id != ctx.state.user._id) ctx.throw(403, '没有权限')
    let user = await User.findById(ctx.state.user._id)
    ctx.state.user.username = user.username
    await next()

  }
  // 新增用户
  async create (ctx) {
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const user = await new User(ctx.request.body).save()
    ctx.body = user
  }
  async deleteById (ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) ctx.throw(404, '用户不存在')
    ctx.status = 204 // 没有内容，但是成功了
  }
  async update (ctx) {
    ctx.verifyParams({
      username: { type: 'string', required: false },
      password: { type: 'string', required: false },
    })
    // { new: true }返回更改后的新数据
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true })
    if (!user) ctx.throw(404, '用户不存在')

    // console.log("ctx.state.user", ctx.state.user)
    ctx.state.user.username = user.username
    ctx.body = user
  }
  // 查找所有用户
  async find (ctx) {
    ctx.body = await User.find().select("-password")
  }
  // 查找特定用户
  async findById (ctx) {
    const user = await User.findById(ctx.params.id)
    ctx.body = user
  }

  // 查找特定用户下的所有订单,此接口在orders的控制器里
  // 查找特定用户下的所有套餐
  async findUserCombos (ctx) {
    let user = await User.findById(ctx.params.id).select('+orders').populate('orders')
    let combos = []
    user.orders.forEach((item, index) => {
      item.combosInfo.forEach(comboItem => {
        combos.push(comboItem)
      })

    })
    ctx.body = combos
  }

}
module.exports = new UsersCtl()