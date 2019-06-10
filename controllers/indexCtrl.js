const indexModel = require('../models/indexModel')

module.exports = {
  showIndexPage(req, res) {
    // console.log(req.session);
    // if (!req.session.isLogin) {

    //   res.redirect('/login')  // 跳转到登陆页面
    //   return;
    // }
    indexModel.getIndexPageData((err, result) => {
      if (err) return res.send('404')
      res.render('index', {
        src:req.session.user?req.session.user.avatar:'/static/uploads/avatar.jpg',
        nickname:req.session.user?req.session.user.nickname:'未知的昵称',
        isLogin: req.session.isLogin,
        postsCount:result[0][0].postsCount,
        draftedCount:result[1][0].draftedCount,
        categoriesCount:result[2][0].categoriesCount,
        commentsCount:result[3][0].commentsCount,
        heldCount:result[4][0].heldCount
      })
      // res.render('index',{
      //   isLogin:req.session.isLogin,
      //   ...result[0][0],
      //   ...result[1][0],
      //   ...result[2][0],
      //   ...result[3][0],
      //   ...result[4][0]
      // })

      // res.render('index1',{
      //   isLogin:req.session.isLogin,
      //   result // 当属性名和属性值是相同名称的时候,都是用变量名来表示的时候,可以简单写在一个
      // })
    })
  }
}