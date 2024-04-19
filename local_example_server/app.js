// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const express = require("express");
const app = express();
const port = 8088;

// 允许解析 JSON 请求体
app.use(express.json());

const middleware = (req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
};

app.use(middleware);

// 取消跨域限制
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 示例数据
const sampleSomeVideoData = {
  code: 200,
  msg: "成功传输video分页数据",
  data: {
    records: [
      {
        video: {
          id: 1,
          type: "营业",
          uploaderId: 1,
          date: "2024-01-17T09:40:09",
          clickCount: "6",
          title:
            "云上之翼 | 中化信息联合天翼云共同打造化工行业云平台，赋能数字化转型升级",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        nickName: "张昊天",
        department: "云中台",
      },
      {
        video: {
          id: 2,
          type: "装维",
          uploaderId: 2,
          date: "2024-01-25T15:18:45",
          clickCount: "1",
          title:
            "云上之翼 | 走进知学云，与新华网一同见证天翼云赋能人才培养数智化转型",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        nickName: "李松泽",
        department: "软研中心",
      },
      {
        video: {
          id: 3,
          type: "客户经理",
          uploaderId: 3,
          date: "2024-01-25T15:25:46",
          clickCount: "2",
          title:
            "“硬核”战风雪，我们一直在行动！中国电信应急保障团队抵抗严寒除冰，修复受损光缆，守护信号",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        nickName: "张睿阳",
        department: "软研中心",
      },
      {
        video: {
          id: 4,
          type: "客经专员",
          uploaderId: 1,
          date: "2024-01-25T15:26:55",
          clickCount: "3",
          title:
            "抢险救灾央企行动 | 湖南多地出现暴雪，中国电信迅速启动应急预案保障通信",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        nickName: "张昊天",
        department: "云中台",
      },
      {
        video: {
          id: 5,
          type: "支局长",
          uploaderId: 2,
          date: "2024-01-25T15:27:43",
          clickCount: "4",
          title:
            "新疆乌什县突发7.1级地震，中国电信连夜出动应急通信保障人员及物资有序恢复当地网络通信",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        nickName: "李松泽",
        department: "软研中心",
      },
      {
        video: {
          id: 6,
          type: "片区长",
          uploaderId: 3,
          date: "2024-01-25T15:28:37",
          clickCount: "5",
          title: "全国首创5G+无人机血液运输智能空港平台，电信5G网络全覆盖航路",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        nickName: "张睿阳",
        department: "软研中心",
      },
      {
        video: {
          id: 7,
          type: "营业",
          uploaderId: 1,
          date: "2024-01-25T15:29:26",
          clickCount: "1",
          title:
            "数智服务暖民心，全员服务在行动！挥洒汗水与热爱，扎根网格坚定守护，是服务者更是守护者",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        nickName: "张昊天",
        department: "云中台",
      },
      {
        video: {
          id: 8,
          type: "装维",
          uploaderId: 2,
          date: "2024-01-25T15:30:38",
          clickCount: "2",
          title:
            "揭秘手机直连卫星背后的故事！中国电信手机直连卫星业务，天地一体，时刻守护",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        nickName: "李松泽",
        department: "软研中心",
      },
      {
        video: {
          id: 9,
          type: "客户经理",
          uploaderId: 3,
          date: "2024-01-25T15:31:31",
          clickCount: "1",
          title: "时光交替，四季流转，大寒不寒，人间安暖",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        nickName: "张睿阳",
        department: "软研中心",
      },
      {
        video: {
          id: 10,
          type: "客经专员",
          uploaderId: 1,
          date: "2024-01-25T15:32:39",
          clickCount: "5",
          title:
            "大寒迎年，寒冬将过，小翼愿您依旧热爱生活，继续兴致盎然的与世界交手",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        nickName: "张昊天",
        department: "云中台",
      },
      {
        video: {
          id: 11,
          type: "支局长",
          uploaderId: 2,
          date: "2024-01-25T15:33:30",
          clickCount: "6",
          title:
            "央视聚集：中国电信联合打造深圳首个“5G+无人机血液运输智能空港平台”",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        nickName: "李松泽",
        department: "软研中心",
      },
      {
        video: {
          id: 12,
          type: "片区长",
          uploaderId: 3,
          date: "2024-01-25T15:34:29",
          clickCount: "3",
          title: "翼周播报 ·第18期 | 浓情腊八节“粥”到服务暖人心",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        nickName: "张睿阳",
        department: "软研中心",
      },
    ],
    total: 13,
    size: 12,
    current: 1,
    orders: [],
    optimizeCountSql: true,
    hitCount: false,
    countId: null,
    maxLimit: null,
    searchCount: true,
    pages: 2,
  },
};

const sampleSomeArticleData = {
  code: 200,
  msg: "成功传输article分页数据",
  data: {
    records: [
      {
        article: {
          id: 1,
          type: "装维",
          uploaderId: 2,
          date: "2024-01-17T09:42:28",
          content:
            "近日，中国电信联合清华大学等相关单位制定的《人工智能-大模型预训练模型-服务能力成熟度评估》标准，顺利通过工业和信息化部认证，成为国家级标准，并在工信部人工智能检验检测基础服务平台发布。标准为评估大模型能力水平提供了全面的检测手段，对行业大模型的发展具有重要意义。\r\n\r\n\r\n\r\n标准提出了大模型预训练服务能力成熟度评估框架，规定了大模型预训练模型服务的能力要求、成熟度等级及评估方法。\r\n\r\n在服务能力方面，预训练成熟度能力域包括平台、开发定制、推理及应用等服务，预训练大模型平台服务关注大模型开发定制的IT环境，模型开发定制服务关注大模型开发状态，模型推理及应用域关注大模型的运行状态。\r\n\r\n在成熟度等级方面，模型服务成熟度等级划分为基础应用级、协同优化级、自定义生产级三类，对预训练模型基础技术、服务复杂度和定制化能力等要求逐步提高。\r\n\r\n在评估方法方面，标准对预训练服务能力进行全面评估，提出各成熟等级应具备的预训练能力和关键性能指标，为大模型预训练服务能力建设提供指导。\r\n\r\n以大模型为代表的新一轮人工智能技术是科技革命和产业变革的重要驱动力。中国电信持续加强核心技术攻关,重点推动基础通用大模型向垂直行业大模型的纵深演进，围绕教育、政务、农业、应急等行业领域，预计将发布精准教学大模型、政务服务大模型、神农一号大模型、应急大模型等共计40个行业大模型。",
          clickCount: 10,
          title:
            "测试标题长度。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。中国电信联合发布国家级人工智能大模型服务能力成熟度评估标准",
          commentCount: 1,
        },
        nickName: "李松泽",
        department: "软研中心",
      },
      {
        article: {
          id: 2,
          type: "营业员",
          uploaderId: 3,
          date: "2024-01-25T16:30:46",
          content:
            "2024年1月23日2时09分，新疆阿克苏地区乌什县（北纬41.26度，东经78.63度）发生7.1级地震。地震发生后，中国电信新疆阿克苏分公司第一时间启动地震应急通信保障预案，携应急保障车奔赴乌什地震指挥部现场指挥。\r\n\r\n\r\n\r\n\r\n\r\n乌什县网络保障人员从凌晨2时20分开始，在全县开展网络机房巡检，对震区网络指标加强监测，确保当地网络畅通。截至早晨6时，累计安排53名应急保障人员、应急通信车7辆、发电机4台、卫星电话10部，恢复退服基站27处，修复电力故障8处，目前乌什通信网络正在有序恢复中。",
          clickCount: 99,
          title:
            "新疆乌什县突发7.1级地震，中国电信连夜出动，确保地震灾害地区通信畅通",
          commentCount: 0,
        },
        nickName: "张睿阳",
        department: "软研中心",
      },
      {
        article: {
          id: 3,
          type: "装维",
          uploaderId: 2,
          date: "2024-01-17T09:42:28",
          content:
            "近日，中国电信联合清华大学等相关单位制定的《人工智能-大模型预训练模型-服务能力成熟度评估》标准，顺利通过工业和信息化部认证，成为国家级标准，并在工信部人工智能检验检测基础服务平台发布。标准为评估大模型能力水平提供了全面的检测手段，对行业大模型的发展具有重要意义。\r\n\r\n\r\n\r\n标准提出了大模型预训练服务能力成熟度评估框架，规定了大模型预训练模型服务的能力要求、成熟度等级及评估方法。\r\n\r\n在服务能力方面，预训练成熟度能力域包括平台、开发定制、推理及应用等服务，预训练大模型平台服务关注大模型开发定制的IT环境，模型开发定制服务关注大模型开发状态，模型推理及应用域关注大模型的运行状态。\r\n\r\n在成熟度等级方面，模型服务成熟度等级划分为基础应用级、协同优化级、自定义生产级三类，对预训练模型基础技术、服务复杂度和定制化能力等要求逐步提高。\r\n\r\n在评估方法方面，标准对预训练服务能力进行全面评估，提出各成熟等级应具备的预训练能力和关键性能指标，为大模型预训练服务能力建设提供指导。\r\n\r\n以大模型为代表的新一轮人工智能技术是科技革命和产业变革的重要驱动力。中国电信持续加强核心技术攻关,重点推动基础通用大模型向垂直行业大模型的纵深演进，围绕教育、政务、农业、应急等行业领域，预计将发布精准教学大模型、政务服务大模型、神农一号大模型、应急大模型等共计40个行业大模型。",
          clickCount: 10,
          title: "中国电信联合发布国家级人工智能大模型服务能力成熟度评估标准",
          commentCount: 1,
        },
        nickName: "李松泽",
        department: "软研中心",
      },
      {
        article: {
          id: 4,
          type: "装维",
          uploaderId: 2,
          date: "2024-01-17T09:42:28",
          content:
            "近日，中国电信联合清华大学等相关单位制定的《人工智能-大模型预训练模型-服务能力成熟度评估》标准，顺利通过工业和信息化部认证，成为国家级标准，并在工信部人工智能检验检测基础服务平台发布。标准为评估大模型能力水平提供了全面的检测手段，对行业大模型的发展具有重要意义。\r\n\r\n\r\n\r\n标准提出了大模型预训练服务能力成熟度评估框架，规定了大模型预训练模型服务的能力要求、成熟度等级及评估方法。\r\n\r\n在服务能力方面，预训练成熟度能力域包括平台、开发定制、推理及应用等服务，预训练大模型平台服务关注大模型开发定制的IT环境，模型开发定制服务关注大模型开发状态，模型推理及应用域关注大模型的运行状态。\r\n\r\n在成熟度等级方面，模型服务成熟度等级划分为基础应用级、协同优化级、自定义生产级三类，对预训练模型基础技术、服务复杂度和定制化能力等要求逐步提高。\r\n\r\n在评估方法方面，标准对预训练服务能力进行全面评估，提出各成熟等级应具备的预训练能力和关键性能指标，为大模型预训练服务能力建设提供指导。\r\n\r\n以大模型为代表的新一轮人工智能技术是科技革命和产业变革的重要驱动力。中国电信持续加强核心技术攻关,重点推动基础通用大模型向垂直行业大模型的纵深演进，围绕教育、政务、农业、应急等行业领域，预计将发布精准教学大模型、政务服务大模型、神农一号大模型、应急大模型等共计40个行业大模型。",
          clickCount: 10,
          title: "中国电信联合发布国家级人工智能大模型服务能力成熟度评估标准",
          commentCount: 1,
        },
        nickName: "李松泽",
        department: "软研中心",
      },
      {
        article: {
          id: 5,
          type: "装维",
          uploaderId: 2,
          date: "2024-01-17T09:42:28",
          content:
            "近日，中国电信联合清华大学等相关单位制定的《人工智能-大模型预训练模型-服务能力成熟度评估》标准，顺利通过工业和信息化部认证，成为国家级标准，并在工信部人工智能检验检测基础服务平台发布。标准为评估大模型能力水平提供了全面的检测手段，对行业大模型的发展具有重要意义。\r\n\r\n\r\n\r\n标准提出了大模型预训练服务能力成熟度评估框架，规定了大模型预训练模型服务的能力要求、成熟度等级及评估方法。\r\n\r\n在服务能力方面，预训练成熟度能力域包括平台、开发定制、推理及应用等服务，预训练大模型平台服务关注大模型开发定制的IT环境，模型开发定制服务关注大模型开发状态，模型推理及应用域关注大模型的运行状态。\r\n\r\n在成熟度等级方面，模型服务成熟度等级划分为基础应用级、协同优化级、自定义生产级三类，对预训练模型基础技术、服务复杂度和定制化能力等要求逐步提高。\r\n\r\n在评估方法方面，标准对预训练服务能力进行全面评估，提出各成熟等级应具备的预训练能力和关键性能指标，为大模型预训练服务能力建设提供指导。\r\n\r\n以大模型为代表的新一轮人工智能技术是科技革命和产业变革的重要驱动力。中国电信持续加强核心技术攻关,重点推动基础通用大模型向垂直行业大模型的纵深演进，围绕教育、政务、农业、应急等行业领域，预计将发布精准教学大模型、政务服务大模型、神农一号大模型、应急大模型等共计40个行业大模型。",
          clickCount: 10,
          title: "中国电信联合发布国家级人工智能大模型服务能力成熟度评估标准",
          commentCount: 1,
        },
        nickName: "李松泽",
        department: "软研中心",
      },
      {
        article: {
          id: 6,
          type: "装维",
          uploaderId: 2,
          date: "2024-01-17T09:42:28",
          content:
            "近日，中国电信联合清华大学等相关单位制定的《人工智能-大模型预训练模型-服务能力成熟度评估》标准，顺利通过工业和信息化部认证，成为国家级标准，并在工信部人工智能检验检测基础服务平台发布。标准为评估大模型能力水平提供了全面的检测手段，对行业大模型的发展具有重要意义。\r\n\r\n\r\n\r\n标准提出了大模型预训练服务能力成熟度评估框架，规定了大模型预训练模型服务的能力要求、成熟度等级及评估方法。\r\n\r\n在服务能力方面，预训练成熟度能力域包括平台、开发定制、推理及应用等服务，预训练大模型平台服务关注大模型开发定制的IT环境，模型开发定制服务关注大模型开发状态，模型推理及应用域关注大模型的运行状态。\r\n\r\n在成熟度等级方面，模型服务成熟度等级划分为基础应用级、协同优化级、自定义生产级三类，对预训练模型基础技术、服务复杂度和定制化能力等要求逐步提高。\r\n\r\n在评估方法方面，标准对预训练服务能力进行全面评估，提出各成熟等级应具备的预训练能力和关键性能指标，为大模型预训练服务能力建设提供指导。\r\n\r\n以大模型为代表的新一轮人工智能技术是科技革命和产业变革的重要驱动力。中国电信持续加强核心技术攻关,重点推动基础通用大模型向垂直行业大模型的纵深演进，围绕教育、政务、农业、应急等行业领域，预计将发布精准教学大模型、政务服务大模型、神农一号大模型、应急大模型等共计40个行业大模型。",
          clickCount: 10,
          title: "中国电信联合发布国家级人工智能大模型服务能力成熟度评估标准",
          commentCount: 1,
        },
        nickName: "李松泽",
        department: "软研中心",
      },
    ],
    total: 2,
    size: 6,
    current: 1,
    orders: [],
    optimizeCountSql: true,
    hitCount: false,
    countId: null,
    maxLimit: null,
    searchCount: true,
    pages: 1,
  },
  map: {},
};

const sampleSomeQuestionData = {
  code: 200,
  msg: "成功传输question分页数据",
  data: {
    records: [
      {
        question: {
          id: 8,
          questionerId: 1,
          date: "2024-01-24T09:55:00",
          title:
            "测试问题11111111111111111111111111111111111111111111111111111111111111111111111111111111",
          content: null,
          imageUrls: null,
          videoUrls: null,
        },
        nickName: "张昊天",
      },
      {
        question: {
          id: 11,
          questionerId: 1,
          date: "2024-01-24T09:55:04",
          title: "测试问题2",
          content: null,
          imageUrls: null,
          videoUrls: null,
        },
        nickName: "张昊天",
      },
      {
        question: {
          id: 21,
          questionerId: 2,
          date: "2024-01-24T09:55:06",
          title: "测试问题3",
          content: null,
          imageUrls: null,
          videoUrls: null,
        },
        nickName: "李松泽",
      },
    ],
    total: 3,
    size: 6,
    current: 1,
    orders: [],
    optimizeCountSql: true,
    hitCount: false,
    countId: null,
    maxLimit: null,
    searchCount: true,
    pages: 1,
  },
  map: {},
};

const sampleOneVideoData = {
  code: 200,
  msg: "成功传输视频和其的评论",
  data: [
    {
      video: {
        id: 1,
        type: "营业",
        uploaderId: 1,
        date: "2024-01-17T09:40:09",
        clickCount: "6",
        title: "中国电信视频",
        url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      nickName: "张昊天",
      department: "云中台",
    },
    [
      {
        comment: {
          id: 1,
          userId: 1,
          date: "2024-01-17T09:45:11",
          content: "这视频真不错",
          belongType: "video",
          belongId: 1,
          likeCount: 1,
        },
        nickName: "张昊天",
        department: "云中台",
        avatar: "http://localhost:8088/avatar/P020230724535949057216 (1).png",
        liked: true,
      },
      {
        comment: {
          id: 4,
          userId: 1,
          date: "2024-01-26T16:37:51",
          content: "这视频真好看",
          belongType: "video",
          belongId: 1,
          likeCount: 0,
        },
        nickName: "张昊天",
        department: "云中台",
        avatar: "http://localhost:8088/avatar/P020230724535949057216 (1).png",
        liked: false,
      },
    ],
  ],
  map: {},
};

const sampleOneArticleData = {
  code: 200,
  msg: "成功传输文章和其的评论",
  data: [
    {
      id: 1,
      type: "装维",
      uploaderId: 2,
      date: "2024-01-17T09:42:28",
      author: "张三",
      department: "智能云",
      sort: "案例",
      tag: [
        { type: "", label: "投诉案例" },
        { type: "success", label: "核心网" },
        { type: "info", label: "投诉分享" },
        { type: "danger", label: "核心网投诉" },
        { type: "warning", label: "案例分享" },
      ],
      content:
        "近日，中国电信联合清华大学等相关单位制定的《人工智能-大模型预训练模型-服务能力成熟度评估》标准，顺利通过工业和信息化部认证，成为国家级标准，并在工信部人工智能检验检测基础服务平台发布。标准为评估大模型能力水平提供了全面的检测手段，对行业大模型的发展具有重要意义。\r\n\r\n\r\n\r\n标准提出了大模型预训练服务能力成熟度评估框架，规定了大模型预训练模型服务的能力要求、成熟度等级及评估方法。\r\n\r\n在服务能力方面，预训练成熟度能力域包括平台、开发定制、推理及应用等服务，预训练大模型平台服务关注大模型开发定制的IT环境，模型开发定制服务关注大模型开发状态，模型推理及应用域关注大模型的运行状态。\r\n\r\n在成熟度等级方面，模型服务成熟度等级划分为基础应用级、协同优化级、自定义生产级三类，对预训练模型基础技术、服务复杂度和定制化能力等要求逐步提高。\r\n\r\n在评估方法方面，标准对预训练服务能力进行全面评估，提出各成熟等级应具备的预训练能力和关键性能指标，为大模型预训练服务能力建设提供指导。\r\n\r\n以大模型为代表的新一轮人工智能技术是科技革命和产业变革的重要驱动力。中国电信持续加强核心技术攻关,重点推动基础通用大模型向垂直行业大模型的纵深演进，围绕教育、政务、农业、应急等行业领域，预计将发布精准教学大模型、政务服务大模型、神农一号大模型、应急大模型等共计40个行业大模型。",
      clickCount: "0",
      title: "中国电信联合发布国家级人工智能大模型服务",
    },
    [
      {
        comment: {
          id: 2,
          userId: 2,
          date: "2024-01-17T09:45:38",
          content: "这文章真不错",
          belongType: "article",
          belongId: 1,
        },
        nickName: "李松泽",
        department: "软研中心",
      },
    ],
  ],
  map: {},
};

const sampleOneQuestionData = {
  code: 200,
  msg: "传输一个问题的数据成功",
  data: {
    date: "2024-01-17T09:45:38",
    title: "问答留言板",
    username: "用户1",
    place: "舟山电信",
    main: [
      "在短期内，这位前总统赢得了第一名之外的额外奖励：由于他的两位主要竞争对手在爱荷华州的亚军争夺战中实力接近，佛罗里达州州长罗恩·德桑蒂斯（Ron DeSantis）和前联合国大使尼基·黑利（Nikki Haley）之间的竞争有望持续到新罕布什尔州及其他州。",
      "德桑提斯计划周二访问南卡罗来纳州，表明他打算坚持到底——该州将在一个多月后举行初选。他在爱荷华州获得第二名的成绩只会强化这一决定，让他的团队和盟友有理由筹集更多资金。但与第一名的差距过于悬殊，让人无法感到安慰或高兴。",
      "去年大部分时间里，黑利在爱荷华州的民意调查结果都是个位数，她没什么钱，也没有现场组织，她错过了将德桑蒂斯淘汰出局的机会。不过，她正在转向对她友好得多的新罕布什尔州，一些民调显示，她在那里与川普的差距不大。",
      "对德桑蒂斯来说，好消息是他的支持者依然热情高涨，坏消息是情况与全美其他地区一样：他只剩下最坚定的选民，他几乎失去了其他人。在爱荷华州，他参加了数百场活动，超级政治行动委员会为支持他花费了数千万美元，但地图上没有一个明显的地方能让他取得胜利。在新罕布什尔州，他远远落后于川普和黑利。",
      "川普有望在内华达州党团会议上一扫颓势，海利没有参加该州的党团会议。南卡罗来纳州长期以来一直是川普的地盘，而黑利是该州的前州长。这意味着，从现在到2月底，德桑蒂斯将必须在残酷的选战中留住他的捐赠者和支持者。比尔·克林顿（Bill Clinton）在1992年新罕布什尔州民主党初选中出人意料地获得第二名后，曾宣称自己是 “卷土重来的孩子”。德桑提斯可以理直气壮地宣称他在周一晚上的结果是个意外——在NBC新闻/德梅因纪事/Mediacom的最终民调中，黑利以20%对16%的优势领先他4个百分点——但这并不是成功的预兆。",
      "除非德桑蒂斯找到一种方法，开始在他落后的州从川普和黑利那里赢得大量选民——“除非他在那里做了大量工作”，则他不会成为 “卷土重来的孩子”。黑利的拜登问题",
      "在爱荷华州、新罕布什尔州和其他许多州，黑利无疑是“绝不川普”选民（受过大学教育的共和党人、无党派人士和跨党派民主党人）的最爱。但她正在竞选一个仍然牢牢受川普控制的政党的提名。",
      "在NBC新闻/德梅因纪事/Mediacom进行的爱荷华州选前民调中，43%的黑利支持者表示，如果乔·拜登（Joe Biden）总统在11月与川普对决，他们会把票投给拜登。只有9%的黑利支持者表示，他们非常热衷于支持她。",
    ],
    text: [
      {
        title: "回复1",
        date: "2024-01-17T09:45:38",
        content: "内容",
        commend: 0,
        isLiked: false,
        openRepl: false,
        openText: false,
        user: {
          name: "用户1",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          tag: "楼主",
        },
        repl: [
          {
            title: "回复1-1",
            content: "内容",
            commend: 0,
            isLiked: false,
            user: {
              name: "用户1",
              avatar:
                "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
            },
          },
          {
            title: "回复1-2",
            content: "内容",
            commend: 0,
            isLiked: false,
            user: {
              name: "用户1",
              avatar:
                "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
            },
          },
        ],
      },
      {
        title: "回复2",
        date: "2024-01-17T09:45:38",
        content: "内容",
        commend: 0,
        isLiked: false,
        openRepl: false,
        openText: false,
        user: {
          name: "用户1",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
      },
      {
        title: "回复3",
        date: "2024-01-17T09:45:38",
        content: "内容",
        commend: 0,
        isLiked: false,
        openRepl: false,
        openText: false,
        user: {
          name: "用户1",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          tag: "楼主",
        },
      },
      {
        title: "回复4",
        date: "2024-01-17T09:45:38",
        content: "内容",
        commend: 0,
        isLiked: false,
        openRepl: false,
        openText: false,
        user: {
          name: "用户1",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          tag: "楼主",
        },
      },
    ],
  },
  map: {},
};

app.get("/video", (req, res) => {
  res.json(sampleOneVideoData);
});

app.get("/article", (req, res) => {
  res.json(sampleOneArticleData);
});

app.get("/question", (req, res) => {
  res.json(sampleOneQuestionData);
});

// 定义路由处理程序
app.get("/video/some", (req, res) => {
  // 获取请求参数
  const page = req.query.page || 1;
  const queryName = req.query.queryName || "";
  const pageSize = req.query.pageSize || 6;

  // TODO: 根据参数筛选数据

  // 返回示例数据
  res.json(sampleSomeVideoData);
});

app.get("/article/some", (req, res) => {
  // 获取请求参数
  const page = req.query.page || 1;
  const queryName = req.query.queryName || "";
  const pageSize = req.query.pageSize || 6;

  // TODO: 根据参数筛选数据

  // 返回示例数据
  res.json(sampleSomeArticleData);
});

app.get("/question/some", (req, res) => {
  // 获取请求参数
  const page = req.query.page || 1;
  const queryName = req.query.queryName || "";
  const pageSize = req.query.pageSize || 6;

  // TODO: 根据参数筛选数据

  // 返回示例数据
  res.json(sampleSomeQuestionData);
});

// 示例用户数据
const userData = {
  id: 1,
  username: "user01",
  password: "Aa12345",
  nickName: "张昊天",
  phone: "110",
  role: "user",
  location: "舟山",
  department: "云中台",
};

// 登录接口
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 模拟简单的用户名和密码验证
  if (username === userData.username && password === userData.password) {
    res.status(200).json({
      code: 200,
      msg: "登录成功",
      data: userData,
      map: {},
    });
  } else {
    res.status(401).json({
      code: 401,
      msg: "用户名或密码错误",
      data: null,
      map: {},
    });
  }
});

// 启动 Express 应用
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.listen(8088, "0.0.0.0"); // 监听在内网地址上
