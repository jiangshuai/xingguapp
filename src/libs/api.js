/**
 * 定义请求node服务端接口地址
 */
export default {
    'Login': {
        'auth': '/APPAuthorize', //登录
        'token': '/APIAuthorize/GetTokenForM8', //登录
        'resetpwd': 'Login/resetpwd', //根据手机号/邮箱重置密码
        'personalsettingPut': 'Login/personalsettingPut' //修改个人配置信息
    },
    'DomainSearch': {
        'search': '/domainsearch'
    },
    'Rocket': {
        'search': '/fumaso/search',
        'getContactInfo': '/fumaso/search',
        'getDownloadRecordList': '/fumaso/record'

    },
    'Account': {
        'getUrl': '/account/getCustUrl',
        'modifyApiUrl': '/account'
    },
    'FastAddCustomer': {
        'getFieldList': '/api/GetMouldFieldList',
        'getDropDownListData': '/api/FastAddCustomer/GetDropDownListData',
        'getFilterLookupDataList': '/api/FastAddCustomer/GetFilterLookupDataList',
        'getLookupEmpDataList': '/api/FastAddCustomer/GetLookupEmpDataList',
        'saveCustomerData': '/api/FastAddCustomer/SaveCustomerData',
        'getM8EmpId': '/M8Info/GetM8EmpId',
        'hasCreateCustomer': '/fumaso/fileFlag',
        'GetCustomer': '/api/CustomerList/GetCustomer',
        'getFieldDefaultValue': '/api/CustomerList/GetCustomerDefaultValue',
        'getCustomerInfo': '/api/CustomerList/GetCustomerInfo',
        'getEmpName': '/api/CustomerList/GetEmpNameByEmpId',
        'getCustomerContact': '/api/CustomerList/GetCustomerContacts',
        'saveContactInfo': '/api/CustomerList/SaveCustomerContacts'
    },
    'AccountManager': {
        'getAccount': '/accountManager/glAccount',
        'postUrl': '/commitPost',
        'getRechargere': '/accountManager/rechargeRecord',
        'getRechargereFilter': '/accountManager/rechargeRecordFilter',
        'getConsume': '/accountManager/consumeRecord',
        'getConsumeRecordFilter': '/accountManager/consumeRecordFilter',
        'alipay': '/accountManager/alipay/call',
        'getcustomerforpay': '/accountManager/consumeSo'

    }
}