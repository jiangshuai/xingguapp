<template>
    <div class="ConsumerDetail">
        <div class="Box">
            <el-form :model="filterForm" :inline="true" label-width="45px">
                <el-form-item label="日期">
                    <el-date-picker v-model="filterForm.datePicker" @change="chageDate()" type="datetimerange" placeholder="选择时间范围" align="left" format="yyyy/MM/dd HH:mm" :picker-options="pickerOptions" style="width:285px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="项目">
                    <el-radio-group @change="searchConsumeRecord()" v-model="filterForm.project">
                        <el-radio-button  label="all">全部</el-radio-button>
                        <el-radio-button  label="consume">扣费</el-radio-button>
                        <el-radio-button  label="cashback">返账</el-radio-button>
                        <el-radio-button  label="express">快递</el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <el-table :data="tableData" height="500" :summary-method="getSummaries" show-summary>
                <el-table-column prop="date" label="日期">
                </el-table-column>
                <el-table-column prop="consumemoney" label="金额（元）">
                </el-table-column>
                <el-table-column prop="captionofaccountname" label="项目">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination  v-if="total>10"  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 200, 500]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ConsumerDetail",
  props: [],
  data() {
    return {
      filterForm: {
        datePicker: "",
        project: "all"
      },
      currentPage: 1, //当前页
      pageSize: 10,
      total: 0,
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },
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
      }
    };
  },
  created() {
    this.searchConsumeRecord();
  },
  mounted() {
    //let zero = strtotime(date('Y-m-d', time()));
    //console.log(zero);
  },
  computed: {},
  methods: {
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
      this.searchConsumeRecord();
    },

    //消费明细搜索
    searchConsumeRecord() {
      let _this = this;
      var type = this.filterForm.project;
      var d = this.filterForm.datePicker;
      var startDate = "";
      var endDate = "";

      if (d.length >= 1) {
        if (d[0] != null) {
          startDate = this.showtime(d[0], "yyyy-MM-dd HH:mm:ss");
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
        var date = this.getnowDate();
        var addmonth = this.addDate(date, -30);
        startDate = this.showtime(addmonth, "yyyy-MM-dd");
        endDate = this.showtime(date, "yyyy-MM-dd");
      }

      var url =
        this.Global.baseURL +
        this.Global.api.AccountManager.getConsumeRecordFilter;

      this.$http
        .get(url, {
          params: {
            pageIndex: this.currentPage,
            pageSize: this.pageSize,
            beginTime: startDate,
            endTime: endDate,
            item: type
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
                  var date = dataList[i].createdate;
                  var consumemoney = dataList[i].consumemoney;
                  var captionofaccountname = dataList[i].captionofaccountname;
                  var remark = dataList[i].remark;

                  var person = {
                    date: date,
                    consumemoney: consumemoney,
                    captionofaccountname: captionofaccountname,
                    remark: remark
                  };
                  personInfo.push(person);
                }

                this.tableData = personInfo;
                this.total = data.resultCount;
              } else {
                console.log("error");
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
    getConsumeRecord() {

      var url = this.Global.baseURL + this.Global.api.AccountManager.getConsume;
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
              if (data.status == "S") {
                var dataList = data.DataList;
                var personInfo = [];
                for (var i = 0; i < dataList.length; i++) {
                  var date = dataList[i].createdate;
                  var consumemoney = dataList[i].consumemoney;
                  var captionofaccountname = dataList[i].captionofaccountname;
                  var remark = dataList[i].remark;

                  var person = {
                    date: date,
                    consumemoney: consumemoney,
                    captionofaccountname: captionofaccountname,
                    remark: remark
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

    handleSizeChange(val) {
      this.pageSize = val;
      this.searchConsumeRecord();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchConsumeRecord();
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
    }
  },
  components: {}
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./zh-cn.less";
</style>