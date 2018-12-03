const jwt = require('jsonwebtoken')
const { TOKEN_MAX_TIME } = require('../config/index')
/* 登录操作，我这里写死了，你在这里换成对数据库的读取即可 */
const postLogin = (req, res) => {
  const { username , password } = req.body
  console.log(username,password)
  console.log(typeof username,typeof password)
  if(username !== '123456' && password !== '123456') {
    res.json({
      code: 402,
      mes: 'user name or password is wrong',
      data: {}
    })
  } else {
    res.json({
      code: 200,
      mes: 'success',
      data: {
        token: jwt.sign({ usernaname: username }, 'abcd(这里填的是你的加密密钥，可以读取文件，或者像我这样瞎鸡儿写一段)', {
          expiresIn: TOKEN_MAX_TIME
        })
      }
    })
  }
}

/* 重新生成token，用来给用户续时间 */
const authorization = (req,res) => {
  const username = req.username
  res.json({
    code: 200,
    mes: 'success',
    data: {
      token: jwt.sign({ username: username }, 'abcd(这里填的是你的加密密钥，可以读取文件，或者像我这样瞎鸡儿写一段)', {
        expiresIn: TOKEN_MAX_TIME
      })
    }
  })
}

const test = (req,res) => {
  res.json({
    code: 200,
    mes: 'success',
    data: {
    }
  })
}

module.exports = {
  postLogin,
  authorization,
  test
}