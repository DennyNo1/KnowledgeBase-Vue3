import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

import Search from "@/views/Search.vue";
import CheckQuestion from "@/views/CheckQuestion.vue";
import CheckQuestionPage from "@/views/CheckQuestionPage.vue";
import CreateQuestion from "@/views/CreateQuestion.vue";
import CreateArticle from "@/views/CreateArticle.vue";
import { useLoginStore } from "@/store/login.js";
import MyArticle from "@/views/MyArticle.vue";
import SearchResult from "@/views/SearchResult.vue";
import Article from "@/views/Article.vue";
import ArticlePage from "@/views/ArticlePage.vue";
import BPChat from "@/views/BPChat.vue";
import CDChat from "@/views/CDChat.vue";
import NewChat from "@/views/NewChat.vue";
import ClickData from "@/views/ClickData.vue";
import ScoreQuery from "@/views/ScoreQuery.vue";
import ScoreList from "@/views/ScoreList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/",
          name: "Search",
          component: Search,
        },
        // {
        //   path: "/video",
        //   component: Video,
        // },

        {
          path: "/clickData",
          name: "ClickData",
          component: ClickData,
          // meta: { keepAlive: true }
        },
        {
          path: "/article",
          name: "Article",
          component: Article,
          // meta: { keepAlive: true }
        },
        {
          path: "/question",
          name: "question",
          component: () => import("@/views/Question.vue"),
        },
        {
          path: "/article-page",
          name: "ArticlePage",
          component: ArticlePage,
        },
        {
          path: "/question-page",
          name: "question-page",
          component: () => import("@/views/QuestionPage.vue"),
        },
        // {
        //   path: "/video-page",
        //   name: "video-page",
        //   component: () => import("@/views/VideoPage.vue"),
        // },
        {
          path: "/question/check",
          component: CheckQuestion,
          meta: { requiresAuth: true },
        },
        {
          path: "/question-page/check",
          component: CheckQuestionPage,
          meta: { requiresAuth: true },
        },
        {
          path: "/question/create",
          component: CreateQuestion,
        },
        {
          path: "/article/create",
          component: CreateArticle,
          meta: { requiresAuth: true },
        },
        {
          path: "myArticle",
          component: MyArticle,
        },
        {
          path: "/search",
          component: SearchResult,
        },
        {
          path: "/CDChat",
          component: CDChat,
        },
        {
          path: "/BPChat",
          component: BPChat,
        },
        {
          path: "/NewChat",
          component: NewChat,
        },
        //启用路由导航守卫，需要在下方这个函数中进行逻辑判断即认证，具体说就是否登录
        {
          path: "/score/query",
          component: ScoreQuery,
          meta: { requiresAuth: true },
        },
        // {
        //   path: "/score/list",
        //   component: ScoreList,
        //   meta: { requiresAuth: true },
        // },

        // {
        //   path: "/login",
        //   name: "login",
        //   component: () => import("@/views/Login.vue"),
        // },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

// 为了防止用户手动输入url，进入某些页面。这是路由导航守卫
router.beforeEach(async (to, from, next) => {
  const loginStore = useLoginStore();
  // 检查目标路由是否需要认证
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // 获取用户登录状态，这里假设你有一个方法可以从pinia或者全局状态中获取

  // 如果需要认证且用户未登录，则重定向到首页
  //因为我把用户登录信息都储存在pinia中，而手动输入url相当于一次刷新页面，会重置pinia，因此这么做可以防止手动输入url或者未登录用户进入受限页面，实际上是前者。就是说哪怕你有权限，是admin，也不允许通过url手动进入。
  if (!loginStore.isLoggedIn && requiresAuth) {
    console.log("重定向");
    next("/");
  } else {
    next(); // 其他情况正常跳转
  }
});

export default router;
