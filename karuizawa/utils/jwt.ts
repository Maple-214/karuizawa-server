// 引入模块依赖
// const jwt = require('jsonwebtoken');
export const PRIVITE_KEY = 'key'

// // 生成token
// export const generateToken = (payload: any) => {

//     //私钥 加密
//     const cert = PRIVITE_KEY
//     const token = jwt.sign(payload, cert, { expiresIn: '1h' });
//     return token;
// }

// // 校验token
// export const verifyToken = (token: any) => {
//     const decoded = jwt.verify(token, 'secret111');
//     return decoded;
// }