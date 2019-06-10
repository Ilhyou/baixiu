//1.引入模块
const express = require('express');
const indexCtrl = require('../controllers/indexCtrl');

//2.创建路由对象
const router = express.Router();

//3.添加路由路径
router.get('/',(req,res)=>{
  indexCtrl.showIndexPage(req,res)
})

module.exports = router;