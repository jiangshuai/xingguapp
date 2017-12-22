<template>
  <div class="FastCustomer">
    <el-dialog title="客户"  :visible.sync="dialogFormVisible"  custom-class="width820" >
            <el-form :model="form">
                <div class="M_unknown_customer" v-if="form.firstShow">
                      <p v-if="!canAddNewCustomer">
                        <span class="C6">
                          <em>"{{form.mailDisaplayName}}"</em>&lt;{{form.mailAddress}}&gt;
                        </span><br>是一个陌生客户，<br>抓住机会。<br>立即“新建客户信息”或者 “新增现有客户联系人”
                      </p>

                      <p v-else> 

                        邮箱地址
                        <span class="C6">
                         <em>"{{form.mailAddress}}"</em>&nbsp;
                        </span> <br>属于 <span class="C6">{{customerbreifname}}</span><br>立即“新增现有客户联系人” 
                      </p>

                    <div class="newButton">
                        <el-button type="primary" :disabled="canAddNewCustomer" @click="showNewCustomerInputPage()">新增客户信息</el-button>
                        <el-button type="primary" @click="addExistCustomerContact()">新增现有客户联系人</el-button> 
                    </div>
                </div>
                <div v-if="form.newCustShow">
                </div>
            </el-form>
            <fastAddCustomer   v-on:getbackData='getbackData' ref="fastAddCustomer" @closePage="closePage"></fastAddCustomer>
            <customerinfo      v-on:getbackData='getbackCustomerInfo'     ref="customerinfo" @closePage="closePage" ></customerinfo>
               

           <div slot="footer" class="dialog-footer" v-if="buttonVisible">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveData()">保 存</el-button>
           </div>
        </el-dialog>

       <customerList   v-on:getCustomer='getCustomer'  v-on:noSelectCustomer='noSelectCustomer'     ref="customer" @closePage="closePage"></customerList>
  </div>
</template>

<script>
import FastAddCustomer from "@/basecomponents/FinderCustomer/FastAddCustomer";
import CustomerList from "@/page/Main/CustomerList/Index";
import CustomerInfo from "@/page/Main/CustomerList/CustomerInfo";

