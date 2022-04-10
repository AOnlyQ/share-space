const Router = require('koa-router')
const router = new Router({ prefix: '/orders' })
router.get('/', (ctx) => {
  ctx.body = '订单'
})
module.exports = router