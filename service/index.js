const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js')
let user = require('./appApi/user.js')
let router = new Router();
router.use('/user',user.routes())
app.use(router.routes())
app.use(router.allowedMethods())

  //立即执行函数
  ; (async () => {
    await connect()
    initSchemas()
    const User = mongoose.model('User')
    let oneUser = new User({ "userName": 'liuwei11', "password": '123456' })

    await oneUser.save().then(() => {
      console.log('插入成功')
    }).catch((error)=>{
      console.log(error)
    })
    // oneUser.save(function (err) {
    //   if(err) console.log(err)
    // });
    let users = await User.findOne({}).exec()

    console.log('------------------')
    console.log(users)
    console.log('------------------')
  })()


app.use(async (ctx) => {
  ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})