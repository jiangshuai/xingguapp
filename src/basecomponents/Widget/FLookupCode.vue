<template>
  <div style="float:right">
    <el-input placeholder="请选择" value="saveValue"  :disabled="true" v-model="inputValue" icon="menu"  style="width:168px;"  :on-icon-click="showPage" class="pull-right f-width">
    </el-input>
    <el-dialog :title="titleValue"  :visible.sync="dialogVisible" style="width:1000px;left:-20%; margin-top:10px; " :modal="false">
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model.trim="searchValue">
          <el-button slot="append" @click="filterData()" icon="search"></el-button>
        </el-input>
      </div>
     
        <el-table class="noHeader" ref="singleTable" height="500" :data="gridData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%;">     
        <el-table-column :property="displayField"></el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button type="primary" @click="selectValue()">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "FLookupCode",
  props: ["titleValue", "fuid", "dataIndex", "fieldName", "localUrlString"],
  data() {
    return {
      dialogVisible: false,
      needModal: false,
      inputValue: "",
      saveValue: "",
      valueField: "",
      displayField: "",
      gridData: [],
      currentRow: null,
      searchValue: ""
    };
  },
  created() {},
  methods: {
    filterData() {
      if (this.searchValue != "") {
        var tempList = this.gridData;
        this.gridData = new Array();
        tempList.forEach(function(element) {
          if (element[this.displayField].indexOf(this.searchValue) > -1) {
            this.gridData.push(element);
          }
        }, this);
      } else {
      }
    },
    showPage() {
      this.loadDataList(this.fuid);
    },
    handleCurrentChange(obj) {
      this.currentRow = obj;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    loadDataList(dataAssociateFUID) {
      this.gridData = new Array();
      this.$http
        .get(
          this.localUrlString +
            this.Global.api.FastAddCustomer.getFilterLookupDataList,
          {
            params: {
              ParFUID: dataAssociateFUID
            }
          }
        )
        .then(
          function(res) {
            if (res.body) {
              var result = JSON.parse(res.body);
              if (result.status != null && result.status == "S") {
                this.displayField = result.resultString;
                this.valueField = result.resultString2;
                this.gridData = new Array();
                this.gridData = result.DataList;
                // console.log( Object.keys(this.gridData[0]));
              }
              this.dialogVisible = true;
              // return result.DataList;
            }
          },
          function(res) {}
        );
    },
    selectValue() {
      if (this.currentRow != null) {
        this.inputValue = this.currentRow[this.displayField];
        this.saveValue = this.currentRow[this.valueField];
        this.$emit(
          "getSonValue",
          this.dataIndex,
          this.fieldName,
          this.saveValue,
          this.inputValue,
          this.valueField,
          this.displayField
        );
        this.dialogVisible = false;
      } else {
        this.$message({
          message: "please select one record",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./zh-cn.less";
.noHeader {
  thead {
    display: none;
  }
}
</style>
