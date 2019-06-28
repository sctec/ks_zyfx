const router = require("koa-router")();
const DB = require('../model/db.js');
const url = require("url");

router.get("/", async (ctx) => {
    console.log("这是");
    let count = await DB.count("professions");
    // console.log(tusername + "wozhaodaole");
    // let result = await DB.find('users', {"username": tusername});
    let result = await DB.find("professions", {});
    console.log(result);
    await ctx.render("search", {
        listNum: count,
        list: result,
    });
});
router.post("/", async (ctx) => {
    try {
        let name = ctx.request.body.name;
        let searchResult = await DB.find("professions", {"name": name});
        await ctx.render("search", {
            list: searchResult,
        });
    } catch (e) {
        ctx.body = "查找失败";
    }
});
module.exports = router.routes();