/*
 * @Description:table列表接口
 */

import { post, prefix, get } from "../requestDecorator";
import faker from 'faker'
import HourseModel from "../mongodb/models/HourseSchea";
import { cloneDeep } from 'lodash'

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
@prefix('/hourse')
export default class Article {

  @get('/hourses')
  async getArticles(ctx: any) {
    const data = await HourseModel.find();
    ctx
    console.log({ data });
    return data

    // const { importance, type, title, page = 1, limit = 20, sort } = ctx.request.body
    // let mockList = articleList.filter(item => {
    //   if (importance && item.importance !== +importance) return false
    //   if (type && item.type !== type) return false
    //   if (title && item.title.indexOf(title as string) < 0) return false
    //   return true
    // })

    // if (sort === '-id') {
    //   mockList = mockList.reverse()
    // }
    // const pageList = mockList.filter((_, index) => index < (limit as number) * (page as number) && index >= (limit as number) * (page as number - 1))
    // return {
    //   total: mockList.length,
    //   items: pageList
    // }
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
    console.log({tag,pic_desc});
    
    let pic_descArr: any, tagArr: any, indoor_map_descArr: any
    if (pic_desc) pic_descArr = pic_desc?.split('&')
    if (tag.length > 0  ) tagArr = tag?.split(',')
    if (indoor_map_desc) indoor_map_descArr = cloneDeep(indoor_map_desc)
    const result = indoor_map_descArr?.map((item: any, index: string | number) => {
      return {
        ...item,
        desc: pic_descArr[index]
      };
    });
    const insertData = { ...cloneDeep(ctx.request.body), indoor_map_desc: result, tag: tagArr }

    const data = await HourseModel.create(insertData);


    // return {
    //   code: 20000,
    //   data: {
    //     article
    //   }
    // }
    console.log({ 5555: data,tagArr });

  }
  @post('/updateArticle')
  async updateArticle(ctx: any) {
    const { indoor_map_desc, tag, pic_desc, _id } = ctx.request.body

    console.log({tag});
    

   
    let pic_descArr: any, tagArr: any, indoor_map_descArr: any
    if (pic_desc) pic_descArr = pic_desc?.split('&')
    if (tag.length > 0  ) tagArr = tag?.split(',')
    if (indoor_map_desc) indoor_map_descArr = cloneDeep(indoor_map_desc)
    const result = indoor_map_descArr?.map((item: any, index: string | number) => {
      return {
        ...item,
        desc: pic_descArr[index]
      };
    });
    const insertData = { ...cloneDeep(ctx.request.body), indoor_map_desc: result, tag: tagArr }
    const filter = { _id }; // 替换为你要更新的文档 ID
    const update = { $set: insertData }; // 替换为你要更新的字段和新值
    

    const data = await HourseModel.updateOne(filter, update);

    console.log({ data, insertData });


    return result
  }

  @post('/deleteArticle')
  deleteArticle(ctx: any) {
    console.log(ctx)
    return {
      code: 20000
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
