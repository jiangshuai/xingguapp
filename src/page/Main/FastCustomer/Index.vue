<template>
  <div class="FastCustomer">
    <el-dialog title="客户"  :visible.sync="dialogFormVisible" >
            <el-form :model="form">
                <div class="M_unknown_customer" v-if="form.firstShow">
                    <p><span class="C6"><em>"{{form.mailDisaplayName}}"</em>&lt;{{form.mailAddress}}&gt;</span><br>是一个陌生客户，<br>抓住机会。<br>立即“新建客户信息” </p>
                    <div class="newButton">
                        <el-button type="primary" @click="showNewCustomerInputPage()">新增客户信息</el-button>
                        <el-button type="primary" @click="addExistCustomerContact()">新增现有客户联系人</el-button> 
                    </div>
                </div>
                <div v-if="form.newCustShow">
                </div>
            </el-form>
            <fastAddCustomer   v-on:getbackData='getbackData' ref="fastAddCustomer" @closePage="closePage"></fastAddCustomer>
            <customerinfo      v-on:getbackData='getbackCustomerInfo' ref="customerinfo" @closePage="closePage" ></customerinfo>
               

           <div slot="footer" class="dialog-footer" v-if="buttonVisible">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveData()">保 存</el-button>
           </div>
        </el-dialog>

       <customerList   v-on:getCustomer='getCustomer'      ref="customer" @closePage="closePage"></customerList>
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
      buttonText: "显示"
    };
  },
  created() {},
  methods: {
    noSelectCustomer() {
      this.$refs.customerinfo.isShow = false;
      alert("no select");
    },
    getbackCustomerInfo(value) {
      this.$refs.customerinfo.isShow = true;
    },
    getbackData(value) {
      this.$emit("getbackData", this.rocketreach_id);
    },

    getCustomer(custfid) {
      if (custfid != 0) {
        this.$refs.customerinfo.detailId=custfid;
        this.$refs.customerinfo.isShow = true;
        this.$refs.customer.DialogSelect.isOpen = false;
        this.form.firstShow = false;
        this.buttonVisible = true;
        this.$refs.customerinfo.showCustDialog(this.form.mailAddress,this.form.mailDisaplayName);
      } else {
        this.$refs.customerinfo.isShow = false;
        this.form.firstShow = true;
        this.buttonVisible = false;
        this.$refs.customer.DialogSelect.isOpen = false;
      }
    },
    hideCreateCustomer() {
      this.$refs.fastAddCustomer.isShow = false;
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
      this.form.firstShow = false;
      this.buttonVisible = false;
      this.$refs.customer.DialogSelect.isOpen = true;
    },

    showNewCustomerInputPage() {
      this.form.firstShow = false;
      this.buttonVisible = true;
      this.$refs.fastAddCustomer.isShow = true;
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
        alert("add customer");
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
