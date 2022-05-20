const Router = require('koa-router')
const router = new Router({ prefix: '/rooms' })
const { create, find, findById, findSeatsStatus, update } = require('../controllers/rooms')

router.post('/', create)
router.get('/', find)
router.get('/:id', findById)
router.patch("/:id", update)
// 查重指定自习室所有座位的状态
router.post('/:id/status', findSeatsStatus)
module.exports = router