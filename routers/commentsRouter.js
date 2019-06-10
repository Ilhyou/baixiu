//1.引入模块
const express = require('express');

//引入控制器模块
const commentsCtrl = require('../controllers/commentsCtrl');

//2.创建路由实例
const router = express.Router();

//3.添加路由
router.get('/comments',commentsCtrl.showCommentsPage)
.get('/getCommentsData',commentsCtrl.getCommentsDataByPage)
.get('/getCommentsDataByPage', commentsCtrl.getCommentsDataByPage)
.get('/delCommentsById',commentsCtrl.delCommentsById)
.get('/approvedComments',commentsCtrl.approvedCommentsById)
.get('/rejectedComments',commentsCtrl.rejectedCommentsById)
// 4.向外暴露数据
module.exports = router;