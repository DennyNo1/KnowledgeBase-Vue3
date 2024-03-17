import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Video from "@/views/Video.vue";
import Search from "@/views/Search.vue";



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
        {
          path: "/video",
          component: Video,
        },
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
        {
          path: "/video-page",
          name: "video-page",
          component: () => import("@/views/VideoPage.vue"),
        },


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

export default router;
