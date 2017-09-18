const routers = [{
    path: '/',
    meta: {
        title: '专栏'
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
},{
    path: '/answer',
    meta: {
        title: '答案'
    },
    component: (resolve) => require(['./views/answer.vue'], resolve)
},{
    path: '/question',
    meta: {
        title: '问题'
    },
    component: (resolve) => require(['./views/question.vue'], resolve)
},{
    path: '/comments',
    meta: {
        title: '话题'
    },
    component: (resolve) => require(['./views/comments.vue'], resolve)
},{
    path: '/zhuanlanList',
    meta: {
        title: '专栏列表'
    },
    component: (resolve) => require(['./views/zhuanlan/list.vue'], resolve)
},{
    path: '/article',
    meta: {
        title: '文章'
    },
    component: (resolve) => require(['./views/zhuanlan/article.vue'], resolve)
}];
export default routers;