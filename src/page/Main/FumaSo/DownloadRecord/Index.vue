<template>
    <div class="FindCustomer">
        <div class="searchList">
            <div class="wrap">
                <el-form :model="filterForm" :inline="true" label-width="70px">
                    <el-form-item label="关键字">
                        <el-input v-model="filterForm.keywords" placeholder="请输入关键字" style="width:160px;"></el-input>
                    </el-form-item>
                    <el-form-item label="操作时间">
                        <el-date-picker v-model="filterForm.datePicker" type="datetimerange" placeholder="选择时间范围" align="center" format="yyyy/MM/dd HH:mm" :picker-options="pickerOptions" style="width:285px">
                        </el-date-picker>
                    </el-form-item>
                    <!-- <el-form-item label="操作人">
                        <el-select v-model="filterForm.people" placeholder="请选择操作人" style="width:130px">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-button type="primary" @click="queryRecord()">查询</el-button>
                    <!-- <el-button>导出Excel</el-button>
                    <el-button>邮件营销</el-button> -->
                </el-form>
                <div class="" ref="listAuto">
                    <table v-loading="mainPageLoading">
                        <thead>
                            <tr>
                                <th width="60">
                                    <el-checkbox v-model="checked"  @change="handleCheckAllChange" style="margin-left:8px;"></el-checkbox>
                                </th>
                                <th width="120">基本信息</th>
                                <th width="300"></th>
                                <th width="300">联系信息</th>
                                <th width="210">操作时间</th>
                                <th>操作人</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(record,recordIndex) in recordList" :key="recordIndex">
                                <td>
                                    <el-checkbox v-model="record.isChecked" style="margin-left:8px;"></el-checkbox>
                                </td>
                                <td>
                                    <div class="avatar"><img src="https://cs.updates.xin/v1/image/3,02e1899eb0d8/180,180"></div>
                                </td>
                                 <td width="330" style="padding-right:50px;">
                                    <div class="title">{{record.name}}</div>
                                    <div class="descript">
                                        {{record.current_title}} at {{record.current_employer}} - {{record.location}}
                                        <!--  <span class="flag"><img src="/static/flags/China.png"></span> -->
                                    </div>
                                    <div class="socialIcon">
                                        <template v-for="(linkItem,key,linkIndex) in record.links_dic">
                                                <span v-if="key == 'linkedin'" :key="linkIndex">
                                                    <a :href="linkItem"  target="blank">
                                                        <i class="iconfont icon-linkedin"></i>
                                                    </a>
                                                </span>
                                                <span v-if="key == 'twitter'" :key="linkIndex">
                                                    <a :href="linkItem"  target="blank">
                                                                                <i class="iconfont icon-twitter"></i>
                                                    </a>
                                                                            </span>
                                                <span v-if="key == 'facebook'" :key="linkIndex">
                                                    <a :href="linkItem"  target="blank">
                                                                                <i class="iconfont icon-facebook"></i>
                                                    </a>
                                                                            </span>
                                                <span v-if="key == 'quora'" :key="linkIndex">
                                                    <a :href="linkItem"  target="blank">
                                                                                <i class="iconfont icon-quora"></i>
                                                    </a>
                                                                            </span>
                                                <span v-if="key == 'qq'" :key="linkIndex">
                                                    <a :href="linkItem"  target="blank">
                                                                                <i class="iconfont icon-QQ"></i>
                                                    </a>
                                                                            </span>
                                                <span v-if="key == 'github'" :key="linkIndex">
                                                    <a :href="linkItem"  target="blank">
                                                                                <i class="iconfont icon-github"></i>
                                                    </a>
                                                                            </span>
                                                <span v-if="key == 'wechat'" :key="linkIndex">
                                                    <a :href="linkItem"  target="blank">
                                                                                <i class="iconfont icon-weixin"></i>
                                                    </a>
                                                                            </span>
                                     </template>
                                </div>
                            </td>
                            <td>
                                   <ul class="alreadyMail">
                                        <li v-for="(emailItem,mailIndex) in record.emails_list" :key="mailIndex">
                                            <i class="iconfont icon-mail"></i><span style="font-size:12px;"> {{emailItem.email}}</span>
                                        </li>
                                   </ul> 
                                <div class="btns">
                                    <el-button class="toCrm" @click="showAddCustomer(record.name,record.emails_list,record.rocketreach_id,record.is_file)"  v-if="!(record.is_file == 'Y')" style="width:100px;font-size:12px;">建档到CRM</el-button>
                                    <el-button class="already" v-if="record.is_file == 'Y'" style="width:120px;">已建档</el-button>
                                </div>
                            </td>
                            <td>{{record.create_date}}</td>
                            <td>{{record.username}}</td>
                        </tr>
                       
                    </tbody>
                    </table>
                </div>
                <div class="pagination">
                   <el-pagination  v-if="recordList.length==pageInfo.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPageIndex" :page-sizes="[pageInfo.pageSize, 50, 200, 500]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
                        :total="pageInfo.total">
                    </el-pagination>
                </div>
            </div>
        </div>
            <fast-customer v-on:getbackData='getbackData' ref="FastCustomer"></fast-customer>
    </div>
</template>


