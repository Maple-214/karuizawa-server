/*
 * @Description: 图片上传接口
 */
import { post, prefix } from "../requestDecorator";
var path = require("path");

@prefix('/upload')
export default class Upload {
    @post('')
    async upload(ctx: any) {
        
        const file = ctx.request.files.file //ctx.request.files.file中的file需要与前端使用的名称保持一致
        console.log(88888,file);

        const basename = await path.basename(file.filepath) //传入绝对路径返回的basename为文件名称+拓展名
        return {
            filename: file.newFilename,
            url: `${ctx.origin}/img/${basename}`,
            size: file.size,
            mimetype: file.mimetype,
        }
    }
}