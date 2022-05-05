const Router = require('koa-router')
const router = new Router({ prefix: '/combos' })
const { create, find, findById } = require('../controllers/combos')
// 新增
router.post('/', create)
// 查找
router.get('/', find)

router.get('/:id', findById)
module.exports = router