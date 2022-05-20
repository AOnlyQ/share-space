const Router = require('koa-router')
const router = new Router({ prefix: '/exams' })
const { create, find } = require('../controllers/exams')
// 新增
router.post('/', create)
router.get('/', find)

module.exports = router