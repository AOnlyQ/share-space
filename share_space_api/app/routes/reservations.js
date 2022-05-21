const Router = require('koa-router')
const router = new Router()
const { create, findByUser, findById, cancelReserve } = require('../controllers/reservations')
const { secret } = require('../config')
const jwt = require('koa-jwt')
const auth = jwt({ secret })
router.post('/:userId/reservations', auth, create)
router.get('/:userId/reservations', findByUser)
router.patch('/:userId/reservations/:id', cancelReserve)

router.get('/reservations/:id', findById)
module.exports = router