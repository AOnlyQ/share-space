const Router = require('koa-router')
const router = new Router({ prefix: '/rooms' })
const { create, find } = require('../controllers/rooms')

router.post('/', create)
router.get('/', find)
module.exports = router