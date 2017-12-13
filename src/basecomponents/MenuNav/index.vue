<template>
    <div class="MenuNav">
        <nav class="nav-header">
            <div class="menu-header">
                <span class="name pull-left" v-if="this.version=='fumaso' || this.version=='' ">
                             孚盟搜
                       <font>2.0</font>
                       <em>Connect with anyone</em>
                </span>

               <span class="name pull-left" v-if="this.version=='account'">
                 账户管理
               </span>
                    
                <span class="menu" >
                    <router-link  v-if="this.version=='fumaso'" to="/findcustomer">找客户</router-link>
                    <router-link  v-if="this.version=='fumaso'" to="/downloadrecord">下载记录</router-link>
                    <router-link  v-if="this.version=='fumaso'" to="/account">账户</router-link>
                    <router-link  v-if="this.version=='account'" to="/accountview">账户总览</router-link>
                    <router-link  v-if="this.version=='account'" to="/consumerDetail">消费明细</router-link>
                    <router-link  v-if="this.version=='account'" to="/rechargeRecord">充值记录</router-link>
                    <!-- <router-link  v-if="this.version=='account'" to="/invoiceManage">发票管理</router-link>
                    <router-link  v-if="this.version=='account'" to="/invoiceSet">发票设置</router-link>-->
                </span>
            </div>

         <!-- <div class="topAD">
                    <ul ref="marqueebox">
                        <li>
                            <i class="iconfont icon-notice"></i>
                            <span class="time">1分钟前<em>|</em></span>
                            <span class="something">OS***n 下载了1条客户 "J***r" 联系信息</span>
                        </li>
                        <li>
                            <i class="iconfont icon-notice"></i>
                            <span class="time">3分钟前<em>|</em></span>
                            <span class="something">S***n222 下载了1条客户 "J***r" 联系信息</span>
                        </li>
                        <li>
                            <i class="iconfont icon-notice"></i>
                            <span class="time">8分钟前<em>|</em></span>
                            <span class="something">S***n333 下载了1条客户 "J***r" 联系信息联系信息联系信息联系信息联系信息联系信息联系信息</span>
                        </li>
                    </ul>
                </div> -->
        </nav>
    </div>
</template>

<script>
import { getCookie, setCookie } from "@/libs/utils.js";
// import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: "MenuNav",
  props: ["role"],
  data() {
    return {
      menuNav: [
        // {title: '主页',link: 'home'},{ title: '账户',link: 'account'}
        // {title: '主页',link: 'home'},{ title: '账户',link: 'account'}
      ],
      version: ""
    };
  },
  //  computed: {
  //         ...mapGetters([
  //             'user'
  //         ])
  //     },
  created() {
    let _this = this;
    // setTimeout(function() {
    //   _this.startAD(25, 20, 1500);
    // }, 200);

    if (this.$route.query.version) {
      this.version = this.$route.query.version;
      console.log("query:" + this.version);
    } else {
      if (
        this.$store.state.user.version != null &&
        this.$store.state.user.version != undefined
      ) {
        this.version = this.$store.state.user.version;
        console.log("store:" + this.version);
      }
    }

    if (this.$route.query.total_amount) {
      this.version = "account";
      console.log("total_amount:" + this.version);
    }
  },
  methods: {
    startAD(lh, speed, delay) {
      var p = false;
      var t;
      var o = this.$refs.marqueebox;
      o.innerHTML += o.innerHTML;
      o.style.marginTop = 0;
      o.onmouseover = function() {
        p = true;
      };
      o.onmouseout = function() {
        p = false;
      };
      function start() {
        t = setInterval(scrolling, speed);
        if (!p) o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
      }
      function scrolling() {
        if (parseInt(o.style.marginTop) % lh != 0) {
          o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
          if (Math.abs(parseInt(o.style.marginTop)) >= o.scrollHeight / 2)
            o.style.marginTop = 0;
        } else {
          clearInterval(t);
          setTimeout(start, delay);
        }
      }
      setTimeout(start, delay);
    }
  },
  components: {}
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./zh-cn.less";
@import "./en.less";
</style>
