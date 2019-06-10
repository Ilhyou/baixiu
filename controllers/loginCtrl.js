const loginModel = require('../models/loginModel');
module.exports = {
  showLoginPage(req,res){
    res.render('login',{})
  },
  login(req,res){
    // 1. 接收前端传递过来的数据
    let user = req.body

    // 2. 调用model中的方法进行登陆验证
    loginModel.login(user,(err,result)=>{
      // 查询的时候最好是使用两个参数,因为查询的时候，即使SQL语句语法是正确的,但里面的字段值并不一定是有效，如果字段值无效的话,则查询到的数据是一个空数组
      if(err) return res.json({
        "code":1,
        "msg":"登陆失败"
      })
      
      if (!result.length){
        res.json({
          "code": 2,
          "msg": "账号或密码错误"
        })
      }
      
      if (result.length) {
        // 进行sessionID的设置
        req.session.isLogin = true;  // 设置了这行代码之后,会在响应头信息里面带上sessionID响应给浏览器
        req.session.user = result[0];// 将查到的登陆的用户信息存储到session当中
        res.json({
          "code": 0,
          "msg": "登陆成功"
        })
      }
    })
  },
  logout(req,res){
    req.session.destroy(err=>{
      if(err) return console.log(err.message);

      res.redirect('/login')
    })
  }
}