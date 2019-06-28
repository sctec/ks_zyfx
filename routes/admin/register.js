const router = require('koa-router')();
const tools = require('../../model/tools.js');
const DB = require('../../model/db.js');

router.get('/', async (ctx) => {
    await ctx.render('register');
});

//post
router.post('/doregister', async (ctx) => {
    let username = ctx.request.body.username;
    let phone = ctx.request.body.phone;
    let password = ctx.request.body.password;
    let repassword = ctx.request.body.repassword;
    if (password != repassword) {
        ctx.render('error', {
            message: '密码不一致',
            redirect: ctx.state.__HOST__ + '/admin/register'
        });
    }
    let result = await DB.find('users', {"username": username});
    if (result[0]) {
        ctx.render('error', {
            message: '用户名重复',
            redirect: ctx.state.__HOST__ + '/admin/register'
        });
    } else {
        let addResult = await DB.insert("users", {
            "username": username,
            "phone": phone,
            "password": password
        });
        console.log(addResult.ops[0]);
        if (addResult) {
            ctx.session.userinfo2 = addResult.ops[0];
            ctx.redirect(ctx.state.__HOST__ + '/admin');
            // await ctx.render('admin/login');
        }
    }
});

module.exports = router.routes();