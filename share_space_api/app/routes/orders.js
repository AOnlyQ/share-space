const Router = require('koa-router')
const router = new Router({ prefix: '/:userId/orders' })
const { createOrder, findUserOrders } = require("../controllers/orders")
const { secret } = require('../config')
const jwt = require('koa-jwt')
const auth = jwt({ secret })
// 新增订单
router.post('/', auth, createOrder)
// 查找某用户的订单
router.get('/', auth, findUserOrders)

module.exports = router