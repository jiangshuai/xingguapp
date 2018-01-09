import Vue from 'vue'
import VueResource from 'vue-resource'
import UAParser from 'ua-parser-js'
import JSON2 from 'JSON2'
import * as Config from '@/libs/config.js'
import {
    getCookie,
    setCookie,
    setStore
} from '@/libs/utils.js'

Vue.use(VueResource);
//获取浏览器及操作系统信息
let UAResult = new UAParser().getResult();
//获取路由对象，accessToken过期跳转登录
let Router = getRouter();
let authvalue = 'abc';


Vue.http.options.headers = {
        'Access-Control-Allow-Headers': 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=UTF-8'
    }
    /**
     * 拦截器
     */
Vue.http.interceptors.push((request, next) => {
    //请求方式
    //   let method = request.method.toLowerCase();
    //   let accessToken = getCookie(Config.accessToken);

    //   if (request.url.indexOf("GetToken") == -1) {
    //     if (accessToken && accessToken != undefined && accessToken != "undefined" && accessToken != '') {
    //       request.headers.set('Authorization', 'Bearer ' + accessToken);
    //     }
    //   }

    // if (accessToken && accessToken != undefined && accessToken != "undefined" && accessToken != '') {
    //   accessToken = JSON2.parse(accessToken);
    //   if (method == 'get') {
    //     Object.assign(request.params, {
    //       "accessToken": accessToken.value
    //     });
    //   } else if (method == 'post') {
    //     Object.assign(request.body, {
    //       "accessToken": accessToken.value
    //     });
    //   }
    // }


    //在响应之后传给then之前对response进行修改和逻辑判断。
    //对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
    next((response) => {

        //登录成功，统一处理
        /*   if (response.url.indexOf("auth") != -1) {
              if (response.body.code.toString() === "0") {
                  //存全部登录信息
                  setStore("auth", response.body.data);
                  //将个人Token写入本地
                  setCookie(Config.individualAccessToken, JSON2.stringify(response.body.data.accessToken), Config.cookieConfig);
              }
          }

          //接口Toke过期
          if (response.data.code.toString() == "-2") {
              try {
                  window.showLockScreen();
              } catch (e) {
                  console.error("window.showLockScreen error!");
              }
          }else{
              return response;
          } */
    });
});