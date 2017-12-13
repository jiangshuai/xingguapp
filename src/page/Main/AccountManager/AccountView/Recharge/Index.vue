
<template>
    <div class="Recharge" v-loading="payLoading">
        <div class="Box">
            <dl>
                <dt>充值</dt>
                <dd>账户余额：{{accountAmount}}</dd>
            </dl>
            <el-radio-group v-model="form.radio">
                <el-radio :label="1">在线充值</el-radio>
                <el-radio :label="2">线下汇款</el-radio>
            </el-radio-group>
            <div class="onlinePay" v-if="form.radio=='1'">
                <ul>
                    <li class="alipay" :class="{active : form.payment=='alipay'}" @click="form.payment='alipay'">
                        <span>
                            <i class="iconfont icon-alipay"></i>支付宝
                        </span>
                        <div class="get">
                            <i class="el-icon-circle-check"></i>
                        </div>
                    </li>
                    <!-- <li class="weixin" :class="{active : form.payment=='weixin'}" @click="form.payment='weixin'">
                        <span>
                            <i class="iconfont icon-weixin"></i>微信支付
                        </span>
                        <div class="get">
                            <i class="el-icon-circle-check"></i>
                        </div>
                    </li> -->
                </ul>
                <div class="rechargeSelect">
                    <div class="title">请选择充值金额</div>
                    <dl :class="{active: form.value==item.value}" v-for="(item,index) in valueArr" :key="index" @click="selectValue(item.value,item.give)">
                        <dt>{{item.value}}元</dt>
                        <dd>赠送{{item.give}}元</dd>
                    </dl>
                    <dl :class="{active: otherValueChecked}" @click="selectOtherValue">
                        <span>其他金额</span>
                        <el-input v-model="form.value"  placeholder="请输入金额" size="small" :autofocus="true" @blur="otherBlur" style="width:100px;" @change="checkNo(form.value)" ></el-input>
                    </dl>
                    <div>需支付 ￥{{form.value}}</div>
                </div>
                <el-button type="primary" @click="ok" style="width:100px;">确 认</el-button> 
            </div>
            <div class="offlinePay" v-if="form.radio=='2'">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="开户名称" width="180"> </el-table-column>
                    <el-table-column prop="bank" label="开户银行" width="180"> </el-table-column>
                    <el-table-column label="银行账户">
                        <template scope="scope">
                            <span :id="'account'+scope.row.id">{{scope.row.account}}</span>
                            <el-button size="small" style="margin-left:15px;" @click="copyAccount(scope.row.id)">复制</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="notice">
                    <div class="title">线下汇款处理说明</div>
                    <ol>
                        <li>如果您选择线下汇款，请按照以上账户信息进行汇款</li>
                        <li>线下公司转账方式的到账时间是 1 - 3 个工作日</li>
                        <li>汇款后请在 2 个工作日内将汇款凭证拍照发给我司微信客服： fumasoft</li>
                    </ol>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  name: "Recharge",
  props: [],
  data() {
    return {
      //表单要提交的数据
      form: {
        radio: 1, //支付方式
        payment: "alipay",
        value: 1000,
        giveValue: 50
      },
      otherValueChecked: false,
      valueArr: [
        {
          value: "1000",
          give: "50"
        },
        {
          value: "2000",
          give: "200"
        },
        {
          value: "3000",
          give: "1000"
        }
      ],
      tableData: [
        {
          id: 1,
          name: "上海孚盟软件有限公司",
          bank: "招商银行上海临平支行",
          account: "705557789863"
        },
        {
          id: 2,
          name: "上海孚盟软件有限公司2",
          bank: "招商银行上海临平支行",
          account: "705557789863aaaaa"
        }
      ],
      accountAmount: 0,
      payLoading: false,
      iscanPay: true,
      errormessage:''
    };
  },
  created() {
    this.getAccountInfo();
  },
  mounted() {},
  computed: {},
  methods: {
    //获取账户信息
    getAccountInfo() {
      var companyId = this.$store.state.user.companyId;
      var url = this.Global.baseURL + this.Global.api.AccountManager.getAccount;
      this.$http.get(url, {  }).then(
        function(res) {
          if (res.body != undefined) {
            var data = res.body;
            if (data.status == "S") {
              var entity = data.entity;
              if (entity != null) {
                this.accountAmount = entity.overallbalance;
              } else {
                this.iscanPay = false;
                this.errormessage='账户尚未初始化';
                this.$message.error(this.errormessage);
              }
            } else {
              this.iscanPay = false;
              this.errormessage=data.message;
              this.$message.error( this.errormessage);
            }
          } else {
            console.log("http get fail");
          }
        },
        function(res) {
          //this.$message.error(res.body.msg);
        }
      );
    },

    checkNo(value) {
      var newvalue = /^[1-9]\d*00$/.test(value);
      if (newvalue) {
        this.form.value = value;
        this.form.giveValue = 0;
      } else {
        this.form.value = 0;
      }
    },

    //提交
    ok() {
      if (!this.iscanPay) {
        this.$message.error(this.errormessage);
        return;
      }

      let _this = this;
      if (this.form.value <= 0) {
        this.$alert("请选择或者输入有效的充值金额!", "提醒", {
          confirmButtonText: "确定"
        });
        return;
      }

      this.payLoading = true;
      setTimeout(() => {
        this.payLoading = false;
      }, 3000);

      var postData = [
        {
          chargeVal: this.form.value,
          way: this.form.payment,
          companyId: this.$store.state.user.companyId
        }
      ];

      var url = this.Global.baseURL + this.Global.api.AccountManager.alipay;
      this.$http
        .get(url, {
          params: {
            totalAmountString: "0.01",
            giveAmountString: this.form.giveValue
          }
        })
        .then(
          function(res) {
            if (res.body != undefined) {
              var data = JSON.parse(res.body);
              if (data.status == "S") {
                var payurl = data.resultString;
                window.location.href = payurl;
              } else {
                var errormsg = data.message;
                this.$alert(errormsg, "提醒", {
                  confirmButtonText: "确定"
                });
              }
            } else {
              console.log("http get fail");
            }
          },
          function(res) {
            //this.$message.error(res.body.msg);
          }
        );
    },
    //复制功能
    copyAccount(id) {
      this.selectText("account" + id);
      document.execCommand("Copy"); //执行浏览器复制命令
      this.$message.success("复制成功");
    },
    //其他金额
    selectOtherValue() {
      this.form.value = "";
      this.otherValueChecked = true;
    },
    //选择金额
    selectValue(val, givevalue) {
      this.form.value = val;
      this.form.giveValue = givevalue;
      this.otherValueChecked = false;
    },
    //离开焦点
    otherBlur() {
      // this.otherValueChecked = false;
    },
    //选中效果
    selectText(element) {
      var text = document.getElementById(element);
      if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
      } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        alert("none");
      }
    }
  },
  components: {}
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./zh-cn.less";
</style>