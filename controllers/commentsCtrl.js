// 1. 引入模块
const commentsModel = require('../models/commentsModel')

// 2. 向外暴露数据
module.exports = {
  // 显示评论页面
  showCommentsPage(req, res) {
    res.render('comments', {
      src:req.session.user?req.session.user.avatar:'/static/uploads/avatar.jpg',
      nickname:req.session.user?req.session.user.nickname:'未知的昵称',
      isLogin: req.session.isLogin
    })
  },
  // 根据页码来获取要显示的评论数据
  getCommentsDataByPage(req, res) {
    let {
      currentPage
    } = req.query;
    currentPage = currentPage ? currentPage : 1;
    commentsModel.getCommentsDataByPage(currentPage, (err, results) => {
      console.log(results);
      if (err) return res.json({
        "code": 1,
        "msg": "获取评论失败"
      })

      res.json({
        "code": 0,
        "msg": "获取评论成功",
        "data": results[0],
        "totalPages": Math.ceil(results[1][0].totalCount / 10)
      })
    })
  },
  // 根据id来删除评论内容
  delCommentsById(req,res){
    let {id} = req.query;

    commentsModel.delCommentsById(id,result=>{
      if(result) return res.json({
        "code":1,
        "msg":"删除评论失败"
      })
      res.json({
        "code":0,
        "msg":"删除评论成功"
      })
    })
  },

  // 根据id更新评论状态
  approvedCommentsById(req,res){
    let {id} = req.query;

    commentsModel.approvedCommentsById(id,'approved',result=>{
      if(result) return res.json({
        "code":1,
        "msg":"更新批准状态失败"
      })

      res.json({
        "code": 0,
        "msg": "更新批准状态成功"
      })
    })
  },

  // 根据id拒绝评论状态
  rejectedCommentsById(req,res){
    let {id} = req.query;

    commentsModel.approvedCommentsById(id,'rejected',result=>{
      if(result) return res.json({
        "code":1,
        "msg":"更新批准状态失败"
      })

      res.json({
        "code": 0,
        "msg": "更新批准状态成功"
      })
    })
  }

}