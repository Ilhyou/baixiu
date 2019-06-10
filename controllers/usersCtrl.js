const usersModel = require('../models/usersModel')
module.exports = {
  showUsersPage(req, res) {
    // 要开启验证,没有登陆的时候，是不可以直接访问这个页面的
    // if (!req.session.isLogin) {
    //   console.log(2);

    //   res.redirect('/login') // 跳转到登陆页面
    //   return;
    // }
    res.render('users', {
      src: req.session.user ? req.session.user.avatar : '/static/uploads/avatar.jpg',
      nickname:req.session.user?req.session.user.nickname:'未知的昵称',
      isLogin: req.session.isLogin
    })
  },
  getUsersData(req, res) {
    usersModel.getUsersData((err, retults) => {
      if (err) return res.json({
        "code": 1,
        "msg": "查询失败"
      })
      res.json({
        "code": 0,
        "msg": "查询成功",
        "data": retults
      })
    })
  },
  addUser(req, res) {
    console.log(req.body);
    let user = req.body;
    user.status = 'activated';
    user.avatar = '/static/uploads/avatar.jpg';
    usersModel.addUser(user, result => {
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
  delUser(req, res) {
    let {
      id
    } = req.query;
    console.log(id);
    usersModel.delUser(id, result => {
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
  getUserById(req, res) {
    let {
      id
    } = req.query;

    usersModel.getUserById(id, (err, results) => {
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
  updateUser(req, res) {
    let user = req.body;
    usersModel.updateUser(user, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "更新失败"
      })
      res.json({
        "code": 0,
        "msg": "更新成功"
      })
    })
  },
  delMoreUsers(req, res) {
    let {
      ids
    } = req.query;
    console.log(ids);
    usersModel.delMoreUsers(ids, result => {
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
  //显示个人中心页面
  showProfilePage(req, res) {
    if (!req.session.isLogin) {
      res.redirect('/login')
      return;
    }
    let {
      id
    } = req.session.user;
    usersModel.getUserById(id, (err, result) => {
      if (err) return res.send('404')
      // var obj = result[0];
      // obj.isLogin = req.session.isLogin;
      res.render('profile', {
        src: req.session.user ? req.session.user.avatar : '/static/uploads/avatar.jpg',
        nickname:req.session.user?req.session.user.nickname:'未知的昵称',
        isLogin: req.session.isLogin,
        ...result[0]
      })
    })
  },
  //个人中心更新数据
  updateProfileInfo(req, res) {
    console.log(req.body);

    usersModel.updateProfileInfo(req.body, result => {
      if (result) return res.json({
        "code": 1,
        "msg": '更新失败'
      })

      res.json({
        "code": 0,
        "msg": '更新成功'
      })
    })
  },
  //显示修改密码页面
  showPasswordResetPage(req, res) {
    // if (!req.session.isLogin) {
    //   res.redirect('/login')
    //   return;
    // }
    res.render('password-reset', {
      src:req.session.user?req.session.user.avatar:'/static/uploads/avatar.jpg',
      nickname:req.session.user?req.session.user.nickname:'未知的昵称',
      isLogin: req.session.isLogin
    })
  },
  //验证旧密码
  validateOldPasswordById(req, res) {
    let {
      password,
      id
    } = req.body

    usersModel.validateOldPasswordById(id, (err, result) => {
      if (err) return res.json({
        "code": 2,
        "msg": "服务器端错误"
      })
      console.log(result);

      if (password == result[0].password) {
        res.json({
          "code": 0,
          "msg": "旧密码是正确的"
        })
      } else {
        res.json({
          "code": 1,
          "msg": "旧密码不正确"
        })
      }
    })
  },

  //修改密码
  updateProfilePassword(req, res) {
    console.log(req.body);
    // { password: '111', id: '36' }
    usersModel.updateProfilePassword(req.body, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "更新失败"
      })

      res.json({
        "code": 0,
        "msg": "更新成功"
      })
    })
  }
}