export default {
  name: "FastCustomer",
  data() {
    return {
      dialogTableVisible: true,
      dialogFormVisible: true,
      labelPosition: "left",
      rocketreach_id: 0,
      form: {
        mailDisaplayName: "jack",
        mailAddress: "jack.song@126.com",
        firstShow: true,
        newCustShow: false,
        newSupplierShow: false,
        phone: ""
      },
      formLabelWidth: "120px",
      buttonVisible: false,
      buttonText: "显示",
      empId: "003039",
      hasSelect: false,
      contactInfo: [],
      customerbreifname: "",
      customerid: "",
      canAddNewCustomer: false
    };
  },
  created() {
    if (this.$route.query.empId != null && this.$route.query.empId != "") {
      this.empId = this.$route.query.empId;
    }
    if (
      this.$route.query.mailAddress != null &&
      this.$route.query.mailAddress != ""
    ) {
      this.form.mailAddress = this.$route.query.mailAddress;
    }

    if (
      this.$route.query.displanyName != null &&
      this.$route.query.displanyName != ""
    ) {
      this.form.mailDisaplayName = this.$route.query.displanyName;
    }

    this.getCustomerInfoByEmail(this.form.mailAddress);
  },
  methods: {
    getCustomerInfoByEmail(mailaddress) {
      let _this = this;
      this.$http
        .get(
          _this.Global.baseURL +
            _this.Global.api.FastAddCustomer.getCustomerInfoByEmail,
          {
            params: {
              mailAddress: mailaddress
            }
          }
        )
        .then(
          function(res) {
            if (res.body != "") {
              var returndata = JSON.parse(res.body);
              if (returndata.status != "E" && returndata.status != null) {
                _this.contactInfo = JSON.parse(returndata.resultString);
                if (_this.contactInfo.length > 0) {
                  _this.canAddNewCustomer = true;
                  _this.customerbreifname = _this.contactInfo[0].BriefName;
                  _this.customerid = _this.contactInfo[0].FID;
                }
              } else {
                _this.$message({
                  message: returndata.message,
                  type: "warning"
                });
                return;
              }
            } else {
              this.$message({
                message: "error！",
                type: "warning"
              });
              return;
            }
          },
          function(res) {
            //this.$message.error(res.body.msg);
          }
        );
    },
    noSelectCustomer(custfid) {
      if (custfid != 0 && this.hasSelect) {
        this.$refs.customerinfo.detailId = custfid;
        this.$refs.customerinfo.isShow = true;
        this.$refs.customer.DialogSelect.isOpen = false;
        this.form.firstShow = false;
        this.buttonVisible = true;

        this.$refs.customer.empId = this.empId;
        this.$refs.customerinfo.empId = this.empId;
        this.$refs.customerinfo.showCustDialog(
          this.form.mailAddress,
          this.form.mailDisaplayName
        );
      } else {
        this.$refs.customerinfo.isShow = false;
        this.form.firstShow = true;
        this.buttonVisible = false;
        this.$refs.customer.empId = this.empId;
        this.$refs.customerinfo.empId = this.empId;
        this.$refs.customer.DialogSelect.isOpen = false;
      }
    },
    getbackCustomerInfo(value) {
      this.$refs.customerinfo.isShow = true;
    },
    getbackData(value) {
      this.$emit("getbackData", this.rocketreach_id);
    },

    getCustomer(custfid) {
      if (custfid != 0) {
        this.hasSelect = true;
      }
    },
    hideCreateCustomer() {
      this.$refs.fastAddCustomer.isShow = false;
      this.$refs.fastAddCustomer.empId = this.empId;
      this.$refs.fastAddCustomer.rocketreach_id = this.rocketreach_id;
      this.$refs.fastAddCustomer.showCustDialog(
        this.form.mailAddress,
        this.form.mailDisaplayName
      );
    },
    showDialog() {
      this.dialogFormVisible = true;
    },

    addExistCustomerContact() {
      if (this.contactInfo.length == 0) {
        this.form.firstShow = false;
        this.buttonVisible = false;
        this.$refs.customer.empId = this.empId;
        this.$refs.customer.DialogSelect.isOpen = true;
        this.$refs.customer.CustomerLoading = true;
        this.$refs.customer.tableData = [];
        this.$refs.customer.radio = false;
        this.$refs.customer.searchRechargeRecord();
      } else {
        this.$refs.customerinfo.detailId = this.customerid;
        this.$refs.customerinfo.isShow = true;
        this.$refs.customer.DialogSelect.isOpen = false;
        this.form.firstShow = false;
        this.buttonVisible = true;

        this.$refs.customer.empId = this.empId;
        this.$refs.customerinfo.empId = this.empId;
        this.$refs.customerinfo.showCustDialog("", this.form.mailDisaplayName);
      }
    },

    showNewCustomerInputPage() {
      this.form.firstShow = false;
      this.buttonVisible = true;
      this.$refs.fastAddCustomer.isShow = true;
      this.$refs.fastAddCustomer.empId = this.empId;
      this.$refs.fastAddCustomer.rocketreach_id = this.rocketreach_id;
      this.$refs.fastAddCustomer.showCustDialog(
        this.form.mailAddress,
        this.form.mailDisaplayName
      );
    },
    closePage() {
      this.dialogFormVisible = false;
      if (this.$refs.fastAddCustomer != null) {
        this.$refs.fastAddCustomer.closeCustDialog();
      }
      this.form.newSupplierShow = false;
    },
    saveData() {
      if (this.$refs.fastAddCustomer.isShow) {
        this.$refs.fastAddCustomer.saveData();
      } else {
        this.$refs.customerinfo.saveData();
      }
    }
  },
  components: {
    fastAddCustomer: FastAddCustomer,
    customerList: CustomerList,
    customerinfo: CustomerInfo
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../less/base.less";
@import "./zh-cn.less";
</style>
