import Vue from 'vue';
// import iView from 'iview';
import MintUI from 'mint-ui'
import VueRouter from 'vue-router';
import Routers from './router';

import Util from './libs/util';
import App from './app.vue';
import Header from './views/components/header';
import Footer from './views/components/footer';
import Font from './css/font-awesome.min.css';
// import 'iview/dist/styles/iview.css';
import 'mint-ui/lib/style.css'
import './css/common.css'


Vue.use(VueRouter);


Vue.use(MintUI);



// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    // MintUI.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    // MintUI.LoadingBar.finish();
    window.scrollTo(0, 0);
});



new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});

new Vue({
    el: '#header',
    router: router,
    render: h => h(Header)
});
new Vue({
    el: '#footer',
    router: router,
    render: h => h(Footer)
});