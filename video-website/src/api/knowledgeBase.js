import request from '@/utils/request'

/** 基本功能接口
 * @method login 登录
 * @method someVideos 首页或者搜索页的多个视频数据
 * @method oneVideo 单个视频的数据
 * @method oneArticle 单个文章的数据
 * @method someArticles 首页或者搜索页的文章数据
 * @method addQuestion 添加问题
 * @method someQuestions 首页或者搜索页的问题数据
 * @method oneQuestion 展示一个问题、问题的回答、问题的回答的评论的数据
 */

// 登录
// POST /login
// | 名称        | 位置  | 类型   | 必选  | 说明 |
// | ---------- | ---- | ------ | ---- | ---- |
// | body       | body | object | 否   | none |
// | » username | body | string | 是   | none |
// | » password | body | string | 是   | none |
export async function login(username, password) {
    return await request({
        method: 'POST',
        url: '/login',
        data: {
            username,
            password
        }
    })
}

// 获取单个文章数据
// GET /article
// | 名称    | 位置   | 类型    | 必选 | 说明            |
// | ------ | ----- | ------ | ---- | -------------- |
// | id     | query | string | 是   | 文章的id         |
// | userId | query | string | 是   | 当前登录用户id    |
export async function oneArticle(id, userId) {
    return await request({
        method: 'GET',
        url: '/article',
        params: {
            id,
            userId
        }
    })
}

// 获取首页或搜索页的多个视频数据
// GET /video/some
// | 名称       | 位置   | 类型    | 必选 | 说明                       |
// | --------- | ----- | ------ | ---- | ------------------------- |
// | page      | query | string | 是   | 第几页，默认为1              |
// | queryName | query | string | 否   | 搜索的视频的标题              |
// | pageSize  | query | string | 是   | 这一页要几条数据，默认为6      |
export async function someVideos(page, pageSize, queryName) {
    return await request({
        method: 'GET',
        url: '/video/some',
        params: {
            page,
            queryName,
            pageSize
        }
    })
}

// 获取单个视频的数据
// GET /video
// | 名称    | 位置   | 类型    | 必选 | 说明            |
// | ------ | ----- | ------ | ---- | -------------- |
// | id     | query | string | 是   | 视频的id         |
// | userId | query | string | 是   | 当前登录用户id    |
export async function oneVideo(id, userId) {
    return await request({
        method: 'GET',
        url: '/video',
        params: {
            id,
            userId
        }
    })
}

// 获取首页或者搜索页的文章数据
// GET /article/some
// | 名称       | 位置   | 类型    | 必选 | 说明                   |
// | --------- | ----- | ------ | ---- | --------------------- |
// | page      | query | string | 是   | 第几页，默认为1          |
// | pageSize  | query | string | 是   | 每页的数据量，默认为6      |
// | queryName | query | string | 否   | 搜索的文章的标题          |
export async function someArticles(page, pageSize, queryName) {
    return await request({
        method: 'GET',
        url: '/article/some',
        params: {
            page,
            pageSize,
            queryName
        }
    })
}

// 新增一个问题
// POST /question/add
// | 名称           | 位置 | 类型    | 必选 | 说明 |
// | -------------- | ---- | ------- | ---- | ---- |
// | body           | body | object  | 否   | none |
// | » questionerId | body | integer | 是   | none |
// | » title        | body | string  | 是   | none |
// | » content      | body | string  | 否   | none |
// | » imageUrls    | body | string  | 否   | none |
// | » videoUrls    | body | string  | 否   | none |
export async function addQuestion(questionerId, title, content, imageUrls, videoUrls) {
    return await request({
        method: 'POST',
        url: '/question/add',
        data: {
            questionerId,
            title,
            content,
            imageUrls,
            videoUrls
        }
    })
}

// 获取首页或搜索页的多个问题数据
// GET /question/some
// | 名称       | 位置   | 类型    | 必选 | 说明                       |
// | --------- | ----- | ------ | ---- | ------------------------- |
// | page      | query | string | 是   | 第几页，默认为1              |
// | pageSize  | query | string | 是   | 一页需要几条数据，默认为6      |
// | queryName | query | string | 否   | 搜索时的问题名               |
export async function someQuestions(page, pageSize, queryName) {
    return await request({
        method: 'GET',
        url: '/question/some',
        params: {
            page,
            pageSize,
            queryName
        }
    })
}

// 展示一个问题、问题的回答、问题的回答的评论的数据
// GET /question
// | 名称    | 位置   | 类型    | 必选 | 说明            |
// | ------ | ----- | ------ | ---- | -------------- |
// | id     | query | string | 是   | 问题的id         |
// | userId | query | string | 是   | 当前登录用户id    |
export async function oneQuestion(id, userId) {
    return await request({
        method: 'GET',
        url: '/question',
        params: {
            id,
            userId
        }
    })
}
