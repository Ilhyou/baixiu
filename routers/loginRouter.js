//1.引入express模块
const express = require('express');

const loginCtrl = require('../controllers/loginCtrl')

// 2.创建路由实例
const router = express.Router();

//3.添加路由
router.get('/login',loginCtrl.showLoginPage)
.post('/login',loginCtrl.login)
.get('/logout',loginCtrl.logout)
//4 向外暴露数据
module.exports = router;