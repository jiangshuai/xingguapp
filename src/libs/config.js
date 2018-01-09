/**
 * 不同环境接口域名不同
 */
let _domain = '';
let _uploadUrl = '';

if (process.env.NODE_ENV == 'development') {
    //_domain = 'http://localhost:21197'; 
    _domain = 'https://napi.laifuyun.com/'; // '/'; 
    //_uploadUrl = 'https://cs.updates.xin/v1/uploadTest';
} else if (process.env.NODE_ENV == 'production') {
    _domain = 'https://napi.laifuyun.com/';
    //_domain = 'https://dingc25705ca80dcdc3f6678.fumasoft.com';
    //_uploadUrl = 'https://cs.updates.xin/v1/uploadTest';
}

/**
 * 域名环境
 */
export const domain = _domain

/**
 * 接口请求地址
 */
export const baseURL = domain + 'api/v1'

/**
 * 图片展示url前缀
 */
export const imgBaseUrl = 'https://cs.updates.xin/v1/image/'

/**
 * 图片上传接口前缀
 */
export const uploadUrl = _uploadUrl

/**
 * jsonp默认选项
 */
export const jsonpOption = {
    "param": 'jsonpCallback'
}

/**
 * 路由风格
 * hash/history
 */
export const routerMode = 'hash'


/**
 * 接口成功统一返回状态
 */
export const RES_OK = "0"

/**
 * 异步接口失败统一错误提示
 */
export const errorTitle = "服务器异常，请重试"

/**
 * 钉钉扫码登录
 */
export const dingdingLongin = "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoaf8ncfp4yfzeqz898&response_type=code&scope=snsapi_login&state=STATE&redirect_uri="

/**
 * 登录过期时间
 */
export const cookieConfig = { expires: 7, path: '' }

/**
 * Token key
 */
export const accessToken = "accessToken";