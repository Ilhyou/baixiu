const ctgModel = require('../models/ctgModel')
module.exports = {
  showCtgPage(req, res) {
    // 要开启验证,没有登陆的时候，是不可以直接访问这个页面的
    // if (!req.session.isLogin) {
    //   res.redirect('/login')  // 跳转到登陆页面
    //   return
    // }
    res.render('categories', {
      src: req.session.user ? req.session.user.avatar : '/static/uploads/avatar.jpg',
      nickname:req.session.user?req.session.user.nickname:'未知的昵称',
      isLogin: req.session.isLogin
    })
  },
  getCtgData(req, res) {
    ctgModel.getCtgData((err, results) => {
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
  addCtg(req, res) {
    let ctg = req.body;
    ctgModel.addCtg(ctg, result => {
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
  delCtg(req, res) {
    let {
      id
    } = req.query;

    ctgModel.delCtg(id, result => {
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
  getCtgById(req, res) {
    let {
      id
    } = req.query;

    ctgModel.getCtgById(id, (err, results) => {
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
  updateCtg(req, res) {
    let ctg = req.body;
    console.log(ctg);
    ctgModel.updateCtg(ctg, reslut => {
      if (reslut) return res.json({
        "code": 1,
        "msg": "更新失败"
      })
      res.json({
        "code": 0,
        "msg": "更新成功"
      })
    })
  },
  delMoreCtgs(req, res) {
    let {
      ids
    } = req.query
    ctgModel.delMoreCtgs(ids, result => {
      if (result) return res.json({
        "code": 1,
        "msg": '批量删除失败'
      })

      res.json({
        "code": 0,
        "msg": '批量删除成功'
      })
    })
  }
}