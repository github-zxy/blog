const { User } = require('../../model/user')
const bcrypt = require('bcrypt')

module.exports = async (req, res, next) => {
    //接受客户端请求过来的参数
    const { username,email,role,state,password} = req.body
    //即将要修改的用户id
    const id = req.query.id
    let user = await User.findOne({ _id: id })
    const isValid = await bcrypt.compare(password, user.password)

    //密码对比
    if (isValid) {
        //成功
        // res.send('密码比对成功')
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        })
        res.redirect('/admin/user')
    } else {
        //失败
        let obj = { path: '/admin/user-edit', message: '密码错误', id: id }
        next(JSON.stringify(obj))
    }
    // res.send(user)
}