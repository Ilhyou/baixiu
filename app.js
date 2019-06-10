// 1. 引入模块
const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session')
const fs = require('fs');
const path = require('path');

// const indexRouter = require('./routers/indexRouter')
// const usersRouter = require('./routers/usersRouter')
// const ctgRouter = require('./routers/ctgRouter')
// const loginRouter = require('./routers/loginRouter')
// let arr = [indexRouter, usersRouter, ctgRouter, loginRouter];

// 2. 创建express实例对象
var app = express()
app.set('view engine', 'ejs'); // 设置默认的模板引擎
app.set('views', './views') //这行代码的意思是设置模板文件的路径,默认是在views文件夹中,
// 使用static中间件来托管静态资源
// app.use(express.static('public'))
// 如果就是想在路径中写上public或是其它的名称的话,需要设置虚拟目录
app.use('/assets', express.static('assets'))
app.use('/static', express.static('static'))

// 注册body-parser中间件,并进行设置,不要使用body-parser里面默认的解析方式,使用我们原来的解析方式即可
// querystring.parse解析即可
app.use(bodyParser.urlencoded({
  extended: false
}))

// 注册session中间件
app.use(session({
  secret: 'kljaklsjflaksjdfa', // 设置一个随机的加密口令
  resave: false, // 是否存储到某些存储区，比如数据库，磁盘文件,默认是存储在服务器的内存中的
  saveUninitialized: false // 是否将初始化的sessionID响应给浏览器
}))

// 3. 开启服务并监听端口
app.listen(3000, () => {
  console.log('express server is running at http://127.0.0.1:3000');
})

// 4. 注册中间件来监听请求
// app.use(indexRouter)
// app.use(usersRouter)
// app.use(ctgRouter)

fs.readdir(path.join(__dirname,'./routers'),function(err, files){
  // console.log(files);
  if (err) {
      return console.error(err);
  }
  // files.forEach( function (file){
  //   app.use(require('./routers/'+file))
  // });
  files.forEach( item=>{
    app.use(require(`./routers/${item}`))
  });
});