import Vue from 'vue'
import ElementUI from 'element-ui'
import './theme/index.css'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import twLocale from 'element-ui/lib/locale/lang/zh-TW'
import locale from 'element-ui/lib/locale/lang/en'

if(LOCALE === 'zh-cn'){
    Vue.use(ElementUI, { zhLocale })
}else if(LOCALE === 'zh-tw'){
    Vue.use(ElementUI, { twLocale })
}else if(LOCALE === 'en'){
    Vue.use(ElementUI, { locale })
}