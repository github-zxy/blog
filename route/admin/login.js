//引入bcrypt模块
const bcrypt = require('bcrypt')
//导入用户集合构造函数
const { User } = require('../../model/user')

module.exports = async (req, res) => {
    //接受请求参数
    const { password, email } = req.body
    //判断用户没有输入邮箱地址
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮箱或密码输入有误' })
    }
    //查询数据库
    let user = await User.findOne({ email })
    // 查询到用户
    if (user) {
        //将客户端传递过来的密码和用户信息进行对比
        //true 密码匹配成功
        //false 密码匹配失败
        let isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            //登录成功
            //将用户名存储在请求对象中
            req.session.username = user.username
            //将用户名存储在session对象中
            req.session.role=user.role
            //把用户名字渲染到页面
            req.app.locals.userInfo = user
            if (user.role == 'admin') {
                //重定向到用户列表页面
                res.redirect('/admin/user')
            } else { 
                //重定向到博客首页
                res.redirect('/home/')
            }

            //重定向到用户页面
            res.redirect('/admin/user')
        } else {
            //密码错误
            res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' })
        }
    } else {
        //没有查询到用户
        res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' })
    }
} 