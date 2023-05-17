interface UserSchema {
    userId: String,
    username: String,
    nickname: String,
    password: String,
    avatar: String,
    introduction: String,
    email: String,
    phone: String,
    roles: ['admin' | 'editor' | 'visit']
}

interface UserInfo {
    userId: String,
    accessToken: String,
    username: String,
    nickname: String,
    avatar: String,
    introduction: String,
    email: String,
    phone: String,
    roles: ['admin' | 'editor' | 'visit']
    err?: String
}

interface OtherInfo {
    err?: String
}
export {
    UserSchema,
    UserInfo,
    OtherInfo
}