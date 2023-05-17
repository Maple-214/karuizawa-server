/*
 * @Description: 用户Schema 入口
 */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: String },    // 用户id
    username: { type: String },  // 用户角色
    nickname: { type: String},   // 用户昵称
    password: { type: String},   // 用户密码
    avatar: { type: String},     // 用户头像
    introduction: { type: String},   // 用户介绍
    email: { type: String},   // 用户邮箱
    phone: { type: String},   // 用户电话
    roles: { type: Array},   // 用户身份
},{ versionKey: false });

// 创建Model
const UsersModel = mongoose.model("users", userSchema);
export default UsersModel