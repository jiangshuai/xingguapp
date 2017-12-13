//异步操作，异步修改
import * as types from './mutation-types'

//获取个人信息
export const setPersonalInfo = function ({ commit, state }, option = {}) {
    let _V = this._vm;
    _V.$http.get(_V.Global.baseURL + _V.Global.api.UniversalInterface.accountQuery, { params: {} }).then(function (res) {
        if (res.body.code.toString() === _V.Global.RES_OK && res.body.data != "") {
            commit(types.SET_PERSONALINFO, res.body.data);
        } else {
            console.warn("setPersonalInfo error!");
        }
    });
}

//设置企业配置信息
export const setCompanyConfigInfo = function ({ commit, state }, option = {}) {
    let _V = this._vm;
    _V.$http.get(_V.Global.baseURL + _V.Global.api.UniversalInterface.companysettingGet, { params: {} }).then(function (res) {
        if (res.body.code.toString() === _V.Global.RES_OK && res.body.data != "") {
            commit(types.SET_COMPANYCONFIGINFO, res.body.data);
        } else {
            console.warn("setCompanyConfigInfo error!");
        }
    });
}

//设置系统导航
export const setNavigator = function ({ commit, state }, option = {}) {
    let { callback } = Object.assign({
        callback: function (data) { }
    }, option)
    let _V = this._vm;
    _V.$http.get(_V.Global.baseURL + _V.Global.api.UniversalInterface.navigator, { params: {} }).then(function (res) {
        if (res.body.code.toString() === _V.Global.RES_OK && res.body.data != "") {
            commit(types.SET_NAVIGATOR, res.body.data);
            callback(res.body.data);
        } else {
            console.warn("setNavigator error!");
            callback("setNavigator error!");
        }
    });
}

//设置个人配置信息
export const setIndividualConfigInfo = function ({ commit, state }, option = {}) {
    let _V = this._vm;
    _V.$http.get(_V.Global.baseURL + _V.Global.api.UniversalInterface.personalsettingGet, { params: {} }).then(function (res) {
        if (res.body.code.toString() === _V.Global.RES_OK && res.body.data != "") {
            commit(types.SET_INDIVIDUALCONFIGINFO, res.body.data);
        } else {
            console.warn("setIndividualConfigInfo error!");
        }
    });
}