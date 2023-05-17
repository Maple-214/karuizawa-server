//引入模块
const mongoose = require('mongoose')
import { MONGODB_URL } from './config/index'


//连接数据库
mongoose.connect(`${MONGODB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//得到数据库连接句柄
const db = mongoose.connection
//通过数据库连接句柄，监听mongoose数据库成功的事件
db.on('error', () => {
    console.log('****数据库连接失败****')
})
db.on('open', () => {
    console.log('****数据库连接成功****')
})
module.exports = {
    db
}