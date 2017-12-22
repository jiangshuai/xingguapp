import Vue from 'vue'
import Router from 'vue-router'
import {
    routerMode
} from '@/libs/config'
import Cookie from 'js-cookie'
import {
    clearCookiesStorege
} from '@/libs/utils.js'
Vue.use(Router)

import Main from '@/page/Main/Index'

import Home from '@/page/Main/Home/Index'
import Account from '@/page/Main/Account/Index'
import Login from '@/page/Login/Index'

import FindCustomer from '@/page/Main/FumaSo/FindCustomer/Index'
import DownloadRecord from '@/page/Main/FumaSo/DownloadRecord/Index'


import AccountView from '@/page/Main/AccountManager/AccountView/Index'
import Recharge from '@/page/Main/AccountManager/AccountView/Recharge/Index'

import ConsumerDetail from '@/page/Main/AccountManager/ConsumerDetail/Index'
import RechargeRecord from '@/page/Main/AccountManager/RechargeRecord/Index'
import InvoiceManage from '@/page/Main/AccountManager/InvoiceManage/Index'
import InvoiceSet from '@/page/Main/AccountManager/InvoiceSet/Index'




import FastCustomer from '@/page/Main/FastCustomer/Index'
import CustomerList from '@/page/Main/CustomerList/Index'


// import FastAddCustomer from '@/basecomponents/FinderCustomer/FastAddCustomer'



import store from '@/vuex/store'
import Mail from '@/page/Main/Mail/Index'

const router = new Router({
    hashbang: true,
    mode: routerMode,
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            name: 'Home',
            meta: {
                // 添加该字段，表示进入这个路由是需要登录的
                requireAuth: true,
            },
            component: Home,
        },

        {
            path: '/account',
            name: 'Account',
            meta: {
                // 添加该字段，表示进入这个路由是需要登录的
                requireAuth: true,
            },
            component: Account,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/findcustomer',
            name: 'FindCustomer',
            component: FindCustomer,
        },
        {
            path: '/downloadrecord',
            name: 'DownloadRecord',
            component: DownloadRecord,
        },
        { //账号总览
            path: '/accountview',
            name: 'AccountView',
            component: AccountView,
        },
        { //充值
            path: '/accountview/recharge',
            name: 'Recharge',
            component: Recharge,
        },

        { //消费明细
            path: '/consumerDetail',
            name: 'ConsumerDetail',
            component: ConsumerDetail,
        },
        { //充值记录
            path: '/rechargeRecord',
            name: 'RechargeRecord',
            component: RechargeRecord,
        },
        { //发票管理
            path: '/invoiceManage',
            name: 'InvoiceManage',
            component: InvoiceManage,
        },
        { //发票设置
            path: '/invoiceSet',
            name: 'InvoiceSet',
            component: InvoiceSet,
        },

        {
            path: '/main',
            name: 'Main',
            meta: {
                // 添加该字段，表示进入这个路由是需要登录的
                requireAuth: true,
            },
            component: Main,
        },
        {
            path: '/mail',
            name: 'Mail',
            component: Mail
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/findcustomer',
            name: 'FindCustomer',
            component: FindCustomer,
        },
        {
            path: '/downloadrecord',
            name: 'DownloadRecord',
            component: DownloadRecord,
        },
        {
            path: '/fastCustomer',
            name: 'FastCustomer',
            component: FastCustomer
        },
        {
            path: '/customerList',
            name: 'CustomerList',
            component: CustomerList
        },
        {
            path: '/main',
            name: 'Main',
            meta: {
                // 添加该字段，表示进入这个路由是需要登录的
                requireAuth: true,
            },
            component: Main,
        },
        {
            path: '/mail',
            name: 'Mail',
            component: Mail
        }

    ]
})

window.getRouter = function() {
    return router;
}

// 路由拦截
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        // 通过vuex state获取当前的token是否存在
        if (!isEmptyObject(store.state.user)) {
            next();
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
        }
    } else {
        next();
    }
});

function isEmptyObject(obj) {
    if (obj.empId == null || obj.empId == '' ||
        obj.companyId == null || obj.companyId == '') {

        if (obj.empId == null || obj.empId == '' ||
            obj.companyId == null || obj.companyId == '') {

            console.log("emp:" + obj.empId);
            return true;
        }

        return false;
    }
}

export default router