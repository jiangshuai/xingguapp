//所有mutations
//在mutations中只能是同步的操作，打印个日志什么的
//在actions文件中使用commit方法触发调用
import * as types from './mutation-types'

const mutations = {
    [types.SET_PERSONALINFO](state, personalInfo) { //state：当前状态对象。personalInfo：个人信息对象
        if (personalInfo.avatar == "") {
            personalInfo.avatar = "https://cs.updates.xin/v1/image/5,01a572250c77";
        }
        state.personalInfo = personalInfo;
    },
    [types.SET_COMPANYCONFIGINFO](state, companyConfigInfo) { //state：当前状态对象。companyConfigInfo：公司配置信息对象
        if (companyConfigInfo.logoUrl == "") {
            companyConfigInfo.logoUrl = "https://cs.updates.xin/v1/image/4,f8d9218b2d";
        }
        state.companyConfigInfo = companyConfigInfo;
    },
    [types.SET_NAVIGATOR](state, navigator) { //state：当前状态对象。navigator：导航信息
        state.navigator = navigator;
    },
    [types.SET_COMPANY](state, company) { //state：当前状态对象。company：当前选择企业信息
        state.company = company;
    },
    [types.SET_INDIVIDUALCONFIGINFO](state, individualConfigInfo) { //state：当前状态对象。individualConfigInfo：个人配置信息
        state.individualConfigInfo = individualConfigInfo;
    }
}
export default mutations