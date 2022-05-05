const Combo = require("../models/combos")
class CombosCtl {
  // 新增套餐
  async create (ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      price: { type: 'number', required: true },
      origin_price: { type: 'number', required: true },
      tag: { type: 'string', required: false },
      desc: { type: 'string', required: false }
    })
    const { name } = ctx.request.body
    const requestCombo = await Combo.findOne({ name })
    if (requestCombo) ctx.throw(409, '该套餐已经存在')
    let combo = await new Combo(ctx.request.body).save()
    ctx.body = combo
  }
  // 查询所有套餐
  async find (ctx) {
    ctx.body = await Combo.find()
  }
  // 查找指定套餐
  async findById (ctx) {
    const combo = await Combo.findById(ctx.params.id)
    if (!combo) ctx.throw(404, '该套餐不存在')
    ctx.body = combo
  }
}
module.exports = new CombosCtl()