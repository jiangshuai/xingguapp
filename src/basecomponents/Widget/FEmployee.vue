<template>
  <div style="float:right">
    <el-input placeholder="请选择人员" value="saveValue" :disabled="true" v-model="inputValue" icon="menu"  style="width:188px;"  :on-icon-click="showCityPage" class="pull-right f-width">
    </el-input>
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose" :modal="false">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <el-tree :data="employeeList" ref="employTree" :props="defaultProps" :highlight-current="true" :filter-node-method="filterNode" @node-click="handleNodeClick">>
      </el-tree>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureSelect()">确 定</el-button>
              </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "FEmployee",
  props: ['dataIndex','fieldName','localUrlString'],
  data() {
    return {
      filterText: "",
      dialogVisible: false,
      needModal: false,
      employeeList: [],
      defaultProps: {
        children: "children",
        label: "label",
        FID: "FID",
        NodeType: "NodeType"
      },
      currentNode: [],
      inputValue: "",
      saveValue: "",
      valueField: "FID",
      displayField: "label"
    };
  },
  created() {},
  watch: {
    filterText(val) {
      this.$refs.employTree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    showCityPage() {
      this.loadEmployee();
    },
    loadEmployee() {
      if (this.employeeList != null && this.employeeList.length > 0) {
        this.dialogVisible = true;
        return;
      }
      this.$http
        .get(
          this.localUrlString +
            this.Global.api.FastAddCustomer.getLookupEmpDataList
        )
        .then(
          function(res) {
            if (res.body) {
              var result = JSON.parse(res.body);
              if (result.status != null && result.status == "S") {
                this.employeeList = new Array();
                console.log(result.DataList);
                result.DataList.forEach(function(element) {
                  if (element.ParDeptID == 0) {
                    this.employeeList.push({
                      FID: element.DeptID,
                      label: element.DeptName,
                      NodeType: "D",
                      children: this.recursionCity(
                        element.DeptID,
                        result.DataList,
                        result.DataList2
                      )
                    });
                  }
                }, this);
              }
              console.log(this.employeeList);
              this.dialogVisible = true;
              // return result.DataList;
            }
          },
          function(res) {}
        );
    },
    recursionCity(parentId, tempDataList, empDataList) {
      var tempList = new Array();
      tempDataList.forEach(function(element) {
        if (element.ParDeptID == parentId) {
          //加入部门
          tempList.push({
            FID: element.DeptID,
            label: element.DeptName,
            NodeType: "D",
            children: this.recursionCity(
              element.DeptID,
              tempDataList,
              empDataList
            )
          });
        }
      }, this);
      //加入人员
      empDataList.forEach(function(element) {
        if (element.DeptID == parentId) {
          tempList.push({
            FID: element.EmpID,
            label: element.CNEmpName,
            NodeType: "E"
          });
        }
      }, this);
      return tempList;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleNodeClick(data, _this) {
      this.currentNode = data;
      console.log(this.currentNode);
    },
    sureSelect() {
      if (this.currentNode != null && this.currentNode.NodeType == "E") {
        this.inputValue = this.currentNode[this.displayField];
        this.dialogVisible = false;
        this.saveValue = this.currentNode[this.valueField];
         this.$emit('getSonValue', this.dataIndex,this.fieldName,this.saveValue);
        console.log(this.saveValue);
      } else {
        this.$message({
          message: "please select one employee",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./zh-cn.less";
</style>
