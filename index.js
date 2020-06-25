const Koa = require('koa')
const app = new Koa();

const Router = require('koa-router')
const router = new Router()

const modules = require('./modules')
modules.init(router)
app.use(router.routes())
app.use(router.allowedMethods())

const port = 8108;
app.listen(port);

console.log(`server is running on: http://localhost:${port}`);
