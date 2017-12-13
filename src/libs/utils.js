import Cookies from 'js-cookie';
import Store from 'store';

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    try {
        Store.set(name, content);
    } catch (e) {
        console.log("setStore error!");
    }
}

/**
 * 获取localStorage
 */
export const getStore = (name) => {
    try {
        return Store.get(name);
    } catch (e) {
        console.log("getStore error!");
        return null;
    }
}

/**
 * 删除localStorage
 */
export const removeStore = (name) => {
    try {
        Store.remove(name);
    } catch (e) {
        console.log("removeStore error!");
    }
}

/**
 * 清空localStorage
 */
export const clearStore = () => {
    try {
        Store.clearAll()
    } catch (e) {
        console.log("clearStore error!");
    }
}

/**
 * 获取cookie
 */
export const getCookie = (name) => {
    try {
        return Cookies.get(name);
    } catch (e) {
        console.log("getCookie error!");
        return null;
    }
}

/**
 * 设置cookie
 */
export const setCookie = (name, value, option = {}) => {
    try {
        Cookies.set(name, value, option);
    } catch (e) {
        console.log("setCookie error!");
    }
}

/**
 * 删除cookie
 */
export const removeCookie = (name, option = {}) => {
    try {
        Cookies.remove(name, option);
    } catch (e) {
        console.log("removeCookie error!");
    }
}

/**
 * 清空all cookies
 */
export const clearCookie = function () {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}

/**
 * 退出清空cookies，清空storege
 */
export const clearCookiesStorege = function () {
    clearStore();
    clearCookie();
}

/**
 * 判断是否是合法的url
 */
export const checkUrl = str => {
    var RegUrl = new RegExp();
    RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
    if (!RegUrl.test(str)) {
        return false;
    }
    return true;
}

/**
 * 判断是否是合法的Email
 */
export const checkEmail = str => {
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if (re.test(str)) {
        return true
    } else {
        return false;
    }
}

/**
 * 判断是否合法的手机号码
 */
export const checkPhone = phone => {
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
        return false;
    }
    return true;
}

/**
 * 去掉字符串前后所有空格
 */
export const trim = (str, is_global) => {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
}

/**
 * 判断class是否存在
 */
export const hasClass = function (ele, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
}

/**
 * 添加class
 */
export const addClass = function (ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
    }
}

/**
 * 移除class 
 */
export const removeClass = function (ele, cls) {
    if (hasClass(ele, cls)) {
        var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

/**
 * 判断对象是否有属性
 */
export const isEmptyObject = function (e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

/**
 * js获取文件后缀
 */
export const getSuffix = function (fileName) {
    var fileNameArray = fileName.split(".");
    return fileNameArray[fileNameArray.length - 1];
}

/**
 * 已知flags值 取得标识位修改后的flags(srt为flags,index为第几位,value为改之后标识)例：getNewFlags(3,1,0)
 */
export const getNewFlags = function (str, index, value) {
    var a = "00000000" + str.toString(2);
    a = a.split('');
    a.splice(a.length - index, 1, value);
    return parseInt(a.join(''), 2);
}

/**
 * 二进制取位（如：getByte(2, 1)为数字2的第1位，得到0。位1给手机，位2给邮箱）
 */
export const getByte = function (str, index) {
    var a = "00000000" + str.toString(2);
    return a.substr(a.length - index, 1);
}

/**
 * 输入 用户名/二级域名 检验，首位为字母，长度4位到20位，用户名的话，要加上不能为邮箱
 */
export const checkInitial = function (str) {
    str = trim(str, 'g'); //先去空格
    if (str == "" || str == null || str.length < 4 || str.length > 20) {
        return false;
    }
    str = str.substr(0, 1); //截取首字母
    if (!(/^[A-Za-z]+$/.test(str))) {
        return false;
    }
    return true;
}

/**
 * 输入密码检验，密码长度至少6位，需要含有数字和字母
 */
export const checkPWD = function (str) {
    if (str == "" || str == null || str.length < 6) {
        return false;
    }
    var reg = new RegExp(/^[0-9A-Za-z]+$/);
    if (!reg.test(str)) {
        return false;
    }
    var reg2 = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
    if (!reg2.test(str)) {
        return false;
    }
    return true;
}

/**
 * IP列表，IP加英文逗号，某尾不能有符号
 */
export const checkIpList = function (ips) {
    var reg = new RegExp(/^(?:(?:^|,)(?:[*]|[0-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])(?:\.(?:[*]|[0-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3})+$/);

    if (ips != "" && !reg.test(ips)) {
        return false;
        // 把 ips 按逗号拆成 IP 数组，分别进行验证
        // every 表示每个 ip 验证通过才算通过
        // return ips.split(",")
        // .every(ip => {
        //     // 把每个 IP 拆成几段
        //     const segments = ip.split(".");
        //     // 如果是精确的 4 段而且每段转换成数字都在 1~255 就对了
        //     return segments.length === 4
        //         && segments
        //             .map(segment => parseInt(segment, 10) || 0)
        //             .every(n => n >= 0 && n <= 255);
        // });
    }
    return true;
}



/**
 * 动态加载js文件
 */
export const loadScript = (url, callback) => {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (typeof (callback) != "undefined") {
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function () {
                callback();
            };
        }
    }
    script.src = url;
    document.body.appendChild(script);
}
// loadScript("static/language/zh-cn.js",function(){
//     alert(languagePack.title);
// })