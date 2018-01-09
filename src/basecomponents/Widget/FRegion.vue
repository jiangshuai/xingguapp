<template>
  <div style="float:right">
    <el-input placeholder="请选择地区" value="saveValue" :disabled="true" v-model="inputValue" icon="menu" style="width:168px;" :on-icon-click="showCityPage" class="pull-right f-width">
    </el-input>
    <el-dialog title="地区选择" :visible.sync="dialogVisible"  :before-close="handleClose" :modal="false">
      <el-tree :data="cityList" :props="defaultProps" :highlight-current="true" accordion @node-click="handleNodeClick">>
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
    name: "FRegion",
    props: ['fuid', 'dataIndex', 'fieldName', 'returnValues','localUrlString'],
    data() {
      return {
        dialogVisible: false,
        needModal: false,
        cityList: [],
        defaultProps: {
          CityPath: "CityPath",
          children: "children",
          label: "label",
          FID: "FID",
          CityCode: "CityCode"
        },
        resultDataList: [],
        currentNode: [],
        inputValue: "",
        saveValue: "",
        valueField: "",
        displayField: ""
      };
    },
    created() {},
    methods: {
      showCityPage() {
        this.loadCity(this.fuid);
      },
      loadCity(dataAssociateFUID) {
        if (this.cityList != null && this.cityList.length > 0) {
          this.dialogVisible = true;
          return;
        }
        this.$http
          .get(
            this.localUrlString +
            this.Global.api.FastAddCustomer.getFilterLookupDataList, {
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
                  this.cityList = new Array();
                  this.resultDataList = result.DataList;
                  result.DataList.forEach(function(element) {
                    //几大洲
                    if (element.ParGID == 0) {
                      this.cityList.push({
                        FID: element.FID,
                        label: element.CityName,
                        CityPath: element.CityPath,
                        CityCode: element.CityCode,
                        children: this.recursionCity(element.FID, result.DataList)
                      });
                    }
                  }, this);
                }
                this.dialogVisible = true;
                // return result.DataList;
              }
            },
            function(res) {}
          );
      },
      recursionCity(parentId, tempDataList) {
        var tempList = new Array();
        tempDataList.forEach(function(element) {
          if (element.ParGID == parentId) {
            tempList.push({
              FID: element.FID,
              label: element.CityName,
              CityPath: element.CityPath,
              CityCode: element.CityCode,
              children: this.recursionCity(element.FID, tempDataList)
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
        console.log(data);
      },
      sureSelect() {
        this.inputValue = this.currentNode[this.displayField];
        this.dialogVisible = false;
        this.saveValue = this.currentNode[this.valueField];
        var returnField = "";
        var returnValue = "";
        var needValueList = this.returnValues.trim(';').split(";");
        var field1 = this.valueField;
        var field2 = this.displayField;
        var tempSaveValue = this.saveValue;
        for (var i = 0; i < this.resultDataList.length; i++) { //循环地址列表，找出附加返回的值
          var temp = this.resultDataList[i];
          if (needValueList != null && needValueList.length > 0) {
            needValueList.forEach(function(val) {  //循环附加返回的值列表
              var tempList = val.split("=");
              if (tempList != null && tempList.length > 0) {
                var oneField = tempList[1]
                if (oneField == field1) {} else if (oneField == field2) {} else if (temp.FID == tempSaveValue) {
                    //如果是选中的这个区域，那么将附加返回的数据返回
                    Object.keys(temp).forEach(function(element) {
                       if(element ==  oneField){
                           returnField = element;
                           returnValue = temp[element];
                       }
                   }, this); 
                }
              }
            });
          }
        }
        console.log(returnField + "," + returnValue);
        this.$emit('getSonValue', this.dataIndex, this.fieldName, this.saveValue, this.inputValue, this.valueField, this.displayField,returnValue,returnField);
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "./zh-cn.less";
</style>