<script>
import FastCustomer from "@/page/Main/FastCustomer/Index";
export default {
  name: "FindCustomer",
  props: [],
  data() {
    return {
      mainPageLoading: false,
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
      checked: false,
      currentPage: 1,
      searchBox: "",
      filterForm: {
        keywords: "",
        datePicker: "",
        people: ""
      },
      recordListCount: 0,
      recordList: [],
      pageInfo: {
        total: 0,
        pageSize: 10,
        currentPageIndex: 1
      }
    };
  },
  created() {
    this.queryRecord();
  },
  mounted() {
    //let _this = this;
    // setTimeout(() => {
    //   _this.setWindowHeight();
    // }, 200);
    // window.onresize = function temp() {
    //   _this.setWindowHeight();
    // };
  },
  computed: {},
  methods: {
    getbackData(value) {
      this.recordList.forEach(element => {
        if (element.rocketreach_id == value) {
          element.is_file = "Y";
        }
      });
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
    showAddCustomer(name, email, rocketreach_id, is_file) {
      if (is_file == "Y") {
        return;
      }
      let _this = this;
      this.$http
        .get(this.Global.baseURL + this.Global.api.Account.getUrl, {
          params: {
            cid: this.$store.state.user.companyId
          }
        })
        .then(
          function(res) {
            if (res.body != null && res.body != "") {
              var returndata = JSON.parse(res.body);
              if (returndata.status == "S" && returndata.status != null) {
                this.$refs.FastCustomer.form.mailDisaplayName = name;
                if (email == null) {
                  this.$refs.FastCustomer.form.mailAddress = "";
                } else {
                  this.$refs.FastCustomer.form.mailAddress = email[0].email;
                }

                if (this.$refs.FastCustomer.form.firstShow) {
                  this.$refs.FastCustomer.form.firstShow = true;
                  this.$refs.FastCustomer.buttonVisible = false;
                  this.$refs.FastCustomer.dialogFormVisible = true;
                  this.$refs.FastCustomer.rocketreach_id = rocketreach_id;
                } else {
                  this.$refs.FastCustomer.form.firstShow = true;
                  this.$refs.FastCustomer.buttonVisible = false;
                  this.$refs.FastCustomer.dialogFormVisible = true;
                  this.$refs.FastCustomer.rocketreach_id = rocketreach_id;
                  this.$refs.FastCustomer.hideCreateCustomer();
                }
              } else {
                this.$message({
                  message: returndata.message,
                  type: "warning"
                });
                return;
              }
            } else {
              this.$message({
                message: "无法获取 Fumasoft API URL！",
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
    handleCheckAllChange(event) {
      this.recordList.forEach(element => {
        element.isChecked = event.target.checked;
      });
    },
    queryRecord() {
      let _this = this;
      var d = _this.filterForm.datePicker;
      var startDate = "";
      var endDate = "";
      if (d.length >= 1) {
        if (d[0] != null) {
          startDate = _this.showtime(d[0], "yyyy-MM-dd HH:mm:ss");
        } else {
          var date = _this.getnowDate();
          var addmonth = _this.addDate(date, -30);
          startDate = _this.showtime(addmonth, "yyyy-MM-dd");
        }
        if (d[1] != null) {
          endDate = _this.showtime(d[1], "yyyy-MM-dd HH:mm:ss");
        } else {
          var date = _this.getnowDate();
          var addmonth = _this.addDate(date, -30);
          startDate = _this.showtime(addmonth, "yyyy-MM-dd");
          endDate = _this.showtime(date, "yyyy-MM-dd");
        }
      } else {
        var date = _this.getnowDate();
        var addmonth = _this.addDate(date, -30);
        startDate = _this.showtime(addmonth, "yyyy-MM-dd");
        endDate = _this.showtime(date, "yyyy-MM-dd");
      }

      if (this.checkPersonInfo) {
        this.pageSearchLoading = true;
        let data = {
          keywords: _this.filterForm.keywords,
          pageIndex: this.pageInfo.currentPageIndex,
          pageSize: this.pageInfo.pageSize,
          beginDate: startDate,
          endDate: endDate
        };
        this.mainPageLoading = true;
        //this.initPageData();
        this.$http
          .get(
            this.Global.baseURL + this.Global.api.Rocket.getDownloadRecordList,
            {
              params: data
            }
          )
          .then(
            function(res) {
              if (
                res.body &&
                res.body.status != undefined &&
                res.body.status == "S"
              ) {
                var resultMessage = res.body;
                //console.log(resultMessage);
                if (
                  resultMessage != null &&
                  resultMessage.status != null &&
                  resultMessage.status == "S" &&
                  resultMessage.DataList != null
                ) {
                  resultMessage.DataList.forEach(element => {
                    element.isChecked = false;
                  });
                  this.recordList = resultMessage.DataList;
                  this.recordListCount = resultMessage.resultCount;
                  this.pageInfo.total = this.recordListCount;
                } else if (
                  resultMessage != null &&
                  resultMessage.status == "E" &&
                  resultMessage.message != ""
                ) {
                  _this.$message.error(res.body.message);
                }
              }
              this.mainPageLoading = false;
            },
            function(res) {
              this.$message.error(res.body.msg);
              this.mainPageLoading = false;
            }
          ).catch(message => {
            this.mainPageLoading = false;
          });
      }
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.queryRecord();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPageIndex = val;
      this.queryRecord();
    },
    initPageData() {
      this.recordList = new Array();
      this.recordListCount = 0;
      this.pageInfo.total = 0;
      this.pageInfo.pageSize = 10;
      this.pageInfo.currentPageIndex = 1;
    },
    checkPersonInfo() {
      if (
        this.$store.state.user.companyId == null ||
        this.$store.state.user.companyId == "" ||
        this.$store.state.user.empId == null ||
        this.$store.state.user.empId == ""
      ) {
        this.$message({
          message: "用户信息过期，请重新打开页面",
          type: "warning"
        });
        return false;
      } else {
        return true;
      }
    },
    setWindowHeight() {
      let winHeight = document.body.clientHeight;
      this.$refs.listAuto.style.height = winHeight - 355 + "px";
    }
  },
  components: {
    "fast-customer": FastCustomer
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../zh-cn.less";
</style>