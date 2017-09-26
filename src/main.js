import Vue from 'vue';
import MintUI from 'mint-ui'
import VueRouter from 'vue-router';
import Vuex from 'Vuex';

import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import Font from './css/font-awesome.min.css';
import 'mint-ui/lib/style.css'
import './css/common.css'

import Header from './views/components/header';
import Footer from './views/components/footer';

// import iView from 'iview';
// import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(MintUI);

//初始化Vuex
const store = new Vuex.Store({
    state: {
        zhuanlanData: [],
        isIndex : true,
    },
    mutations: {
        setZhuanlanData : function(state,data) {
            if(data.code == "addTop"){
                state.zhuanlanData = [...data.data, ...state.zhuanlanData];
            }else if(data.code == "addBottom"){
                state.zhuanlanData = [...state.zhuanlanData, ...data.data]
            }else{
                console.log("code参数应该为<string> set, addTop, addBttom")
            }
        },
        setIsIndex : function(state,code){
            state.isIndex = code;
        }
    }
})

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    // MintUI.LoadingBar.start();
    Util.title(to.meta.title);
    console.log(to.path)
    if(to.path != "/" && to.path != "/answer" && to.path != "/question" && to.path != "/comments"){
        store.state.isIndex = false;
    }else{
        store.state.isIndex = true;
    }
    next();
});

router.afterEach(() => {
    // MintUI.LoadingBar.finish();
    window.scrollTo(0, 0);
});



new Vue({
    el: '#app',
    router: router,
    store,
    render: h => h(App)
});

// new Vue({
//     el: '#header',
//     router: router,
//     render: h => h(Header)
// });
new Vue({
    el: '#footer',
    router: router,
    store,
    render: h => h(Footer)
});