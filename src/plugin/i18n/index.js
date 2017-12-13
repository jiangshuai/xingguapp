import Vue from 'vue'
import VueI18n from 'vue-i18n'
import dateTimeFormats from './dateTimeFormats'


Vue.use(VueI18n)

let locale = window.LOCALE;

//默认配置
let i18nMessages = {
    [locale]: I18n[locale]
}

//实例化语言插件
let i18n = new VueI18n({
    locale: locale,
    messages: i18nMessages,
    dateTimeFormats
})

/**
 * 对整个站点语言数据做异步加载
 */
window.i18nSetMessages = function(data) {
    i18n.setLocaleMessage(locale, Object.assign(I18n[locale], data));
}

export default i18n