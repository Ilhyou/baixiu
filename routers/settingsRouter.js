//1.引入模块
const express = require('express');

//引入控制器模块
const settingsCtrl = require('../controllers/settingsCtrl')

//2.创建路由实例
const router = express.Router();

//3.添加路由
router.get('/nav-menus', settingsCtrl.showNavMenusPage)
.get('/getNavMenusData',settingsCtrl.getNavMenusData)
.post('/addNewNavMenus',settingsCtrl.addNewNavMenus)
.get('/delNavMenus',settingsCtrl.delNavMenusByIndex)
.get('/delMoreNavMenus',settingsCtrl.delMoreNavMenus)

.get('/slides',settingsCtrl.showSlidesPage)
.get('/getSlidesData',settingsCtrl.getSlidesData)
.post('/addNewSlides',settingsCtrl.addNewSlides)
.get('/delSlides',settingsCtrl.delSlides)

.get('/settings',settingsCtrl.showSettingsPage)
.post('/updateSettings',settingsCtrl.updateSettings)

// 4.向外暴露数据
module.exports = router;