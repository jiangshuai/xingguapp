import * as config from './config'
import api from './api'
import jsonp from './jsonp'

export default function(Vue){
    /**
     * 全局配置
     */
    Vue.prototype.Global = Object.assign(config,{
        'api':api,
        //两个变量由网页内读取
        'TIMEZONE':TIMEZONE,
        'LOCALE':LOCALE,
        'dot':function(data){
            console.log("埋点");
        },
        'jsonp':jsonp
    })
    
}