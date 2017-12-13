import originJSONP from 'jsonp'
import queryString from 'query-string'
import { jsonpOption } from './config'
/**
 * jsonp封装
 * @param {请求url} url 
 * @param {请求的数据} data 
 * @param {json配置} option 
 */
export default function jsonp(url = '', data = {}, option = {}) {
    return new Promise((resolve, rejevt) => {
        originJSONP(paramTransform(url, data), Object.assign(jsonpOption, option), (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err);
            }
        })
    })
}


/**
 * 参数转换
 * url：http://www.baidu.com
 * data：{ foo: 'bar', baz: ['qux', 'quux'], corge: '', id: '515' }
 * res:/www.baidu.com?baz=qux&baz=quux&corge=&foo=bar&id=515
 */
function paramTransform(url, data) {
    //校验数据
    if (typeof (url) == 'undefined' || url == null || url == '') {
        return '';
    }
    if (typeof (data) == 'undefined' || data == null || typeof (data) != 'object') {
        return '';
    }
    //判断url是否有问号
    url += (url.indexOf("?") != -1) ? "" : "?";
    let dataStr = queryString.stringify(data);
    url += dataStr;
    return url;
}

//console.log(paramTransform('www.baidu.com',{ foo: 'bar', baz: ['qux', 'quux'], corge: '', id: '515' }))
//www.baidu.com?baz=qux&baz=quux&corge=&foo=bar&id=515