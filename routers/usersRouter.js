//1.引入模块
const express = require('express');

//引入控制器模块
const usersCtrl = require('../controllers/usersCtrl');
const uploadFileCtrl = require('../controllers/uploadFileCtrl')

//2.创建路由实例
const router = express.Router();

//3.添加路由
router.get('/users', (req, res) => {
    usersCtrl.showUsersPage(req, res)
  })
  .get('/getUsersData', (req, res) => {
    usersCtrl.getUsersData(req, res)
  })
  .post('/addUser', (req, res) => {
    usersCtrl.addUser(req, res)
  })
  .get('/delUser',(req,res)=>{
    usersCtrl.delUser(req, res)
  })
  .get('/editUser',(req,res)=>{
    usersCtrl.getUserById(req, res)
  })
  .post('/updateUser',(req,res)=>{
    usersCtrl.updateUser(req, res)
  })
  .get('/delMoreUsers',usersCtrl.delMoreUsers)


  //个人中心
  .get('/profile',usersCtrl.showProfilePage)
  .post('/uploadFile',uploadFileCtrl.uploadFile)
  .post('/updateProfileInfo',usersCtrl.updateProfileInfo)
  .get('/passwordReset',usersCtrl.showPasswordResetPage)
  .post('/validateOldPassword',usersCtrl.validateOldPasswordById)
  .post('/updateProfilePassword',usersCtrl.updateProfilePassword)
module.exports = router;