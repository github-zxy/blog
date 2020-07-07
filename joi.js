//引入验证模块
const Joi = require('joi')

//创建验证规则
const schema = {
    username: Joi.string().min(2).max(5).required().error(new Error('username没有验证通过')),

}

//验证
async function run() {
    try {
        //实行验证
        await Joi.validate({ username: '1' }, schema)
    } catch (ex) {
        // 失败信息
        console.log(ex.message);
        return
    }
    console.log('验证通过');
}
//调用函数
run()
