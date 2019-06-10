const navMenusModel = require('../models/navMenusModel')

// 向外暴露数据
module.exports = {
  showNavMenusPage(req,res){
    res.render('slides',{
      src:req.session.user?req.session.user.avatar:'/static/uploads/avatar.jpg',
      nickname:req.session.user?req.session.user.nickname:'未知的昵称',
      isLogin:req.session.isLogin
    })
  }
}