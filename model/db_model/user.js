let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//  数据库集合名称：user
let userSchema = new Schema({
    //姓名
    name: {
        type: String,
        required: true,
    },
    //密码
    password: {
        type: String,
        required: true,
    },
    //性别：
    sex: {
        type: String,
        required: true,
    },
    //手机号：
    phone: {
        type: number,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);
