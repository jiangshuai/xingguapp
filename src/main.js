import 'babel-polyfill'
import '@/libs/start.js'

import Vue from 'vue'
import vuePrototype from '@/libs/vuePrototype'
import App from '@/page/App/index'
import router from './router'

import Main from '@/page/Main/Index'
 
//语言
import i18n from '@/plugin/i18n/index'
//异步请求
import '@/plugin/vue-resource/index'
//ui
import '@/plugin/element-ui/index'
/* //埋点指令
import '@/directive/buriedPoint' */
import store from './vuex/store'

vuePrototype(Vue)
Vue.config.productionTip = false

 
 
/* eslint-disable no-new */
new Vue({
    el: '#app',
    i18n,
    router,
    store,
    // store,
    render: h => h(Main)
})

