const router = require("koa-router")();
const login = require("./admin/login.js");
const register = require("./admin/register.js");
const DB = require('../model/db.js');
const url = require("url");

router.use(async (ctx, next) => {
    ctx.state.__HOST__ = "http://" + ctx.request.header.host;
    let pathname = url.parse(ctx.request.url).pathname.substring(1);
    //左侧菜单栏选中
    let splitUrl = pathname.split("/");
    // console.log(splitUrl);
    ctx.state.G = {
        url: splitUrl,
        userinfo: ctx.session.userinfo,
        prevPage: ctx.request.headers["referer"]
    };
    //权限判断
    if (ctx.session.userinfo || ctx.session.userinfo2) {
        await next();
    } else {
        if (pathname == "admin/register/doregister" || pathname == "admin/register" || pathname == "admin/login" || pathname == "admin/login/dologin" || pathname == "admin/login/code") {
            await next();
        } else {
            ctx.redirect("/admin/login");
        }
    }
});
router.get("/", async (ctx) => {
    console.log(ctx.session.userinfo2);
    tusername = ctx.session.userinfo2.username;
    console.log(tusername + "wozhaodaole");
    let result = await DB.find('users', {"username": tusername});
    await ctx.render("personal_ziliao", {
        username: result[0].username,
        phone: result[0].phone
    });
});


// router.use(index);
router.use("/login", login);
// router.use("/user", user);
router.use("/register", register);
// router.use("/classify", classify);
//
// router.use("/M100", M100);
// router.use("/F100", F100);
// router.use("/M1000", M1000);
// router.use("/F800", F800);
//
// router.use("/search", search);
// router.use("/statistics", statistics);

module.exports = router.routes();