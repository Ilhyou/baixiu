//1.引入express模块
const express = require('express');
const postsCtrl = require('../controllers/postsCtrl')
const uploadFileCtrl = require('../controllers/uploadFileCtrl')

//2.创建路由对象
var router = express.Router();

//3.添加路由
router.get('/posts', postsCtrl.showPostsPage)
  // .get('/getPostsData', postsCtrl.getPostsData)
  // .get('/getAllData', postsCtrl.getAllData)
  .get('/getAllPostsData', postsCtrl.getAllPostsData)
  .get('/getPostsDataByPage', postsCtrl.getAllPostsData)
  .get('/delPostsById',postsCtrl.delPostsById)

  .get('/post-add', postsCtrl.showPoatAddPage)
  .post('/uploadPostFile', uploadFileCtrl.uploadFile)
  .post('/addPost',postsCtrl.addPost)

  .get('/editPosts',postsCtrl.showEditPostsPage)
  .post('/updatePosts',postsCtrl.updatePosts)
//4.向外暴露数据
module.exports = router;