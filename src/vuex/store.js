import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	user:{
        get empId(){
           return localStorage.getItem("empId"); 
        },
        get companyId(){
            return localStorage.getItem("companyId");
        },
        get version(){
            return localStorage.getItem("version");
        },
        get m8empid(){
            return localStorage.getItem("m8empid");
        }
    }
}

const mutations = {
	isLogin (state,user) {   
        state.user = user;
        localStorage.setItem("empId",user.empId);
        localStorage.setItem("companyId",user.companyId);
        localStorage.setItem("version",user.version);
        localStorage.setItem("m8empid",user.m8empid);
	}
}


export default new Vuex.Store({
	state,
	mutations
})