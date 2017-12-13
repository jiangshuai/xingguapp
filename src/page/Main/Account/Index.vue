<template>
  <div class="Main">
    <div class="findCustomer">
      <div class="findCustomer_account">
        <el-table :data="tableData" border style="width: 60%">
          <el-table-column label="Fumasoft API" width="480px">
            <template scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    <el-tag>{{scope.row.apiUrl}}</el-tag>
                                </div>
</template>
                    </el-table-column>
                    <el-table-column label="操作">
<template scope="scope">
  <el-button size="small" @click="dialogFormVisible = true">
    编辑</el-button>
</template>
                    </el-table-column>
                </el-table>
            </div>
               </div>

        <el-dialog title="API URL" :visible.sync="dialogFormVisible" custom-class="widthDefault">
            <el-form :model="form">
                <el-input v-model="form.url"  auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyApiUrl">确 定</el-button>
            </div>
        </el-dialog>
    </div>
  </template>

<script>
export default {
  name: "Account",
  data() {
    return {
      tableData: [
        {
          apiUrl: ""
        }
      ],
      dialogFormVisible: false,
      form: {
        url: ""
      },
      formLabelWidth: "120px",
      formInputWidth: "200px"
    };
  },
  created() {
    this.getApiUrl();
  },
  methods: {
    getApiUrl() {
      this.$http
        .get(this.Global.baseURL + this.Global.api.Account.getUrl, {
         
        })
        .then(
          function(res) {
            console.log(res);
            if (res.body != "") {
              var returndata = JSON.parse(res.body);
              if (returndata.status != "E" && returndata.status!= null) {
                this.tableData[0].apiUrl = returndata.resultString;
              } else {
                this.tableData[0].apiUrl = "";
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
    modifyApiUrl() {
      console.log(this.form.url);
      if (this.form.url.trim() != "") {
        this.$http
          .post(this.Global.baseURL + this.Global.api.Account.modifyApiUrl, {
            cid: this.$store.state.user.companyId,
            apiUrl: this.form.url.trim()
          })
          .then(
            function(res) {
              if (res.body != "") {
                var returndata = JSON.parse(res.body);
                if (returndata.status != "E") {
                  this.tableData[0].apiUrl = this.form.url.trim();
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
        this.$message({
          message: "请设置Fumasoft API URL",
          type: "warning"
        });
      }
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../less/base.less";
@import "./zh-cn.less";
</style>


