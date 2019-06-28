let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//  数据库集合名称：profession
let professionSchema = new Schema({
    //职位名称
    name: {
        type: String,
        required: true,
    },
    //工作城市
    city: {
        type: String,
        required: true,
    },
    //行业类别：
    category: {
        type: String,
        required: true,
    },
    //学历要求：
    education: {
        type: number,
        required: true,
    },
    //职位来源
    source: {
        type: number,
        required: false,
    }

});

module.exports = mongoose.model('Profession', professionSchema);