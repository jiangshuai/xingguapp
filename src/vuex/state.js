//所有状态
const imgBaseUrl = "https://cs.updates.xin/v1/image/";

const state = {
    //头像信息
    personalInfo: {
        avatar: imgBaseUrl + "1,011de2224d11",
        userName: ""
    },
    //企业配置信息
    companyConfigInfo: {
        logoUrl: imgBaseUrl + "4,f8d9218b2d"
    },
    //导航列表
    navigator: {},
    //所选公司信息
    company: {},
    //个人配置信息
    individualConfigInfo: {},
    //user
    user:{
        get empId(){
           return localStorage.getItem("empId"); 
        },
        get companyId(){
            return localStorage.getItem("companyId");
        },
        get version(){
            return localStorage.getItem("version");
        }
        
    }
}

export default state