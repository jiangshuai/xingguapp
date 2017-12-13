<template>
  <div class="Main">
    <div class="findCustomer">
      <div class="findCustomer_search">
        <div>
          lets you find email addresses in seconds and connect with the people that matter for your business.
        </div>
        <label>
                        <input type="text" v-model.trim="searchWords" class="transition_all" placeholder="请输入网站地址和企业的域名">
                        <span class="box-search-btn transition_all" @click.stop.prevent="searchSubmit()">
                          <i class="glyphicon glyphicon-search"></i>
                        </span>
                      </label>
        <div>
          <el-radio-group v-model="radioSelect">
            <el-radio :label="1">All</el-radio>
            <el-radio :label="2">Personal</el-radio>
            <el-radio :label="3">Generic</el-radio>
          </el-radio-group>
        </div>
        <div>
          <el-badge v-for="(depart,dIndex) in departmentList" :value="depart.count" :key="dIndex" class="item">
            <el-button size="small" @click="selectOneDepartment(depart.position)" v-bind:class="[selectDepart == depart.position ? 'item-button':'']">{{depart.position}}</el-button>
          </el-badge>
        </div>
        <div>
          etc: www.fumasoft.com or fumasoft.com
        </div>
        <div class="searchContent">
          <div>找到
            <span>{{total}}</span> 个邮箱
          </div>
          <ul class="list" v-loading="loading">
            <li v-for="(item, index) in mailList" :key="index">
              <div v-if="(item.first_name!=null && item.first_name!='')||(item.last_name!=null && item.last_name!='')">
                <span>{{item.first_name}} {{item.last_name}}</span> <span style="margin-left:5px;color:#aaa">{{item.position}}</span>
                <span style="margin-left:5px;color:#aaa">{{item.phone_number}}</span></div>
              <span class="mailAddress ">{{item.value}}</span>
              <span class="mailPercent ">{{item.confidence}}</span>
              <div class="pull-right ">
                <span style="margin-right: 30px; ">
                                <button type="button " class="btn btn-default btn-xs text-blue " @click="showCustAndSupplierDialog(item.value,item.phone_number) ">立即建档</button>
                               <!--  <button type="button " class="btn btn-default btn-xs text-blue ">加到地址簿</button>
                                <button type="button " class="btn btn-default btn-xs text-blue ">发邮件</button> -->
                              </span>
                <button type="button " class="btn btn-default btn-xs " @click="item.isShow=! item.isShow ">来源
                                <em>{{item.sources.length}}</em> 处
                                <i class="glyphicon glyphicon-chevron-down "></i>
                              </button>
              </div>
              <ol class="more " v-show="item.isShow ">
                <li v-for="(source, souceIndex) in item.sources " v-if="souceIndex<10 " :key="souceIndex ">
                  <a v-bind:href=source.uri target="_blank ">{{source.uri}} . {{source.extracted_on}}</a>
                </li>
              </ol>
            </li>
          </ul>
        </div>
        <div class="block " v-if="total>0">
          <el-pagination layout="prev, pager, next" :total="total" v-on:current-change="pageIndexChange">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--  <el-dialog title="请选择"  :visible.sync="searchDialogShow" custom-class="width420">
                          <div class="text-center">
                              <el-button type="primary">新客户</el-button>
                              <el-button type="primary">现有客户</el-button>
                              <el-button type="primary">新客户</el-button>
                          </div>
                      </el-dialog> -->
    <customerDialog ref="customerDialog"></customerDialog>
  </div>
</template>

