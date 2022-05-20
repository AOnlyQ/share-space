module.exports = {
  secret: "sharespace-jwt-secret", // 鉴权密钥
  connectionStr: '', // 在线 mongoDB 拿到的连接地址，
  connectionLocal: 'mongodb://localhost:27017/share-space' // 连接本地mongoDB
}