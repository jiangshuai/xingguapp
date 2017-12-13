<template>
  <div class="FastCustomer">
  <!--  <fastAddCustomer  ref="fastAddCustomer" @closePage="closePage"></fastAddCustomer>
   <el-button  @click="showNewCustomerInputPage()">{{buttonText}}</el-button>
 -->
    <el-dialog title="客户"  :visible.sync="dialogFormVisible" >
            <el-form :model="form">
                <div class="M_unknown_customer" v-if="form.firstShow">
                    <p><span class="C6"><em>"{{form.mailDisaplayName}}"</em>&lt;{{form.mailAddress}}&gt;</span><br>是一个陌生客户，<br>抓住机会。<br>立即“新建客户信息” </p>
                    <div class="newButton">
                        <el-button type="primary" @click="showNewCustomerInputPage()">新增客户信息</el-button>
                     <!--    <el-button type="primary" @click="showNewSupplierInputPage()">新建供应商</el-button> -->
                       <!--  <el-button type="primary">新增现有客户联系人</el-button> -->
                    </div>
                </div>
                <div v-if="form.newCustShow">
                </div>
            </el-form>
            <fastAddCustomer   v-on:getbackData='getbackData' ref="fastAddCustomer" @closePage="closePage"></fastAddCustomer>
           <div slot="footer" class="dialog-footer" v-if="buttonVisible">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveData()">保 存</el-button>
            </div>
        </el-dialog>
  </div>
</template>


<script>
import FastAddCustomer from "@/basecomponents/FinderCustomer/FastAddCustomer";
export default {
  name: "FastCustomer",
  data() {
    return {
      dialogTableVisible: true,
      dialogFormVisible: false,
      labelPosition: "left",
      rocketreach_id:0,
      form: {
        mailDisaplayName: "",
        mailAddress: "",
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
  created() {


  },
  methods: {
    getbackData(value)
    {
        this.$emit("getbackData", this.rocketreach_id); 
    } ,
    hideCreateCustomer(){
      this.$refs.fastAddCustomer.isShow=false;
      this.$refs.fastAddCustomer.rocketreach_id=this.rocketreach_id;
      this.$refs.fastAddCustomer.showCustDialog(this.form.mailAddress, this.form.mailDisaplayName);
    },
    showDialog() {
      this.dialogFormVisible = true;
    },
    showNewCustomerInputPage() {

      this.form.firstShow = false;
      this.buttonVisible = true;
      this.$refs.fastAddCustomer.isShow=true;
      this.$refs.fastAddCustomer.rocketreach_id=this.rocketreach_id;
      this.$refs.fastAddCustomer.showCustDialog(this.form.mailAddress, this.form.mailDisaplayName);
    },
    closePage() {
      this.dialogFormVisible = false;
      if (this.$refs.fastAddCustomer != null) {
        this.$refs.fastAddCustomer.closeCustDialog();
      }
      this.form.newSupplierShow = false;
    },
    saveData() {
      this.$refs.fastAddCustomer.saveData();
      //this.dialogFormVisible = false;
    }
  },
  components: {
    fastAddCustomer: FastAddCustomer
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../less/base.less";
@import "./zh-cn.less";
</style>
