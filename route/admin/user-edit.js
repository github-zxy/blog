const { User } = require('../../model/user.js')

module.exports = async (req, res) => {

    //标识 标识当前访问的是用户编辑页面
    req.app.locals.currentLink ='user'

    //获取传递的id参数
    const { message, id } = req.query
    // 判断id是否为真
    if (id) {

        //修改用户资料操作
        let user = await User.findOne({ _id: id })

        //渲染用户编辑页面
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        })
    } else {
        //新增用户操作
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        })
    }
}

