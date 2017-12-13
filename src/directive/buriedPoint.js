import Vue from 'vue';
import UAParser from 'ua-parser-js';
import $ from 'jquery';
import JSON2 from 'JSON2';
import * as Config from '@/libs/config.js';
import store from '@/store/index';
//获取浏览器及操作系统信息
let UAResult = new UAParser().getResult();


/**
 * 埋点指令
 * <button v-buriedPoint='{"id":"logo","data":"samplepg"}'>xxx</button>
 */
var nodeNames = [];
Vue.directive('buriedPoint', {
    bind: function (el, binding, vnode) { //接收参数，Vue 编译生成的虚拟节点
        let option = JSON2.parse(binding.expression);
        $(el).attr("nodeName", option.id).on("click", function (e) {
            nodeNames.push($(el).attr("nodeName"));
            nodeNames.reverse();
        });
    }
})

/**
 * app挂载顶层指令
 */
Vue.directive('topFloorPoint', {
    bind: function (el, binding, vnode) { //接收参数，Vue 编译生成的虚拟节点
        $(el).on("click",function(){
            var hash = location.hash.substring(2, location.hash.length);
            let nodes = [hash];
            for (var i = 0; i < nodeNames.length; i++) {
                nodes.push(nodeNames[i]);
            }
            nodeNames = [];
            let { personalInfo, company } = store.state;
            let data = {
                //accessToken,
                //createTime,
                device: UAResult.device.model || "pc",
                agent: UAResult.browser.name,
                agentVersion: UAResult.browser.version,
                userName: personalInfo.realName || "",
                cId: company.cId || "",
                aId: company.aId || "",
                //IP,
                sr: window.screen.width + "*" + window.screen.height,
                //host,
                location: window.location.href,
                title: document.title,
                //referrer,
                ownerObject: nodes.join(),
                ownerObjectId: nodes.pop(),
                opertate: "click",
                reply: "", //接口返回，暂时没必要
                replyCode: "", //接口返回，暂时没必要
                timeEclipse: "" //暂时没必要
            }
            //console.log(data);
        });
    }
})