//引入模块
const express = require('express');

const ctgCtrl = require('../controllers/ctgCtrl')

//创建路由对象
const router = express.Router();

//添加路由
router.get('/categories',ctgCtrl.showCtgPage)
.get('/getCtgData',ctgCtrl.getCtgData)
.post('/addCtg',ctgCtrl.addCtg)
.get('/delCtg',ctgCtrl.delCtg)
.get('/getCtgById',ctgCtrl.getCtgById)
.post('/updateCtg',ctgCtrl.updateCtg)
.get('/delMoreCtgs',ctgCtrl.delMoreCtgs)

//向外暴露数据
module.exports = router;