const Router = require('koa-router')
const router = new Router({ prefix: '/:userId/reservations' })
const { create, findByUser } = require('../controllers/reservations')
const { secret } = require('../config')
const jwt = require('koa-jwt')
const auth = jwt({ secret })
router.post('/', auth, create)
router.get('/', findByUser)

module.exports = router