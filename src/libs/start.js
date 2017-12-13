//不能通过require返回一个对象使用的库都放在这里引用加载
import './dependent/icon-font/iconfont.css';
import './dependent/fonts/bootstrap.css';
import './dependent/clamp/clamp.min';
import { getStore, setStore, loadScript,clearCookiesStorege } from './utils.js';
import $ from 'jquery';
import JSON2 from 'JSON2';

//全局变量
window.LOCALE = "zh-cn"; //默认语言中文
//判断本地要使用语言
//clearCookiesStorege();
var language = getStore("language");
// console.log("getStorelanguage: "+language);
if (language != null && language != "") { //本地有
    window.LOCALE = language; //使用本地
} else { //本地没有
    window.LOCALE = localLanguage; //使用服务端的语言
    setStore("language", window.LOCALE);
}

//加载字典文件
document.body.className = window.LOCALE;

//加载语言包
loadScript("static/language/" + window.LOCALE + ".js", function () {
    window.i18nSetMessages(languagePack);
})