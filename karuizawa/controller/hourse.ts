/*
 * @Description:table列表接口
 */

import { post, prefix, get } from "../requestDecorator";
import faker from 'faker'
import HourseModel from "../mongodb/models/HourseSchea";
import { cloneDeep } from 'lodash'
const { ObjectId } = require('mongodb');

export interface ArticleModel {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}


const articleList: ArticleModel[] = []
const articleCount = 100
const mockFullContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

for (let i = 0; i < articleCount; i++) {
  articleList.push({
    id: i,
    status: faker.random.arrayElement(['published', 'draft']),
    title: faker.lorem.sentence(6, 10),
    abstractContent: faker.lorem.sentences(2),
    fullContent: mockFullContent,
    sourceURL: faker.internet.url(),
    imageURL: faker.image.imageUrl(),
    timestamp: faker.date.past().getTime(),
    platforms: [faker.random.arrayElement(['a-platform', 'b-platform', 'c-platform'])],
    disableComment: faker.random.boolean(),
    importance: faker.random.number({ min: 1, max: 3 }),
    author: faker.name.findName(),
    reviewer: faker.name.findName(),
    type: faker.random.arrayElement(['CN', 'US', 'JP', 'EU']),
    pageviews: faker.random.number({ min: 300, max: 500 })
  })
}
@prefix('/api/hourse')
export default class Article {

  @get('/hourses')
  async getArticles(ctx: any) {
    const page = parseInt(ctx.query.page) || 1; // 获取页码，默认为第一页
    const limit = parseInt(ctx.query.limit) || 5; // 每页显示的数据量，默认为10
    const title = ctx.query?.title || ''
    const getall = ctx.query?.getall || false
    try {
      // 查询当前页的数据
      let data: any, total: number
      if (title) {
        data = await HourseModel.find({ name: new RegExp(title) })
          .skip((page - 1) * limit)
          .limit(limit);
        total = (await HourseModel.find({ name: new RegExp(title) })).length
      } else if (getall) {
        data = await HourseModel.find()
        total = (await HourseModel.find()).length
      } else {
        // 查询总记录数
        total = await HourseModel.countDocuments();
        data = await HourseModel.find()
          .skip((page - 1) * limit)
          .limit(limit);

      }
      console.log({ query: ctx.query });
      return {
        data,
        total,
      }
    } catch (error) {
      return { error: 'Internal Server Error' }
    }
  }
  @get('/detail')
  async getHoursesDetail(ctx: any) {
    const _id = ctx.query?._id || ''
    try {
      let data: any
      data = await HourseModel.find({ _id, })
      console.log({ query: ctx.query });
      if (data.length > 0) {
        return data[0]
      } else {
        return {}
      }
    } catch (error) {
      return { error: 'Internal Server Error' }
    }
  }
  @post('/favlist')
  async getFavList(ctx: any) {
    const { ids } = ctx.request.body;
    try {
    const query = { _id: { $in: JSON.parse(ids).map((id: any) => new ObjectId(id)) } };
    let data: any
    data = await HourseModel.find(query)
    return data
    } catch (error) {
      return { error: 'Internal Server Error' }
    }
  }

  @get('/articleInfo')
  async getArticle(ctx: any) {
    const { id } = ctx.query
    for (const article of articleList) {
      if (article.id.toString() === id) {
        return article
      }
    }
    return {
      code: 70001,
      message: 'Article not found'
    }
  }


  @post('/createArticle')
  async createArticle(ctx: any) {
    const { indoor_map_desc, tag, pic_desc } = ctx.request.body
    console.log({ tag, pic_desc, indoor_map_desc });

    let pic_descArr: any, indoor_map_descArr: any, result: any
    if (pic_desc) pic_descArr = pic_desc?.split('&')
    if (indoor_map_desc.length > 0) {
      indoor_map_descArr = cloneDeep(indoor_map_desc)
      result = indoor_map_descArr?.map((item: any, index: string | number) => {
        return {
          ...item,
          desc: pic_descArr[index]
        };
      });
    }

    const insertData = { ...cloneDeep(ctx.request.body), indoor_map_desc: result }

    const data = await HourseModel.create(insertData);

    if (data) {
      return data
    } else {
      ctx.body = {
        code: 502,
        msg: '服务端出错'
      }
    }



    console.log({ 5555: data });

  }
  @post('/updateArticle')
  async updateArticle(ctx: any) {
    const { indoor_map_desc, tag, pic_desc, _id } = ctx.request.body


    let pic_descArr: any, indoor_map_descArr: any
    if (pic_desc) pic_descArr = pic_desc?.split('&')
    if (indoor_map_desc) indoor_map_descArr = cloneDeep(indoor_map_desc)
    const result = indoor_map_descArr?.map((item: any, index: string | number) => {
      return {
        ...item,
        desc: pic_descArr[index]
      };
    });
    console.log({ tag, pic_descArr });
    const insertData = { ...cloneDeep(ctx.request.body), indoor_map_desc: result }
    const filter = { _id }; // 替换为你要更新的文档 ID
    const update = { $set: insertData }; // 替换为你要更新的字段和新值
    const data = await HourseModel.updateOne(filter, update);
    console.log({ data, insertData });
    if (data) {
      return insertData
    } else {
      ctx.body = {
        code: 502,
        msg: '服务端出错'
      }
    }
  }

  @post('/delete')
  async deleteArticle(ctx: any) {
    const { _id } = ctx.request.body
    const data = await HourseModel.deleteOne({ _id })
    if (data.acknowledged) {
      return {
        msg: "删除成功"
      }
    } else {
      return {
        msg: "删除失败"
      }
    }
  }

  @get('/getPageviews')

  getPageviews(ctx: any) {
    console.log(ctx)
    return {
      code: 20000,
      data: {
        pageviews: [
          { key: 'PC', pageviews: 1024 },
          { key: 'Mobile', pageviews: 1024 },
          { key: 'iOS', pageviews: 1024 },
          { key: 'Android', pageviews: 1024 }
        ]
      }
    }
  }


}
