const Router = require('koa-router')
const router = new Router({ prefix: '/:roomId/seats' })
const { createSeat, find, updateSeat, } = require("../controllers/seats")

// 新增座位
router.post('/', createSeat)
// 修改座位
router.patch('/:id', updateSeat)
// 查找某自习室的座位,此接口重复，在查询自习室信息的接口里，能获取到座位信息
router.get('/', find)


module.exports = router