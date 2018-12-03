const jwt = require('jsonwebtoken')
const whiteListUrl = require('../config/whiteList')

const hasOneOf = (str,arr) => {
  return arr.some(item => item.includes(str))
}

const auth = (req,res,next) => {
  const method = req.method.toLowerCase()
  const path = req.path
  if (whiteListUrl[method] && hasOneOf(path, whiteListUrl[method])) next()
  else {
    const token = req.headers.authorization
    if(!token) {
      res.json({
        code: 401,
        mes: 'there is no token, please login',
        data: {}
      })
    }else {
      jwt.verify(token, 'abcd(这里填的是你的加密密钥，可以读取文件，或者像我这样瞎鸡儿写一段)',(error, decode)=>{
        if(error) {
          res.json({
            code: 401,
            mes: 'token error',
            data: {}
          })
        }
        else {
          req['username'] = decode['username']
          next()
        }
      })
    }
  }
}

const cros = (req,res,next) => {
  res.header('Access-Control-Allow-Origin','*')
  // 这里需要设置Authorization，因为我的token是放在Authorization里的
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
  if (req.method == 'OPTIONS') {
    res.send(200) // 让options请求快速返回
  }
  else {
    next()
  }
}

module.exports = {
  auth,
  cros
}