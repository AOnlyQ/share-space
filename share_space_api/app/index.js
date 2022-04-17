const Koa = require("koa")
const bodyparser = require('koa-bodyparser')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const app = new Koa()
const routing = require('./routes/index')
const mongoose = require('mongoose')
const { connectionLocal } = require('./config')
const cors = require('koa2-cors');
mongoose.connect(connectionLocal, { useNewUrlParser: true }, () => console.log('数据库连接成功'))
mongoose.connection.on('error', console.error)

app.use(error({
  // 生产环境暴露错误的堆栈信息不安全，故生产环境将其隐藏
  postFormat: (err, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }

}))
app.use(bodyparser())
app.use(parameter(app))



app.use(cors({
  origin: function (ctx) { //设置允许来自指定域名请求
    if (ctx.url === '/test') {
      return '*'; // 允许来自所有域名请求
    }
    return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
  },
  maxAge: 5, //指定本次预检请求的有效期，单位为秒。
  credentials: true, //是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}))

routing(app)

app.listen(3001, () => {
  console.log('start server...')
})