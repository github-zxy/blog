//引入第三方模块mongoose
const mongoose = require('mongoose')
//引入bcrypt模块
const bcrypt = require('bcrypt')
//引入验证模板
const Joi = require('joi')

//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        //保证邮箱地址在插入数据库时不能重复
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    //admin:超级管理员
    //norma:普通用户
    role: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        //默认状态
        default: 0
    }
})
//使用规则创建集合
const User = mongoose.model('User', userSchema)

//设置加密操作
async function createUser() {
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash('123456', salt)
    
    // 测试创建用户
    // const user = await User.create({
    //     username: '成克杰',
    //     email: 'chengkejie@qq.com',
    //     password: pass,
    //     role: 'admin',
    //     state: 0
    // });
    // .then(() => console.log('用户创建成功!'))
    // .catch(err => console.log('用户创建失败!'))
}
createUser()

//验证用户信息
const validateUser = user => {
    //创建验证规则
    const schema = {
        username: Joi.string().min(2).max(20).required().error(new Error('用户名格式错误')),
        email: Joi.string().required().error(new Error('邮箱地址格式错误')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,20}$/).error(new Error('密码格式错误')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    }
    //实行验证
    return Joi.validate(user, schema)
}


//把数据暴露出去  以后可能开放其他的所以用对象形式,和es6新特性
module.exports = {
    User,
    validateUser
}