<script>
  import CustomerDialog from "@/basecomponents/FinderCustomer/CustomerDialog";
  export default {
    name: "MainHome",
    props: {},
    data() {
      return {
        loading: false,
        pageIndex: 0,
        pageSize: 10,
        total: 0,
        searchWords: "",
        searchDialogShow: false,
        searchList: [],
        allSearchList: [],
        mailList: [],
        customerDialogVisible: false,
        radioSelect: 1,
        departmentList: [],
        selectDepart: ""
      };
    },
    created() {
      /*   this.$emit("aaa"); */
    },
    mounted() {
      // this.toCustomer();
    },
    methods: {
      searchSubmit() {
        let _this = this;
        if (this.checkSearchWord()) {
          this.loading = true;
           this.$http
            .post(this.Global.baseURL + this.Global.api.DomainSearch.search, {
              domain: _this.searchWords,
              type: this.changeToTypeString(this.radioSelect)
            })
            .then(
              function(res) {
                if (
                  res.body &&
                  res.body.status != undefined &&
                  res.body.status == "S"
                ) {
                  var bodyData = JSON.parse(res.body.resultString);
                  var tempList = bodyData.data.emails;
                  tempList.forEach(function(element) {
                    element.isShow = false;
                  }, this);
                  _this.searchList = tempList;
                  _this.allSearchList = tempList;
                  _this.total = tempList.length;
                  _this.mailList = tempList.slice(
                    _this.pageIndex,
                    _this.pageSize
                  );
                  //console.log(_this.mailList);
                  //部门分类
                  this.selectDepart = "";
                  this.departmentList = new Array();
                  var Department = function() {
                    this.position = "";
                    this.count = 0;
                    this.list = new Array();
                  };
           
                  _this.searchList.forEach(function(element) {
                    if (element.position != null && element.position != "") {
                      var needPushNew = true;
                      if (this.departmentList != null && this.departmentList.length > 0) {
                        for (var i = 0; i < this.departmentList.length; i++) {
                          if (this.departmentList[i].position == element.position) {
                            this.departmentList[i].count++;
                            this.departmentList[i].list.push(element);
                            needPushNew = false;
                            break;
                          }
                        }
                      } else {
                        needPushNew = true;
                      }
                      if (needPushNew) {
                        var temp = new Department();
                        temp.position = element.position;
                        temp.count = 1;
                        temp.list = new Array();
                        temp.list.push(element);
                        this.departmentList.push(temp);
                      }
                    }
                  }, this);
                  //所有部门
                  let allDepartCount =  _this.allSearchList == null ? 0:_this.allSearchList.length;
                  if (this.departmentList != null && this.departmentList.length > 0) {
                    var temp = new Department();
                    temp.position = "All";
                    temp.count = allDepartCount ;
                    temp.list = null;
                    this.departmentList.push(temp);
                  }
                } else if (
                  res.body &&
                  res.body.status != undefined &&
                  res.body.status == "E"
                ) {
                  _this.$message.error(res.body.message);
                }
                this.loading = false;
              },
              function(res) {
                _this.$message.error(res.body.msg);
                this.loading = false;
              }
            );  
        } else {
          _this.searchList = [];
          _this.mailList = [];
          _this.total = 0;
          _this.pageIndex = 0;
          this.loading = false;
        }
      },
      paginationData() {
        if (this.searchList != null && this.searchList.length > 0) {
          var beginIndex = (this.pageIndex - 1) * this.pageSize;
          this.mailList = this.searchList.slice(
            beginIndex,
            beginIndex + this.pageSize
          );
        }
      },
      changeToTypeString(type) {
        if (type == 2) {
          return "personal";
        } else if (type == 3) {
          return "generic";
        } else {
          return "";
        }
      },
      searchDialog(index) {
        this.searchDialogShow = true;
        console.log(index);
      },
      pageIndexChange: function(pageIndex) {
        this.pageIndex = pageIndex;
        this.paginationData();
      },
      //检查搜索的内容
      checkSearchWord() {
        var tempResult = true;
        //不能为空
        if (this.searchWords == "") {
          return false;
        }
        //是否合法的域名
        if (this.searchWords.indexOf(".") <= 0) {
          return false;
        }
        return tempResult;
      },
      //显示客户供应商界面
      showCustAndSupplierDialog(addresses, phone) {
        // this.customerDialogVisible = true;
        if (addresses != null && addresses != "") {
          this.$refs.customerDialog.closePage();
          this.$refs.customerDialog.initData(addresses.substring(0, addresses.indexOf('@')), addresses, phone);
          this.$refs.customerDialog.showCustDialog();
        }
      },
      /**
       * 选择部门组
       */
      selectOneDepartment(value) {
        if (value == "All") {
          this.searchList = this.allSearchList;
        } else {
          this.searchList = new Array();
          this.selectDepart = value;
          this.departmentList.forEach(function(element) {
            if (element.position == value) {
              element.list.forEach(function(element) {
                this.searchList.push(element);
              }, this);
            }
          }, this);
        }
        var tempList = this.searchList;
        this.mailList = null;
        this.total = tempList.length;
        this.mailList = tempList.slice(
          this.pageIndex,
          this.pageSize
        );
      }
    },
    components: {
      customerDialog: CustomerDialog
    }
  };
</script>


<style lang="less" rel="stylesheet/less">
  @import "./zh-cn.less";
</style>
