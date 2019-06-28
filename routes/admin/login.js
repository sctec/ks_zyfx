const router = require('koa-router')();
const tools = require('../../model/tools.js');
const DB = require('../../model/db.js');

router.get('/', async (ctx) => {
    await ctx.render('login');
});

//post
router.post('/dologin', async (ctx) => {
    console.log("hahha");
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    console.log(username);
    console.log(password);
    var result = await DB.find('users', {"username": username, "password": password});
    console.log(result);
    if (result[0]) {
        console.log('成功');
        console.log(result[0]);
        ctx.session.userinfo = result[0];
        ctx.redirect(ctx.state.__HOST__ + '/admin');
    } else if (result[0] && result[0].sys_user == 0) {
        ctx.session.userinfo2 = result[0];
        ctx.redirect(ctx.state.__HOST__ + '/user');
    } else {
        ctx.render('error', {
            message: '用户名或者密码错误',
            redirect: ctx.state.__HOST__ + '/admin/login'
        });
    }
});

router.get('/loginout', async (ctx) => {
    ctx.session.userinfo = null;
    ctx.redirect(ctx.state.__HOST__ + "/admin/login");
});

module.exports = router.routes();