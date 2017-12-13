<template>
    <div class="AccountView">
        <div class="Box">
            <div class="userMsg">
                <div class="avatar"><img src="https://cs.updates.xin/v1/image/3,02e1899eb0d8/180,180"></div>
                <dl>
                    <dt>{{nickname}}</dt>
                    <dd>{{companyname}}</dd>
                    <!-- <dd>
                        <span>
                            <i class="iconfont icon-mail"></i>329717585@qq.com </span>
                        <span>
                            <i class="iconfont icon-mail"></i>13817855026</span>
                    </dd> -->
                </dl>
                <div class="userMoney">
                    <dl>
                        <dt>{{accountAmount}}</dt>
                        <dd>账户余额</dd>
                    </dl>
                    <div class="recharge">
                        <router-link tag="span" to="/accountview/recharge"><el-button size="small">充值</el-button></router-link>
                    </div>
                </div>
            </div>

            <!-- <div class="myProduct">
                <div class="title">我的产品</div>
                <el-row :gutter="15">
                    <el-col :span="8">
                        <ul>
                            <li>
                                <span>
                                    <i class="iconfont icon-mail-a"></i>
                                </span>
                                <dl>
                                    <dt>邮件AM</dt>
                                    <dd>定制私有的投递渠道，精准锁定每一位用户，实现企业营销计划。</dd>
                                </dl>
                            </li>
                            <li>
                                <span>
                                    <el-button size="small">进入应用</el-button>
                                </span>
                                <dl>0.1元/条（小于200kb）</dl>
                            </li>
                        </ul>
                    </el-col>
                    <el-col :span="8">
                        <ul>
                            <li>
                                <span>
                                    <i class="iconfont el-icon-search"></i>
                                </span>
                                <dl>
                                    <dt>邮件AM</dt>
                                    <dd>定制私有的投递渠道，精准锁定每一位用户，实现企业营销计划。</dd>
                                </dl>
                            </li>
                            <li>
                                <span>
                                    <el-button size="small">进入应用</el-button>
                                </span>
                                <dl>0.1元/条（小于200kb）</dl>
                            </li>
                        </ul>
                    </el-col>
                    <el-col :span="8">
                        <ul>
                            <li>
                                <span>
                                    <i class="iconfont icon-customs"></i>
                                </span>
                                <dl>
                                    <dt>邮件AM</dt>
                                    <dd>定制私有的投递渠道，精准锁定每一位用户，实现企业营销计划。</dd>
                                </dl>
                            </li>
                            <li>
                                <span>
                                    <el-button size="small">进入应用</el-button>
                                </span>
                                <dl>0.1元/条（小于200kb）</dl>
                            </li>
                        </ul>
                    </el-col>
                    <el-col :span="8">
                        <ul>
                            <li>
                                <span>
                                    <i class="iconfont icon-crm"></i>
                                </span>
                                <dl>
                                    <dt>邮件AM</dt>
                                    <dd>定制私有的投递渠道，精准锁定每一位用户，实现企业营销计划。</dd>
                                </dl>
                            </li>
                            <li>
                                <span>
                                    <el-button size="small">进入应用</el-button>
                                </span>
                                <dl>0.1元/条（小于200kb）</dl>
                            </li>
                        </ul>
                    </el-col>                    
                </el-row>
            </div> -->


        </div>
        
    </div>
</template>

<script>
export default {
  name: "AccountView",
  props: [],
  data() {
    return {
      accountAmount: 0,
      nickname:'',
      companyname:''
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
      this.$http.get(url, { }).then(
        function(res) {
          if (res.body != undefined) {
            var data = res.body;
            if (data.status == "S") {
              var entity = data.entity;
              if (entity != null) {
                this.accountAmount = entity.overallbalance;
                this.nickname=entity.username;
                this.companyname=entity.companyname;
              } else {
                this.$message.error("账户尚未初始化");
              }
            } else {
               this.$message.error(data.message);
            }
          } else {
            console.log("http get fail");
          }
        },
        function(res) {
          this.$message.error(res.body.msg);
        }
      );
    }
  },
  components: {}
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./zh-cn.less";
</style>