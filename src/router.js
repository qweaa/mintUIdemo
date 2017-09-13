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
}];
export default routers;