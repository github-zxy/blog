//引入express框架
const express = require('express')

//创建博客展示页面路由
const home = express.Router()

//博客前台页面的展示首页
home.get('/', require('./home/index'))

//博客前台文章的详情展示页面
home.get('/article', require('./home/article'))

//评论功能路由
home.post('/comment',require('./home/comment'))

//将路由对象作为模块化成员进行导出
module.exports = home