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
        },
        {
            path: '/dropdown',
            component: resolve => require(['./routers/dropdown.vue'], resolve)
        },
        {
            path: '/poptip',
            component: resolve => require(['./routers/poptip.vue'], resolve)
        },
        {
            path: '/tooltip',
            component: resolve => require(['./routers/tooltip.vue'], resolve)
        },
        {
            path: '/message',
            component: resolve => require(['./routers/message.vue'], resolve)
        },
        {
            path: '/notice',
            component: resolve => require(['./routers/notice.vue'], resolve)
        },
        {
            path: '/date',

            component: resolve => require(['./routers/date.vue'], resolve)
        },
        {
            path: '/keep-alive-test-1',
            component: resolve => require(['./routers/keep-alive-test-1.vue'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/keep-alive-test-2',

            component: resolve => require(['./routers/keep-alive-test-2.vue'], resolve),
            meta: {
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/keep-alive-test-is',
            component: resolve => require(['./routers/keep-alive-test-is.vue'], resolve)
        },
        {
            path: '/tree',
            component: resolve => require(['./routers/tree.vue'], resolve)
        },
        {
            path: '/table',
            component: resolve => require(['./routers/table.vue'], resolve)
        },
        {
            path: '/table-v2',
            component: resolve => require(['./routers/table-v2.vue'], resolve)
        }
    ]
});

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');
