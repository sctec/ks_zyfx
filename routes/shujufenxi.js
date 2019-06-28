const router = require("koa-router")();
const DB = require('../model/db.js');
const url = require("url");

router.get("/", async (ctx) => {
    await ctx.render("shujufenxi");
});
router.get("/2", async (ctx) => {
    await ctx.render("shujufenxi2");
});
router.get("/3", async (ctx) => {
    await ctx.render("shujufenxi3");
});
router.get("/4", async (ctx) => {
    await ctx.render("shujufenxi4");
});
router.get("/5", async (ctx) => {
    await ctx.render("shujufenxi5");
});
module.exports = router.routes();