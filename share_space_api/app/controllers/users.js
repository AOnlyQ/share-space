
const User = require('../models/users')
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')
class UsersCtl {
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
    ctx.state.user = user
    // console.log(" ctx.state.user", ctx.state.user)
    // console.log(" ctx.state.user._id", ctx.state.user._id.toString())

    ctx.body = { userInfo: user, token }
  }
  // 检查要删除或修改的用户是否为当前用户
  async checkOwner (ctx, next) {
    if (ctx.params.id != ctx.state.user._id) ctx.throw(403, '没有权限')
    await next()

  }
  // 新增用户
  async create (ctx) {
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const { username } = ctx.request.body
    const requestUser = await User.findOne({ username })
    if (requestUser) ctx.throw(409, '用户已经存在')
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

  // 查找特定用户下的所有订单,在orders的控制器里有这个接口
  async findUserOrders (ctx) {

  }

}
module.exports = new UsersCtl()