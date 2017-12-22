<template>
    <div class="RechargeRecord">
        <div class="Box" >
           <el-dialog title="客户列表" :visible.sync="DialogSelect.isOpen" @close='colseWindow' custom-class="width820" >
            <el-form :model="DialogSelect.selectForm" v-loading.body="CustomerLoading">
                <el-input v-model="filterForm.keyword" @keyup.enter.native="searCustomer()" placeholder="输入搜索">
                    <el-button slot="append" @click='searCustomer()' icon="search">搜索</el-button>
                </el-input>
                <el-table :data="tableData" height="300" style="margin:15px 0;" empty-text=" " >
                    <el-table-column width="60">
                        <template scope="scope">    
                                <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.row.fid)">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="briefname" label="简称">
                    </el-table-column>
                    <el-table-column prop="ownername" label="拥有人">
                    </el-table-column>
                      <el-table-column prop="maincontactname" label="主联系人">
                    </el-table-column>
                      <el-table-column prop="mailaddress" label="邮箱地址">
                    </el-table-column>
                </el-table>

                 <div class="pagination">
                <el-pagination   v-if="total>10" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 200, 500]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
                <br>
                <div class="text-center">
                    <el-button type="primary" @click='confirmCustomer()' style="width:123px;">确定</el-button>
                    <el-button @click="DialogSelect.isOpen = false" style="width:123px;">取消</el-button>
                </div>
            </el-form>
            
        </el-dialog>
       </div>
    </div> 
</template>

<script>
export default {
  name: "customerList",
  props: [],
  data() {
    return {
      filterForm: {
        keyword: ""
      },
      radio: false,
      DialogSelect: {
        isOpen: false
      },
      currentPage: 1, //当前页
      pageSize: 10,
      total: 0,
      tableData: [],
      isOpen: false,
      custid: 0,
      CustomerLoading: true,
      empId: ""
    };
  },
  created() {
    //this.searchRechargeRecord();
  },
  mounted() {},
  computed: {},
  methods: {
  
    getCurrentRow(custid) {
      this.custid = custid;
    },

    colseWindow()
    {
         this.DialogSelect.isOpen = false;
         this.$emit("noSelectCustomer",this.custid);
    },

    confirmCustomer() {
      this.DialogSelect.isOpen = false;
      this.$emit("getCustomer", this.custid);
    },

    closeSelectCustomer() {
      this.custid = 0;
      this.$emit("noSelectCustomer");
      this.DialogSelect.isOpen = false;
    },

    searCustomer() {
      this.searchRechargeRecord();
    },
    selectrecharge(number) {
      console.log(number);
    },

    searchRechargeRecord() {
      var url =
        this.Global.baseURL + this.Global.api.FastAddCustomer.GetCustomer;
      this.$http
        .get(url, {
          params: {
            pageIndex: this.currentPage,
            pageSize: this.pageSize,
            keyword: this.filterForm.keyword,
            empId: this.empId
          }
        })
        .then(
          function(res) {
            if (res.body != undefined) {
              var data = JSON.parse(res.body);
              if (data.status == "S") {
                var result = data.resultString;

                var dataList = JSON.parse(result);
                //console.log(dataList);
                var personInfo = [];
                for (var i = 0; i < dataList.length; i++) {
                  var fid = dataList[i].FID;
                  var briefname = dataList[i].BriefName;
                  var fullname = dataList[i].FullName;
                  var lasttrackInfo = dataList[i].LastTrackInfo;
                  var ownername = dataList[i].OwnerName;
                  var maincontactname = dataList[i].MainContactsFullName;
                  var mailaddress = dataList[i].MailAddress;

                  var person = {
                    fid: fid,
                    briefname: briefname,
                    fullname: fullname,
                    lasttrackInfo: lasttrackInfo,
                    ownername: ownername,
                    maincontactname: maincontactname,
                    mailaddress: mailaddress
                  };
                  personInfo.push(person);
                }
                this.tableData = personInfo;
                this.total = data.resultCount;
                this.CustomerLoading = false;
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
      this.searchRechargeRecord();
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchRechargeRecord();
    }
  },
  components: {}
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../less/base.less";
@import "./zh-cn.less";
</style>