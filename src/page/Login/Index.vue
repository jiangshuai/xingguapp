<template>
    <div id="divMsg">
      <loadingdiv ref="loaddiv"></loadingdiv>
    </div>
</template>
<script>
import $ from "jquery";
import { getCookie, setCookie } from "@/libs/utils.js";
import LoadingDiv from "@/basecomponents/Loading/index";
export default {
  name: "login",
  data() {
    return {
      empId: "",
      password: "",
      companyId: "",
      expiresHours: 24,
      loginMessage: "",
      version: "",
      tryNum: 0
    };
  },
  created() {
    this.empId = this.$route.query.empId;
    this.password = this.$route.query.password;
    this.companyId = this.$route.query.companyId;

    if (this.$route.query.version != undefined &&this.$route.query.version != "") {
      this.version = this.$route.query.version;
      this.$store.commit("isLogin", { empId: "", companyId: "", version: "", m8empid: "" });
      setCookie(this.Global.accessToken, '', { expires: 2, path: "/" });
    }
    this.LoginSystem();
  },
  mounted() {},
  methods: {
    //系统登录
    LoginSystem() {
      var tokenUrl = this.Global.baseURL + this.Global.api.Login.token;
      this.$http
        .get(tokenUrl, {
          params: {
            companyId: this.companyId,
            empId: this.empId,
            password: this.password
          }
        })
        .then(
          function(res) {
            this.tryNum++;
            if (res.body && res.body != "") {
              var data = JSON.parse(res.body);
              if (data.status == "S") {
                var resultString = data.resultString;
                setCookie(this.Global.accessToken, resultString, {
                  expires: 2,
                  path: "/"
                });

                this.$http
                  .get(
                    this.Global.baseURL +
                      this.Global.api.FastAddCustomer.getM8EmpId,
                    {}
                  )
                  .then(
                    function(res) {
                      if (res.body != "") {
                        var returndata = JSON.parse(res.body);
                        if (
                          returndata.status != "E" &&
                          returndata.status != null
                        ) {
                          var M8EmpId = returndata.resultString;
                          this.$store.commit("isLogin", {
                            empId: this.empId,
                            companyId: this.companyId,
                            version: this.version,
                            m8empid: M8EmpId
                          });

                          if (this.version == "fumaso") {
                            this.$router.push({
                              path: "findcustomer",
                              params: { version: this.version }
                            });
                          } else {
                            this.$router.push({
                              path: "accountview",
                              params: { version: this.version }
                            });
                          }
                        } else {
                          this.$message({
                            message: returndata.message,
                            type: "warning"
                          });
                        }
                      } else {
                        this.$message({
                          message: "api异常",
                          type: "warning"
                        });
                      }
                    },
                    function(res) {}
                  );
              } else {
                this.loginMessage = data.message;
                if (this.tryNum < 3) {
                  this.LoginSystem();
                } else {
                  console.log("登陆失败");
                  $("#divMsg").html("登陆失败...");
                }
              }
            } else {
              this.loginMessage = "no user";
              this.$alert("no user", "提醒", {
                confirmButtonText: "确定"
              });
              this.$store.commit("isLogin", {
                empId: "",
                companyId: "",
                version: "",
                m8empid: ""
              });
            }
          },
          function(res) {
            this.$message.error(res.body.msg);
          }
        );
    }
  },

  watch: {},
  components: { loadingdiv: LoadingDiv }
};
</script>
<style lang="less" rel="stylesheet/less">

</style>