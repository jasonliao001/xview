/**
 * Created by aresn on 16/6/20.
 */
import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import iView from '../src/index';
import locale from '../src/locale/lang/zh-CN';

Vue.use(VueRouter);
Vue.use(iView, {
    locale
});

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
    esModule: false,
    mode: 'history',
    routes: [
        {
            path: '/affix',
            component: resolve => require(['./routers/affix.vue'], resolve)
        },
        {
            path: '/layout',
            component: resolve => require(['./routers/layout.vue'], resolve)
        },
        {
            path: '/menu',
            component: resolve => require(['./routers/menu.vue'], resolve)
        },
        {
            path: '/button',
            component: resolve => require(['./routers/button.vue'], resolve)
        },
        {
            path: '/select',
            component: resolve => require(['./routers/select.vue'], resolve)
        },
        {
            path: '/input',
            component: resolve => require(['./routers/input.vue'], resolve)
        },
        {
            path: '/radio',
            component: resolve => require(['./routers/radio.vue'], resolve)
        },
        {
            path: '/checkbox',
            component: resolve => require(['./routers/checkbox.vue'], resolve)
        },
        {
            path: '/cell',
            component: resolve => require(['./routers/cell.vue'], resolve)
        },
        {
            path: '/inputNumber',
            component: resolve => require(['./routers/input-number.vue'], resolve)
        },
        {
            path: '/collapse',
            component: resolve => require(['./routers/collapse.vue'], resolve)
        },
        {
            path: '/tabs',
            component: resolve => require(['./routers/tabs.vue'], resolve)
        },
        {
            path: '/loading-bar',
            component: resolve => require(['./routers/loading-bar.vue'], resolve)
        },
        {
            path: '/modal',
            component: resolve => require(['./routers/modal.vue'], resolve)
        }
    ]
});

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');
