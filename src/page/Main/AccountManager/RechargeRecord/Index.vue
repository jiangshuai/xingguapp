<template>
    <div class="RechargeRecord">
        <div class="Box">
            <el-form :model="filterForm" :inline="true" label-width="70px">
                <el-form-item label="日期">
                    <el-date-picker v-model="filterForm.datePicker" @change="chageDate()" type="datetimerange" placeholder="选择时间范围" align="left" format="yyyy/MM/dd HH:mm" :picker-options="pickerOptions" style="width:285px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="支付方式">
                    <el-radio-group @change="searchRechargeRecord()" v-model="filterForm.payment">
                        <el-radio-button label="all">全部</el-radio-button>
                        <el-radio-button label="alipay">支付宝</el-radio-button>
                        <el-radio-button label="offlinepay">线下汇款</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <!-- <el-button type="primary" @click="showInvoiceForm()">申请开票</el-button> -->
            </el-form>

            <el-table :data="tableData" height="480" style="width:1200px;"  @selection-change="handleSelectionChange(ischeckAll)"  >
                <el-table-column type="selection"  width="40">
                  <template scope="scope">
                          <el-checkbox  v-if="(scope.row.caninvoice=='N')" disabled></el-checkbox>
                          <el-checkbox @change='selectrecharge(scope.row.num)' v-model="scope.row.ischeck" v-else ></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="num" label="流水号" width="250">
                </el-table-column>
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="title" label="会计科目">
                </el-table-column>
                <el-table-column prop="value" label="金额（元）">
                </el-table-column>
                <el-table-column prop="payment" label="支付方式">
                </el-table-column>
                <el-table-column prop="invoice" label="发票状态">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination   v-if="total>10" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 200, 500]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <el-dialog title="索要发票" :visible.sync="isOpen" custom-class="width520" @close="resetForm('getInvoiceForm')">
            <div style="font-size:12px;">您选取了 1 条单据开具发票 (若选中多条订单，订单金额将合并开具在一张票据中)</div>
            <el-form :model="getInvoiceForm" :rules="getInvoiceFormRules" ref="getInvoiceForm" label-width="100px">
                <el-form-item label="开票金额合计" prop="type">
                    ￥60
                </el-form-item>
                <el-form-item label="发票抬头" prop="type">
                    <el-select v-model="getInvoiceForm.company" placeholder="请选择">
                        <el-option label="北京万科房地产有限公司" value="1"></el-option>
                        <el-option label="上海孚盟软件有限公司" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发票类型" prop="type">
                    增值税专用发票
                </el-form-item>
                <div class="text-center">
                    <el-button type="primary" @click="submit('getInvoiceForm')">确定</el-button>
                    <el-button @click="isOpen=false" style="width:123px;">取消</el-button>
                </div>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
