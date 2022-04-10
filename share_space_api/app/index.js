const Koa = require("koa")
const bodyparser = require('koa-bodyparser')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const app = new Koa()
const routing = require('./routes/index')
const mongoose = require('mongoose')
const { connectionLocal } = require('./config')
mongoose.connect(connectionLocal, { useNewUrlParser: true }, () => console.log('数据库连接成功'))
mongoose.connection.on('error', console.error)

app.use(error({
  // 生产环境暴露错误的堆栈信息不安全，故生产环境将其隐藏
  postFormat: (err, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }

}))
app.use(bodyparser())
app.use(parameter(app))
routing(app)

app.listen(3001, () => {
  console.log('start server...')
})