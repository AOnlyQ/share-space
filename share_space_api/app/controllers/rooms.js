const Room = require("../models/rooms")
class RoomsCtl {
  // 新增自习室
  async create (ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      description: { type: 'string', required: true },
      time: { type: 'string', required: true },
      remainings: { type: 'number', required: true },
      img_url: { type: 'string', required: true },
    })
    const { name } = ctx.request.body
    const requestRoom = await Room.findOne({ name })
    if (requestRoom) ctx.throw(409, '自习室名字已经存在')
    let room = await new Room(ctx.request.body).save()
    ctx.body = room
  }
  // 查询自习室
  async find (ctx) {
    ctx.body = await Room.find()
  }
  async findById (ctx) {
    const room = await Room.findById(ctx.params.id).select('+seats').populate('seats')
    if (!room) ctx.throw(404, '自习室不存在')
    ctx.body = room
  }
}
module.exports = new RoomsCtl()