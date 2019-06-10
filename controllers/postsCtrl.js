const postsModel = require('../models/postsModel')

module.exports = {
  showPostsPage(req, res) {
    res.render('posts', {
      src:req.session.user?req.session.user.avatar:'/static/uploads/avatar.jpg',
      nickname:req.session.user?req.session.user.nickname:'未知的昵称',
      isLogin: req.session.isLogin
    })
  },
  getPostsData(req, res) {
    var param = req.query || req.params;
    var pageNum = parseInt(param.pageNum || 1); // 页码
    var pageCount = parseInt(param.pageCount || 10); //页数

    var data = {
      pageCount: pageCount,
      pageSize: pageNum
    }

    postsModel.getPostsData(data, (err, results) => {
      if (err) return res.json({
        "code": 1,
        "msg": "查询失败"
      })

      res.json({
        "code": 0,
        "msg": "查询成功",
        "data": results

      })
    })
  },
  getAllPostsData(req, res) {
    postsModel.getAllPostsData((err, results) => {
      console.log(err);
      console.log(results);
      if (err) return res.json({
        "code": 1,
        "msg": "查询失败"
      })

      res.json({
        "code": 0,
        "msg": "查询成功",
        "counts": results.length
      })
    })
  },

  showPoatAddPage(req, res) {
    // 要验证是否登陆
    // if (!req.session.isLogin) {
    //   res.redirect('/login')
    //   return
    // }
    postsModel.getCategoriesData((err, results) => {
      if (err) return res.send('404')
      res.render('post-add', {
        src:req.session.user?req.session.user.avatar:'/static/uploads/avatar.jpg',
        nickname:req.session.user?req.session.user.nickname:'未知的昵称',
        data: results,
        isLogin: req.session.isLogin
      })

    })
  },

  //查询所有文章
  getAllPostsData(req, res) {
    //接收get方式传过来的数据
    let currentPage = req.query.currentPage;
    currentPage = currentPage ? currentPage : 1
    postsModel.getAllPostsData(currentPage, (err, results) => {
      if (err) return res.json({
        "code": 1,
        "msg": "查询失败"
      })
      res.json({
        "code": 0,
        "msg": "查询成功",
        "data": results[0],
        "count": results[1][0].totalCount
      })
    })
  },
  //添加文章
  addPost(req, res) {
    let post = req.body;
    post.user_id = req.session.user.id;
    console.log(post);
    postsModel.addPost(post, result => {
      console.log(result);
      if (result) return res.json({
        "code": 1,
        "msg": "添加失败"
      })

      res.json({
        "code": 0,
        "msg": "添加成功"
      })
    })
  },
  //删除文章
  delPostsById(req, res) {
    let {
      id
    } = req.query;

    postsModel.delPostsById(id, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "删除失败"
      })
      res.json({
        "code": 0,
        "msg": "删除成功"
      })
    })
  },
  //显示编辑文章页面
  showEditPostsPage(req, res) {
    let {
      id
    } = req.query;
    postsModel.getPostsDataById(id, (err, result) => {
      // console.log(result);
      if (err) return res.send('404')

      res.render('editPosts', {
        src:req.session.user?req.session.user.avatar:'/static/uploads/avatar.jpg',
        nickname:req.session.user?req.session.user.nickname:'未知的昵称',
        isLogin: req.session.isLogin,
        ...result[0][0],
        categories: result[1]
      })
    })

  },
  // 更新文章
  updatePosts(req, res) {
    let post = req.body;
    post.user_id = req.session.user.id
    post.category_id = post.category
    delete post.category // 将没有用的此属性给删除掉
    postsModel.updatePosts(post, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "更新文章失败"
      })
      res.json({
        "code": 0,
        "msg": "更新文章成功"
      })
    })
  }
}