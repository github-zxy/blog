//引入express框架
const express = require('express')
//创建网站服务器
const app = express()
//引入博客首页路由
const home = require('./route/home')
//引入博客管理页面路由
const admin = require('./route/admin')
//引入path处理路径
const path = require('path')
//引入数据库
require('./model/connect')
//引入第三方模块body-parser
const bodyParser = require('body-parser')
//引入express-session存储登录信息
const session = require('express-session')
const { nextTick } = require('process')
//引入dateformat
const dateFormat = require('dateformat')
//引入art-template
const template = require('art-template')
//引入morgan
const morgan = require('morgan')
//引入config模块
const config = require('config')



//处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }))
//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))

console.log(config.get('title'));


// 获取系统环境变量 返回值是对象 
if (process.env.NODE_ENV == 'development') {
    // 当前是开发环境
    console.log('当前是开发环境')
    // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
    app.use(morgan('dev'))
} else {
    // 当前是生产环境
    console.log('当前是生产环境')
}

//告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'))
//告诉expres框架模板的默认后缀
app.set('view engine', 'art')
//当渲染后缀为art的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'))

//向模板导入dateFormate
template.defaults.imports.dateFormat = dateFormat

//配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))

//拦截未登录时访问user页面
app.use('/admin', require('./middleware/loginGuard'))

//为路由器匹配一级请求路径
app.use('/home', home)
app.use('/admin', admin)

//错误处理中间件
app.use((err, req, res, next) => {
    //将字符串对象转换为对象类型
    //JSON.parse()
    const result = JSON.parse(err)
    // let obj = { path: '/admin/user-edit', message: '密码错误', id: id }
    let params = []
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr])
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`)
})

//监听端口
app.listen(80)
console.log('网站服务器启动成功!');
console.log('端口:localhost/admin');

