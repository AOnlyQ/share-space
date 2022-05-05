const Router = require('koa-router')
const router = new Router({ prefix: '/rooms' })
const { create, find,findById } = require('../controllers/rooms')

router.post('/', create)
router.get('/', find)
router.get('/:id',findById)
module.exports = router