/*
 * @Description: app 入口
 */
import Koa, { Context } from "koa";
import koaBody from "koa-body";
import koaRouter from "koa-router";
import addRouter from "./router";
import logger from "koa-logger";
import log4js from "log4js";
import { ResultHandler } from './middleware/resultHandler'
// import chalk from "chalk";
import cors from "koa2-cors";
import path from 'path'
const jwt = require('koa-jwt')
// import { PRIVITE_KEY } from './utils/jwt'

require('./mongodb/connect')

const staticFiles = require('koa-static');
const app = new Koa();


const home = staticFiles(path.join(__dirname) + '/public/static');
app.use(home)

app.use(cors());
const router = new koaRouter();

const port = 3300;
const log4 = log4js.getLogger();
log4.level = "debug";

//日志打印
app.use(logger(info => {
  log4.debug(info);
}));
// 验证失败会返回401错误
app.use(jwt({ secret: 'PRIVITE_KEY',debug: true})
   .unless({ path: [/^\/user\/login/] }));
app.use(koaBody({
  multipart: true, //支持图片文件
  formidable: {
    uploadDir: path.join(__dirname, '/public/static/img/'), //设置上传目录
    keepExtensions: true, //保留拓展名
    maxFileSize: 200 * 1024 * 1024,	// 设置上传文件大小最大限制，默认2M,
    onFileBegin: (_name, file) => {	// 文件存储之前对文件进行重命名处理
      // file.newFilename = `${Date.now()}` + file.originalFilename
      file.newFilename = file.originalFilename
      file.filepath = path.join(__dirname, '/public/static/img/') + file.newFilename;
    },
  }
}))

// app.use(async (ctx, next) => {
//   await next()
//   // log4.debug(chalk.green('请求路径:  ') + ctx.request.url);
//   log4.debug(chalk.green('请求body:  ') + JSON.stringify(ctx.request.body));
//   log4.debug(chalk.green('返回数据:  ') + JSON.stringify(ctx.body));
// })



app.use(ResultHandler());
//加载路由
addRouter(router);
//启动路由
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx: Context) => {
  log4.error(`404 ${ctx.message} : ${ctx.href}`);
  ctx.status = 404;
  ctx.body = "404! api not found !";
});

// koa already had middleware to deal with the error, just register the error event
app.on("error", (err, ctx: Context) => {
  log4.error(err); //log all errors
  ctx.status = 500;
  if (ctx.app.env !== "development") {
    ctx.res.end(err.stack); //finish the response
  }
});



app.listen(port, () => {
  log4.debug("mock server running at: http://localhost:%d", port);
});