export default {
  name: "RechargeRecord",
  props: [],
  data() {
    return {
      filterForm: {
        datePicker: "",
        payment: "all"
      },
      currentPage: 1, //当前页
      pageSize: 10,
      total: 0,
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      isOpen: false,
      ischeckAll: true,
      getInvoiceForm: {
        company: "2"
      },
      getInvoiceFormRules: {
        company: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.searchRechargeRecord();
  },
  mounted() {},
  computed: {},
  methods: {
    handleSelectionChange(t) {
      if (t) {
        this.tableData.forEach(element => {
          if (element.caninvoice == "Y") {
            element.ischeck = true;
          }
        });

        this.ischeckAll = false;
      } else {
        this.tableData.forEach(element => {
          if (element.caninvoice == "Y") {
            element.ischeck = false;
          }
        });

        this.ischeckAll = true;
      }
    },

    selectrecharge(number)
    {
      console.log(number);
    },
    addDate(date, days) {
      if (days == undefined || days == "") {
        days = 1;
      }
      var date = new Date(date);
      date.setDate(date.getDate() + days);
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return (
        date.getFullYear() +
        "-" +
        this.getFormatDate(month) +
        "-" +
        this.getFormatDate(day)
      );
    },

    // 日期月份/天的显示，如果是1位数，则在前面加上'0'
    getFormatDate(arg) {
      if (arg == undefined || arg == "") {
        return "";
      }

      var re = arg + "";
      if (re.length < 2) {
        re = "0" + re;
      }
      return re;
    },

    getnowDate() {
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month =
        nowDate.getMonth() + 1 < 10
          ? "0" + (nowDate.getMonth() + 1)
          : nowDate.getMonth() + 1;
      var day =
        nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
      var dateStr = year + "-" + month + "-" + day;
      return dateStr;
    },

    showtime(time, format) {
      var t = new Date(time);
      var tf = function(i) {
        return (i < 10 ? "0" : "") + i;
      };
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
          case "yyyy":
            return tf(t.getFullYear());
            break;
          case "MM":
            return tf(t.getMonth() + 1);
            break;
          case "mm":
            return tf(t.getMinutes());
            break;
          case "dd":
            return tf(t.getDate());
            break;
          case "HH":
            return tf(t.getHours());
            break;
          case "ss":
            return tf(t.getSeconds());
            break;
        }
      });
    },

    chageDate() {
      this.searchRechargeRecord();
    },

    //充值记录搜索
    searchRechargeRecord() {
      var payment = this.filterForm.payment;
      var d = this.filterForm.datePicker;
      var startDate = "";
      var endDate = "";

      if (d.length >= 1) {
        startDate = this.showtime(d[0], "yyyy-MM-dd HH:mm:ss");
        endDate = this.showtime(d[1], "yyyy-MM-dd HH:mm:ss");
      } else {
        var date = this.getnowDate();
        var addmonth = this.addDate(date, -30);
        startDate = this.showtime(addmonth, "yyyy-MM-dd");
        endDate = this.showtime(date, "yyyy-MM-dd");
      }

      var url =
        this.Global.baseURL +
        this.Global.api.AccountManager.getRechargereFilter;
      this.$http
        .get(url, {
          params: {
            pageIndex: this.currentPage,
            pageSize: this.pageSize,
            beginTime: startDate,
            endTime: endDate,
            rechargeType: payment
          }
        })
        .then(
          function(res) {
            if (res.body != undefined) {
              var data = JSON.parse(res.body);
              console.log(data);
              if (data.status == "S") {
                var dataList = data.DataList;
                var personInfo = [];
                for (var i = 0; i < dataList.length; i++) {
                  var num = dataList[i].serialnumber;
                  var date = dataList[i].createdate;
                  var title = dataList[i].captionofaccountname;
                  var value = dataList[i].rechargemoney;
                  var payment = dataList[i].rechargetypeName;
                  var invoice = dataList[i].invoicestatusName;
                  var caninvoice = dataList[i].caninvoice;
                  var ischeck = false;
                  if (caninvoice == "Y") {
                    ischeck = false;
                  }

                  var person = {
                    num: num,
                    date: date,
                    title: title,
                    value: value,
                    payment: payment,
                    invoice: invoice,
                    caninvoice: caninvoice,
                    ischeck: ischeck
                  };
                  personInfo.push(person);
                }
                this.tableData = personInfo;
                this.total = data.resultCount;
              } else {
                console.log("e");
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

    //获取充值记录信息
    getRechargeRecord() {
      var url =
        this.Global.baseURL + this.Global.api.AccountManager.getRechargere;
      this.$http
        .get(url, {
          params: {
            pageIndex: this.currentPage,
            pageSize: this.pageSize
          }
        })
        .then(
          function(res) {
            if (res.body != undefined) {
              var data = JSON.parse(res.body);
              console.log(data);
              if (data.status == "S") {
                var dataList = data.DataList;
                var personInfo = [];
                for (var i = 0; i < dataList.length; i++) {
                  var num = dataList[i].serialnumber;
                  var date = dataList[i].createdate;
                  var title = dataList[i].captionofaccountname;
                  var value = dataList[i].rechargemoney;
                  var payment = dataList[i].rechargetype;
                  var invoice = dataList[i].invoicestatus;

                  var person = {
                    num: num,
                    date: date,
                    title: title,
                    value: value,
                    payment: payment,
                    invoice: invoice
                  };
                  personInfo.push(person);
                }
                this.tableData = personInfo;
                this.total = data.resultCount;
              } else {
                console.log("e");
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
    //申请开票
    showInvoiceForm() {
      this.isOpen = true;
    },
    //弹窗表单提交
    submit() {},
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchRechargeRecord();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchRechargeRecord();
    },
    //表格合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = " - ";
        }
      });

      return sums;
    },
    //清空表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: {}
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./zh-cn.less";
</style>