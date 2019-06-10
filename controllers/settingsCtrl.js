const settingsModel = require('../models/settingsModel')

// 向外暴露数据
module.exports = {
  showNavMenusPage(req, res) {
    res.render('nav-menus', {
      src:req.session.user?req.session.user.avatar:'/static/uploads/avatar.jpg',
      nickname:req.session.user?req.session.user.nickname:'未知的昵称',
      isLogin: req.session.isLogin
    })
  },
  getNavMenusData(req, res) {
    settingsModel.getNavMenusData((err, result) => {
      if (err) return res.json({
        "code": 1,
        "msg": "查询数据失败"
      })
      // console.log(result[0].value);
      res.json({
        "code": 0,
        "msg": "查询数据成功",
        "data": JSON.parse(result[0].value)
      })
    })
  },
  addNewNavMenus(req, res) {
    let navMenus = req.body;
    settingsModel.addNewNavMenus(navMenus, result => {
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
  delNavMenusByIndex(req, res) {
    let {
      index
    } = req.query;
    settingsModel.delNavMenusByIndex(index, result => {
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
  delMoreNavMenus(req, res) {
    let {
      idxs
    } = req.query;
    settingsModel.delMoreNavMenus(idxs, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "批量删除失败"
      })

      res.json({
        "code": 0,
        "msg": "批量删除成功"
      })
    })
  },

  showSlidesPage(req, res) {
    res.render('slides', {
      src:req.session.user?req.session.user.avatar:'/static/uploads/avatar.jpg',
      nickname:req.session.user?req.session.user.nickname:'未知的昵称',
      isLogin: req.session.isLogin
    })
  },
  getSlidesData(req, res) {
    settingsModel.getSlidesData((err, result) => {
      if (err) return res.json({
        "code": 1,
        "msg": "查询数据失败"
      })
      res.json({
        "code": 0,
        "msg": "查询数据成功",
        "data": JSON.parse(result[0].value)
      })
    })
  },
  addNewSlides(req, res) {
    let slide = req.body;
    settingsModel.addNewSlides(slide, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "添加数据失败"
      })

      res.json({
        "code": 0,
        "msg": "添加数据成功"
      })
    })
  },
  delSlides(req, res) {
    let {
      index
    } = req.query;
    settingsModel.delSlides(index, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "删除数据失败"
      })
      res.json({
        "code": 0,
        "msg": "删除数据成功"
      })
    })
  },

  showSettingsPage(req, res) {
    settingsModel.getSettingsData((err, result) => {
      if (err) return res.send('404')
      res.render('settings', {
        src:req.session.user?req.session.user.avatar:'/static/uploads/avatar.jpg',
        nickname:req.session.user?req.session.user.nickname:'未知的昵称',
        isLogin: req.session.isLogin,
        site_logo: result[1].value, // 网站logo图标
        site_name: result[2].value, // 网站名称 
        site_description: result[3].value, // 网站描述
        site_keywords: result[4].value, // 网站关键字 
        comment_status: result[6].value, // 是否开启评论功能 0开启 1 不开启
        comment_reviewed: result[7].value // 是否经过人工批准 0 不经过 1 经过
      })
    })

  },
  updateSettings(req, res) {
    let obj = req.body;

    obj.comment_status = obj.comment_status === 'on' ? 0 :  1
    obj.comment_reviewed =obj.comment_reviewed === 'on' ? 1 :  0
    console.log(obj);
    settingsModel.updateSettings(obj,result=>{
      if(result) return res.json({
        "code":1,
        "msg":"更新数据失败"
      })

      res.json({
        "code":0,
        "msg":"更新数据成功"
      })
    })
  }
}