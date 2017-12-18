<template>
    <div class="MenuNav">
        <nav class="nav-header">
            <div class="menu-header">
                <span class="name pull-left">
                             孚盟搜
                       <font>2.0</font>
                       <em>Connect with anyone</em>
                </span>

                <span class="menu">
                  
                    <!-- <router-link   to="/downloadrecord">下载记录</router-link>
                    <router-link   to="/account">账户</router-link> -->
                    <router-link   to="/fastCustomer">客户</router-link>
                    <router-link   to="/customerList">客户列表</router-link>
                </span>
            </div>
        </nav>
    </div>
</template>

<script>
import { getCookie, setCookie } from "@/libs/utils.js";
export default {
  name: "MenuNav",
  props: ["role"],
  data() {
    return {
      version: ""
    };
  },

  created() {
    let _this = this;
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
