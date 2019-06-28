const router = require("koa-router")();
router.get("/", async (ctx) => {
    ctx.render("index");
});
module.exports = router.routes();
