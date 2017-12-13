<template>
    <div class="FindCustomer">
        <div class="searchBox">

           <el-radio-group class="searchSelect" v-model="filtertype" @change="chageSelect">
              <el-radio :label="1" >按公司名称</el-radio>
              <el-radio :label="2">按关键字</el-radio>
              <!-- <el-radio :label="3">按邮箱地址</el-radio> -->
            </el-radio-group>

            <el-input size="large" v-model="filterForm.keyword" id='txtsearch' @keyup.enter.native="searchMail()" placeholder="输入公司名称">
                <el-button slot="append" @click="searchMail()" icon="search">搜索</el-button>
            </el-input>
        </div>



        <div class="noDataTips" v-if="initSearch==true">
          <img src="/static/images/nodata01.png">
          <dl>
            <dt>暂无信息</dt>
            <dd>请使用上方的“搜索”功能查找客户信息</dd>
          </dl>
        </div>

        <div class="noDataTips" v-if="noresult==true">
          <img src="/static/images/nodata02.png">
          <dl>
            <dt>暂无信息</dt>
            <dd>换个公司名称或关键字搜索试试～</dd>
          </dl>
         </div>



        <div class="searchList" v-loading="pageSearchLoading">
            <div class="wrap">
                <div class="" ref="listAuto">
                    <table>
                        <tbody>
                            <tr v-for="(result,index) in searchResultList" :key="index">
                                <td width="120">
                                    <div class="avatar"><img src="https://cs.updates.xin/v1/image/3,02e1899eb0d8/180,180"></div>
                                </td>
                                <td width="330" style="padding-right:50px;">
                                    <div class="title">{{result.name}}</div>
                                    <div class="descript">
                                        {{result.current_title}} at {{result.current_employer}} - {{result.location}}
                                        <!--<span class="flag"><img src="/static/flags/China.png"></span> -->
                                    </div>
                                    <div class="socialIcon">
                                        <template v-for="(linkItem,key,linkIndex) in result.links">
                                                <span v-if="key == 'linkedin'" :key="linkIndex">
                                                    <a @click="showLinkUrl(result.id,linkItem)"  target="blank">
                                                        <i class="iconfont icon-linkedin"></i>
                                                    </a>
                                                </span>
                                                <span v-if="key == 'twitter'" :key="linkIndex">
                                                    <a @click="showLinkUrl(result.id,linkItem)"  target="blank">
                                                                                <i class="iconfont icon-twitter"></i>
                                                    </a>
                                                                            </span>
                                                <span v-if="key == 'facebook'" :key="linkIndex">
                                                    <a @click="showLinkUrl(result.id,linkItem)"  target="blank">
                                                                                <i class="iconfont icon-facebook"></i>
                                                    </a>
                                                                            </span>
                                                <span v-if="key == 'quora'" :key="linkIndex">
                                                    <a @click="showLinkUrl(result.id,linkItem)"  target="blank">
                                                                                <i class="iconfont icon-quora"></i>
                                                    </a>
                                                                            </span>
                                                <span v-if="key == 'qq'" :key="linkIndex">
                                                    <a @click="showLinkUrl(result.id,linkItem)"  target="blank">
                                                                                <i class="iconfont icon-QQ"></i>
                                                    </a>
                                                                            </span>
                                                <span v-if="key == 'github'" :key="linkIndex">
                                                    <a @click="showLinkUrl(result.id,linkItem)"  target="blank">
                                                                                <i class="iconfont icon-github"></i>
                                                    </a>
                                                                            </span>
                                                <span v-if="key == 'wechat'" :key="linkIndex">
                                                    <a @click="showLinkUrl(result.id,linkItem)"  target="blank">
                                                                                <i class="iconfont icon-weixin"></i>
                                                    </a>
                                                </span>
                                  </template>
                                </div>
                            </td>
                            <td width="300"  v-loading="result.isLoading">
                               
                                 <ul class="alreadyMail" v-if="(result.is_download=='Y')">
                                        <li v-for="(emailItem,mailIndex) in result.emails" :key="mailIndex">
                                            <i class="iconfont icon-mail"></i> {{emailItem.email}}
                                        </li>                                      
                                 </ul>
                                
                                  <ul v-else class="alreadyMail">
                                    <li>
                                        <i class="iconfont icon-mail"></i> <span style="font-size:12px;color:#999">联系人邮箱和电话需要点击按钮获取信息方可查看</span>
                                    </li>                                      
                                </ul>
                                <div class="btns">
                                    <el-button v-if="!(result.is_download=='Y')"  @click="getContactInfo(result.id)" style="width:100px;font-size:12px;">获取联系信息</el-button>
                                </div>
                            </td>
                            <td>
                                <i class="el-icon-check" v-if="(result.is_download=='Y') && currentctid!=result.ctid" style="margin-left:120px;">{{result.username}}已下载</i>
                                <i class="el-icon-check" v-if="(result.is_download=='Y') && currentctid==result.ctid" style="margin-left:120px;"></i>
                            </td>
                        </tr>
                  </tbody>
                </table>
                </div>
                <div class="el-pagination" v-if="searchResultCount>=9">
                       <button type="button" v-if="currentPageIndex>1" class="btn-prev" @click="pagePre()" >
                         <i class="el-icon el-icon-arrow-left"></i>
                       </button>
                       <button type="button" v-else class="btn-prev disabled">
                         <i class="el-icon el-icon-arrow-left"></i>
                       </button>
                     
                       <button type="button" class="btn-next disabled"  v-if="searchResultCount<9" >
                          <i class="el-icon el-icon-arrow-right"></i>
                       </button>
                         <button type="button" class="btn-next" v-else  @click="pageNext()" >
                          <i class="el-icon el-icon-arrow-right"></i>
                       </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "FindCustomer",
  props: [],
  data() {
    return {
      currentPage: 1,
      filtertype: 1,
      warnMsg: "输入公司名称",
      filterForm: {
        keyword: "",
        industry: "",
        title: "",
        company_id: "",
        emp_id: "",
        pageSize: 10,
        pageIndex: 1
      },
      limit: 1,
      dropdownLoading: false,
      pageSearchLoading: false,
      clearable: true,
      list: [],
      states: [
        "Accounting",
        "Aviation",
        "Animation",
        "Biotechnology",
        "Banking",
        "Broadcast Media",
        "Building Materials",
        "Chemicals",
        "Civil Engineering",
        "Consumer Goods",
        "Cosmetics",
        "Dairy"
      ],
      searchResultCount: 0,
      searchResultList: [],
      currentPageIndex: 1,
      staticSearchPara: [],
      cost: 10,
      initSearch: true,
      noresult: false,
      currentctid:0
    };
  },
  created() {},
  mounted() {
    this.list = this.states.map(item => {
      return {
        value: item,
        label: item
      };
    });
    let _this = this;
  },
  computed: {},
  methods: {
    chageSelect(v) {
      if (v == 1) {
        this.warnMsg = "输入公司名称";
        $("#txtsearch input").attr("placeholder", this.warnMsg);
      }
      if (v == 2) {
        this.warnMsg = "输入名字、关键字、Linkedin URL";
        $("#txtsearch input ").attr("placeholder", this.warnMsg);
      }
      if (v == 3) {
        this.warnMsg = "输入邮箱地址";
        $("#txtsearch input ").attr("placeholder", this.warnMsg);
      }
    },
    searchMail() {
      let _this = this;
      var type = _this.filtertype;
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
        return;
      }

      _this.initSearch = false;
      _this.noresult =false;
      if (_this.filterForm.keyword != "") {
        var company = "";
        var searchkeyword = "";
        if (type == "1") {
          company = _this.filterForm.keyword;
          searchkeyword = "";
        }

        if (type == "2") {
          company = "";
          searchkeyword = _this.filterForm.keyword;
        }
        _this.staticSearchPara = {
          keyword: searchkeyword,
          pageIndex: 1,
          company: company
        };
        //获取数据
        this.getRecordByPageIndex(1);
      } else {
        this.$message({
          message: this.warnMsg,
          type: "warning"
        });
        return;
      }
    },
    remoteMethod(query) {
      if (query !== "") {
        this.dropdownLoading = true;
        setTimeout(() => {
          this.dropdownLoading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        //this.options4 = [];
      }
    },
    clearData() {
      this.searchResultCount = 0;
      this.searchResultList = new Array();
      this.currentPageIndex = 1;
    },

    //扣款付费
    findContactCost() {
      var issuccess = false;
      let _this = this;
      this.$http
        .post(
          this.Global.baseURL +
            this.Global.api.AccountManager.getcustomerforpay,
          {
            consumemoney: this.cost
          }
        )
        .then(
          function(res) {
            if (res.body != undefined) {
              var resultMessage = JSON.parse(res.body);
              console.log(resultMessage);
              if (resultMessage.status != null && resultMessage.status == "S") {
                issuccess = true;
              } else if (
                resultMessage != null &&
                resultMessage.status == "E" &&
                resultMessage.message != ""
              ) {
                issuccess = false;
                _this.$message.error(resultMessage.message);
              }
            }
            console.log(issuccess);
            return issuccess;
          },
          function(res) {
            var result = JSON.parse(res.body);
            this.$message.error(result.message);
            return false;
          }
        )
        .catch(res => {
          console.log("Cost ex: ", res);
        });
    },

    //获取联系人信息
    getContactInfo(id) {
      let _this = this;
      _this.searchResultList.forEach(element => {
        if (element.id == id) {
          element.isLoading = true;
          //付款扣费
          this.$http
            .post(
              this.Global.baseURL +
                this.Global.api.AccountManager.getcustomerforpay,
              {
                consumemoney: this.cost
              }
            )
            .then(
              function(res) {
                if (res.body != undefined) {
                  var resultMessage = JSON.parse(res.body);
                  console.log("resultMessage" + res.body);
                  if (
                    resultMessage.status != null &&
                    resultMessage.status == "S"
                  ) {
                    this.$http
                      .post(
                        this.Global.baseURL +
                          this.Global.api.Rocket.getContactInfo,
                        {
                          rocketreach_id: id
                        }
                      )
                      .then(
                        function(res) {
                          if (
                            res.body &&
                            res.body.status != undefined &&
                            res.body.status == "S"
                          ) {
                            var bodyData = JSON.parse(res.body.resultString);
                            console.log(res.body);
                            _this.searchResultList.forEach(element => {
                              if (element.id == id) {
                                element.links = bodyData.links_dic;
                                element.emails = bodyData.emails_list;
                                element.is_download = "Y";
                                element.isLoading = false;
                              }
                            });
                          } else if (
                            res.body &&
                            res.body.status != undefined &&
                            res.body.status == "E"
                          ) {
                            _this.$message.error(res.body.message);
                            element.isLoading = false;
                            return;
                          }
                          _this.searchResultList.forEach(element => {
                            if (element.id == id) {
                              element.isLoading = false;
                            }
                          });
                        },
                        function(res) {
                          this.$message.error(res.body.msg);
                          _this.searchResultList.forEach(element => {
                            if (element.id == id) {
                              element.isLoading = false;
                            }
                          });
                        }
                      );
                  } else if (
                    resultMessage != null &&
                    resultMessage.status == "E" &&
                    resultMessage.message != ""
                  ) {
                    _this.$message.error(resultMessage.message);
                    element.isLoading = false;
                    return;
                  } else {
                    console.log("err:");
                    element.isLoading = false;
                    return;
                  }
                }
              },
              function(res) {
                var result = JSON.parse(res.body);
                this.$message.error(result.message);
              }
            )
            .catch(res => {
              console.log("Cost ex: ", res);
            });
        }
      });
    },
    showLinkUrl(id, url) {
      this.searchResultList.forEach(element => {
        if (element.id == id) {
          if (element.is_download == "Y") {
            window.open(url);
          } else {
            window.open(url);
          }
        }
      });
    },
    setWindowHeight() {
      let winHeight = document.body.clientHeight;
      this.$refs.listAuto.style.height = winHeight - 355 + "px";
    },
    pagePre() {
      var tempIndex = this.currentPageIndex - 1;
      this.getRecordByPageIndex(tempIndex);
    },
    pageNext() {
      var tempIndex = this.currentPageIndex + 1;
      this.getRecordByPageIndex(tempIndex);
    },
    //分页搜索
    getRecordByPageIndex(pageIndex) {
      let _this = this;
      _this.pageSearchLoading = true;
      _this.clearData();
      _this.staticSearchPara.pageIndex = pageIndex;
      var url = this.Global.baseURL + this.Global.api.Rocket.search;

      this.$http
        .get(url, {
          params: _this.staticSearchPara
        })
        .then(
          function(res) {
            if (
              res.body &&
              res.body.status != undefined &&
              res.body.status == "S"
            ) {
              var bodyData = JSON.parse(res.body.resultString);
              console.log(bodyData);
              this.currentctid=res.body.resultInt;
              if (
                bodyData.profiles != undefined &&
                bodyData.profiles != null &&
                bodyData.profiles.length >= 0
              ) {
                if (bodyData.profiles.length == 0) {
                  _this.pageSearchLoading = false;
                  _this.noresult = true;
                  return;
                }

                bodyData.profiles.forEach(element => {
                  element.isLoading = false;
                });
                this.searchResultList = bodyData.profiles;
                this.searchResultCount = this.searchResultList.length;
                this.currentPageIndex = pageIndex;
              }
            } else if (
              res.body &&
              bodyData.status != undefined &&
              bodyData.status == "E"
            ) {
              _this.$message.error(res.body.message);
            } else {
              _this.noresult = true;
            }
            _this.pageSearchLoading = false;
          },
          function(res) {
            this.$message.error(res.body.msg);
            _this.noresult = true;
            _this.pageSearchLoading = false;
          }
        )
        .catch(res => {
          _this.noresult = true;
          _this.pageSearchLoading = false;
          console.log("MaiSec.vue: ", res);
        });
    }
  },
  components: {}
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../zh-cn.less";
</style>