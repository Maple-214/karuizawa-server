/*
 * @Description: 房屋Schema 入口
 */
const mongoose = require("mongoose");

const HourseSchema = new mongoose.Schema({
    // 'プレビュー'
    preview_image: { type: Object },
    // '名前'
    name: { type: String },
    // '説明'
    desc: { type: String },
    // '駅'
    station: { type: String },
    // '価格'
    price: { type: String },
    // '間取り'
    floor_plan: { type: String },
    // '建物面積'
    construction_area: { type: String },
    // '土地面積'
    Land_area: { type: String },
    // '交通'
    transportation: { type: String },
    // '構造・階数'
    House_structure: { type: String },
    // '詳細ページの説明'
    detail_desc: { type: String },
    // '内部の図面と説明'
    indoor_map_desc: { type: Array },
    // '所在地'
    location: { type: String },
    // 地域地区街区
    regional_district_block: { type: String },
    // '私道負担面積'
    private_road: { type: String },
    // 'セットバック'
    setback: { type: String },
    // '建ぺい率'
    building_coverage_ratio: { type: String },
    // '容積率'
    floor_area_ratio: { type: String },
    // '設備'
    facility: { type: String },
    // 'その他設備'
    other_equipment: { type: String },
    // '現況'
    current_situation: { type: String },
    // '取引態様'
    mode_of_transaction: { type: String },
    // '引渡条件'
    delivery_conditions: { type: String },
    // '引渡時期'
    delivery_time: { type: String },
    // '築年月'
    time: { type: String },
    // '土地権利'
    land_rights: { type: String },
    // '備考'
    remarks: { type: String },
    // 'その他費用'
    other_expenses: { type: String },
    // '都市計画区域区分'
    city_planning_area_division: { type: String },
    // '地目'
    landmark: { type: String },
    // '区画整理'
    land_readjustment: { type: String },
    // '都市計画道路'
    ticity_planning_roadme: { type: String },
    // '用途地域'
    use_area: { type: String },
    // '地勢'
    terrain: { type: String },
    // '接道状況'
    contact_situation: { type: String },
    // '主な接道'
    main_approach: { type: String },
    // '法令制限'
    legal_restrictions: { type: String },
    // '駐車場'
    parking: { type: String },
    // '次回更新予定日'
    update: { type: String },
    // '轮播图片类型 1-banner 2-新着物件 3-営業担当のオススメ物件 4-価格変更 5-新着賃貸物件 6-おすすめ賃貸物件'
    pic_type: { type: String },
    // 标签
    tag: { type: Array },
    // 新物件
    new_hourse: { type: Boolean },
    // 住宅構造図
    house_structure_picture: { type: Object },
    // ユーチューブのリンク
    youtube_src: { type: String },
    // 売主様より
    seller_talk: { type: String },
    // 担当者より
    charge_talk:　{ type: String },
},{ versionKey: false });

// 创建Model
const HourseModel = mongoose.model("hourses", HourseSchema);
export default HourseModel