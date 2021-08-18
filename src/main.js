import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueCarousel from 'vue-carousel';
import VueMeta from 'vue-meta';
import {BCollapse, BDropdown, BModal, BootstrapVue} from 'bootstrap-vue';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.input';
// thirdly, register components to Vue
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import Main from "@/components/Main/Main";
import Stores from "@/components/Main/Stores";
import Rules from "@/components/Main/Rules";
import Tariffs from "@/components/Main/Tariffs";
import Contact from "@/components/Main/Contact";
import UserProfile from "@/components/User/UserProfile";
import Balances from "@/components/User/Balances";
import Orders from "@/components/User/Orders";
import Addresses from "@/components/User/Addresses";
import BalanceServices from "@/components/User/BalanceServices";
import Packages from "@/components/User/Packages";
import Settings from "@/components/User/Settings";
import CreateOrder from "@/components/User/CreateOrder";


Vue.config.productionTip = false

const routes = [
    {
        path: '',
        component: Main
    },
    {
        path: '/stores',
        component: Stores
    },
    {
        path: '/profile',
        component: UserProfile,
        children: [
            {
                path: 'addresses',
                component: Addresses
            },
            {
                path: 'balance',
                component: Balances
            },
            {
                path: 'balance-service',
                component: BalanceServices
            },
            {
                path: 'orders',
                component: Orders
            },
            {
                path: 'create-order',
                component: CreateOrder
            },
            {
                path: 'packages',
                component: Packages
            },
            {
                path: 'settings',
                component: Settings
            }
        ]
    },
    {
        path: '/news',
        component: Stores
    },
    {
        path: '/rules',
        component: Rules
    },
    {
        path: '/contact',
        component: Contact
    },
    {
        path: '/tariffs',
        component: Tariffs
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('access_token');
    if (to.path === '/login' && accessToken) next({path: 'profile'})
    else next()
});

router.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('access_token');
    if ((to.path === '/profile' || to.path === '/profile/addresses' || to.path === '/profile/orders' || to.path === '/profile/balances' || to.path === '/profile/settings') && !accessToken) next({path: 'login'})
    else next()
});

router.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('access_token');
    if ((to.path === '/profile' && accessToken)) next({path: 'profile/addresses'})
    else next()
});

router.beforeEach((to, from, next) => {
    if ((to.path.includes('profile/profile'))) next({path: 'profile/addresses'})
    else next()
});

Vue.use(VueMeta)
Vue.use(VueCarousel);
Vue.use(VueRouter);
// Install BootstrapVue
Vue.use(BootstrapVue);

Vue.component('b-collapse', BCollapse);
Vue.component('b-dropdown', BDropdown);
Vue.component('b-modal', BModal);
// Vue.component('b-form', BForm);


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
