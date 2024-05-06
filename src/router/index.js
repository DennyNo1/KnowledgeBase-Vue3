import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Video from "@/views/Video.vue";
import Search from "@/views/Search.vue";
import CheckQuestion from "@/views/CheckQuestion.vue";
import CheckQuestionPage from "@/views/CheckQuestionPage.vue";
import CreateQuestion from "@/views/CreateQuestion.vue";
import CreateArticle from "@/views/CreateArticle.vue";




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
          path: "/article",
          name: "article",
          component: () => import("@/views/Article.vue"),
        },
        {
          path: "/question",
          name: "question",
          component: () => import("@/views/Question.vue"),
        },
        {
          path: "/article-page",
          name: "article-page",
          component: () => import("@/views/ArticlePage.vue"),
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
          path:"/question/check",
          component:CheckQuestion,
          meta: { requiresAuth: true }
        },
        {
          path: "/question-page/check",
          component:CheckQuestionPage,
          meta: { requiresAuth: true }
        },
        {
          path:"/question/create",
          component:CreateQuestion
        },
        {
          path:"/article/create",
          component:CreateArticle, meta: { requiresAuth: true }
        }


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

import { useLoginStore } from "@/store/login.js";

// 在router/index.js 或 router.ts 文件的末尾添加以下代码
router.beforeEach(async (to, from, next) => {
  const loginStore=useLoginStore()
  // 检查目标路由是否需要认证
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // 获取用户登录状态，这里假设你有一个方法可以从pinia或者全局状态中获取
  

  // 如果需要认证且用户未登录，则重定向到首页
  if (loginStore.isLoggedIn&& requiresAuth  ) {
    console.log("重定向")
    next('/');
  } else {
    next(); // 其他情况正常跳转
  }
});

export default router;
