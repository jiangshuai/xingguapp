<template>
  <div>
    <el-form v-if="isShow" :inline="true" v-loading.body="fastAddCustomerLoading" :label-position="labelPosition">
      <table class="tableClass">
        <tr class="titleClass">
          <td colspan="3">
            <div>客户信息</div>
          </td>
        </tr>
        <tr v-for="(trItem,index) in  showFieldListOne" :key="index">
          <td v-for="(tdItem,index2) in trItem" :key="index2" v-if="tdItem.ControlType != null && tdItem.ControlType != '' && tdItem.ControlType != 'null'">
            <span class="tdTitle"><span v-if="tdItem.IsNotNull==1" style="color:red">*</span>{{tdItem.FieldCaption}} </span>
            <template v-if="tdItem.ControlType == 'TcxDBDateEdit'">
              <el-date-picker class="pull-right f-width" style="width:168px;"   type="date"  :editable="false" v-model="tdItem.inputValue"   placeholder="选择日期时间"> </el-date-picker>
            </template>
          <template v-if="tdItem.ControlType == 'TcxDBTextEdit'">
             <el-input placeholder="请输入内容" v-model="tdItem.inputValue" style="width:168px;" class="pull-right f-width"></el-input>
          </template>
         <template v-if="tdItem.ControlType == 'TcxDBMemo'">
         <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" style="width:168px;" v-model="tdItem.inputValue" class="pull-right f-width" placeholder="请输入内容"> </el-input>
        </template>
        <template v-if="tdItem.ControlType == 'TFMDBLookupComboBox' && tdItem.optionList!=null && tdItem.optionList.length>0">
           <el-select v-model="tdItem.inputValue" value-key="tdItem.FieldName" clearable placeholder="请选择" style="width:168px;" class="pull-right f-width">
             <el-option v-for="option in tdItem.optionList" :key="option.ValueID" :label="option.ValueName" :value="option.ValueID"></el-option>
          </el-select>
        </template>
          <!-- 选地区 -->
      <fRegion ref="fRegion" :localUrlString="localUrlString" :returnValues="tdItem.SearchReturnFields"  :fuid="tdItem.DataAssociateFUID" :dataIndex="1" :fieldName="tdItem.FieldName" @getSonValue="getSonValue" v-if="tdItem.ControlType == 'TFMDBFilterLookup' && tdItem.DataStyleType == 'lkpCities'">

      </fRegion>
      <fLookupCode ref="fLookupCode"  :fuid="tdItem.DataAssociateFUID"  v-if="tdItem.ControlType == 'TFMDBFilterLookup'  && tdItem.DataStyleType != 'lkpCities' && tdItem.DataStyleType != 'lkpUsers'" 
                     :localUrlString="localUrlString"     :titleValue="tdItem.FieldCaption"  :dataIndex="1" :fieldName="tdItem.FieldName" @getSonValue="getSonValue" >
      </fLookupCode>
      <!-- 选择人员 -->
      <fEmployee :inputValue="tdItem.inputValue"  v-if="tdItem.ControlType == 'TFMDBFilterLookup' && tdItem.DataStyleType == 'lkpUsers'" 
             :localUrlString="localUrlString"    :dataIndex="1" :fieldName="tdItem.FieldName" @getSonValue="getSonValue" >
      </fEmployee>
                    </td>
                </tr>
                <tr class="titleClass">
                    <td colspan="3">
                        <div>客户联系人</div>
                    </td>
                </tr>
                <tr v-for="(trItem,index) in  showFieldListTwo" :key="index">
                    <td v-for="(tdItem,index2) in trItem" :key="index2"  v-if="tdItem.ControlType != null && tdItem.ControlType != '' && tdItem.ControlType != 'null'">
                        <span class="tdTitle"><span v-if="tdItem.IsNotNull==1" style="color:red">*</span>{{tdItem.FieldCaption}} </span>
<template v-if="tdItem.ControlType == 'TcxDBDateEdit'">
  <el-date-picker type="date" class="pull-right f-width" style="width:168px;" :editable="false" v-model="tdItem.inputValue" placeholder="选择日期时间">
  </el-date-picker>
</template>
<template v-if="tdItem.ControlType == 'TcxDBTextEdit'">
  <el-input placeholder="请输入内容" v-model="tdItem.inputValue" style="width:168px;" class="pull-right f-width">
  </el-input>
</template>
<template v-if="tdItem.ControlType == 'TcxDBMemo'">
  <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" style="width:168px;" v-model="tdItem.inputValue" class="pull-right f-width" placeholder="请输入内容"> </el-input>
</template>
<template v-if="tdItem.ControlType == 'TFMDBLookupComboBox' && tdItem.optionList!=null && tdItem.optionList.length>
   0">
  <el-select v-model="tdItem.inputValue" value-key="tdItem.FieldName" clearable placeholder="请选择" style="width:168px;" class="pull-right f-width">
    <el-option v-for="option in tdItem.optionList" :key="option.ValueID" :label="option.ValueName" :value="option.ValueID">
    </el-option>
  </el-select>
</template>
                        <!-- 选地区 -->
                        <fRegion ref="fRegion"  :localUrlString="localUrlString"  :returnValues="tdItem.SearchReturnFields"  :fuid="tdItem.DataAssociateFUID" :dataIndex="2" :fieldName="tdItem.FieldName" @getSonValue="getSonValue"   v-if="tdItem.ControlType == 'TFMDBFilterLookup' && tdItem.DataStyleType == 'lkpCities'"></fRegion>
                        <fLookupCode ref="fLookupCode"  :localUrlString="localUrlString" :dataIndex="2"  :titleValue="tdItem.FieldCaption" :fieldName="tdItem.FieldName" @getSonValue="getSonValue"  :fuid="tdItem.DataAssociateFUID"  v-if="tdItem.ControlType == 'TFMDBFilterLookup' 
                                                    && tdItem.DataStyleType != 'lkpCities' && tdItem.DataStyleType != 'lkpUsers'" ></fLookupCode>
                        <!-- 选择人员 -->
                        <fEmployee :inputValue="tdItem.inputValue" :localUrlString="localUrlString"  :dataIndex="2" :fieldName="tdItem.FieldName" @getSonValue="getSonValue"   v-if="tdItem.ControlType == 'TFMDBFilterLookup' && tdItem.DataStyleType == 'lkpUsers'"></fEmployee>
                    </td>
                </tr>
                <tr class="titleClass">
                    <td colspan="3">
                        <div>客户联系人邮件地址</div>
                    </td>
                </tr>
                <tr v-for="(trItem,index) in  showFieldListThree" :key="index">
                    <td v-for="(tdItem,index2) in trItem" :key="index2"  v-if="tdItem.ControlType != null && tdItem.ControlType != '' && tdItem.ControlType != 'null'">
                        <span class="tdTitle"><span v-if="tdItem.IsNotNull==1" style="color:red">*</span>{{tdItem.FieldCaption}} </span>
<template v-if="tdItem.ControlType == 'TcxDBDateEdit'">
  <el-date-picker type="date" class="pull-right f-width" style="width:168px;" :editable="false" v-model="tdItem.inputValue" placeholder="选择日期时间">
  </el-date-picker>
</template>
<template v-if="tdItem.ControlType == 'TcxDBTextEdit'">
  <el-input placeholder="请输入内容" v-model="tdItem.inputValue" style="width:168px;" class="pull-right f-width">
  </el-input>
</template>
<template v-if="tdItem.ControlType == 'TcxDBMemo'">
  <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" style="width:168px;" v-model="tdItem.inputValue" class="pull-right f-width" placeholder="请输入内容"> </el-input>
</template>
<template v-if="tdItem.ControlType == 'TFMDBLookupComboBox' && tdItem.optionList!=null && tdItem.optionList.length>
   0">
  <el-select v-model="tdItem.inputValue" value-key="tdItem.FieldName" clearable placeholder="请选择" style="width:168px;" class="pull-right f-width">
    <el-option v-for="option in tdItem.optionList" :key="option.ValueID" :label="option.ValueName" :value="option.ValueID">
    </el-option>
  </el-select>
</template>
                        <!-- 选地区 -->
                        <fRegion ref="fRegion" :localUrlString="localUrlString" :returnValues="tdItem.SearchReturnFields"  :dataIndex="3" :fieldName="tdItem.FieldName" @getSonValue="getSonValue"  :fuid="tdItem.DataAssociateFUID"  v-if="tdItem.ControlType == 'TFMDBFilterLookup' && tdItem.DataStyleType == 'lkpCities'"></fRegion>
                        <fLookupCode ref="fLookupCode" :localUrlString="localUrlString" :titleValue="tdItem.FieldCaption" :dataIndex="3" :fieldName="tdItem.FieldName" @getSonValue="getSonValue"  :fuid="tdItem.DataAssociateFUID"  v-if="tdItem.ControlType == 'TFMDBFilterLookup' 
                                                    && tdItem.DataStyleType != 'lkpCities' && tdItem.DataStyleType != 'lkpUsers'" ></fLookupCode>
                        <!-- 选择人员 -->
                        <fEmployee :inputValue="tdItem.inputValue" :dataIndex="3" :localUrlString="localUrlString" :fieldName="tdItem.FieldName" @getSonValue="getSonValue"  v-if="tdItem.ControlType == 'TFMDBFilterLookup' && tdItem.DataStyleType == 'lkpUsers'"></fEmployee>
                    </td>
                </tr>
            </table>
        </el-form>
    </div>
</template>

<script>
import FDatetime from "@/basecomponents/Widget/FDatetime";
import FDorpdownList from "@/basecomponents/Widget/FDorpdownList";
import FEmployee from "@/basecomponents/Widget/FEmployee";
import FLookupCode from "@/basecomponents/Widget/FLookupCode";
import FRegion from "@/basecomponents/Widget/FRegion";
import { getCookie, setCookie } from "@/libs/utils.js";
export default {
  name: "FastAddCustomer",
  props: [],
  data() {
    return {
      fastAddCustomerLoading: true,
      showFieldListOne: [],
      showFieldListTwo: [],
      showFieldListThree: [],
      hideFieldList: [],
      gutterOne: 8,
      isShow: false,
      labelPosition: "left",
      formLabelWidth: "120px",
      cityList: [], //[{id:1,label: '一级 1',children: [{id:11,label: '一级 1-1'}]},{id:2,label: '二级 1'}]
      defaultMailAddress: "",
      defaultFullName: "",
      localUrlString: "",
      rocketreach_id:0,
      empId:''
    };
  },
  created() {
    let _this = this;
    _this.localUrlString= getCookie("apiUrlString");
  },
  methods: {
   getbackData()
   {
   
   },
    getSonValue(
      index,
      fieldName,
      value,
      displayValue,
      valueField,
      displayField,
      returnValue,
      returnField
    ) {
      if (returnValue == undefined || returnValue == null) {
        returnValue = "";
      }
      if (returnField == undefined || returnField == null) {
        returnField = "";
      }
      if (index == 1) {
        this.showFieldListOne.forEach(function(element) {
          element.forEach(function(subElement) {
            if (subElement.FieldName == fieldName) {
              subElement.inputValue = value;
              //将附加返回的值返回
              if (
                subElement.SearchReturnFields != null &&
                subElement.SearchReturnFields != ""
              ) {
                var needValueList = subElement.SearchReturnFields
                  .trim(";")
                  .split(";");
                if (needValueList != null && needValueList.length > 0) {
                  this.showFieldListOne.forEach(function(tempElement) {
                    //搜索所有的列栏位，如果和附加返回的栏位相同，则返回附加返回的值
                    tempElement.forEach(function(tempOne) {
                      needValueList.forEach(function(val) {
                        var tempList = val.split("=");
                        if (tempList != null && tempList.length > 0) {
                          if (tempOne.FieldName == tempList[0]) {
                            if (tempList[1] == valueField) {
                              //本栏位保存的值
                              tempOne.inputValue = value;
                            } else if (tempList[1] == displayField) {
                              //本栏位显示的值
                              tempOne.inputValue = displayValue;
                            } else if (tempList[1] == returnField) {
                              //附加返回的值
                              tempOne.inputValue = returnValue;
                            }
                          }
                        }
                      }, this);
                    }, this);
                  });
                }
              }
            }
          }, this);
        }, this);
      } else if (index == 2) {
        this.showFieldListTwo.forEach(function(element) {
          element.forEach(function(subElement) {
            if (subElement.FieldName == fieldName) {
              subElement.inputValue = value;
              //将附加返回的值返回
              if (
                subElement.SearchReturnFields != null &&
                subElement.SearchReturnFields != ""
              ) {
                var needValueList = subElement.SearchReturnFields
                  .trim(";")
                  .split(";");
                if (needValueList != null && needValueList.length > 0) {
                  this.showFieldListOne.forEach(function(tempElement) {
                    //搜索所有的列栏位，如果和附加返回的栏位相同，则返回附加返回的值
                    tempElement.forEach(function(tempOne) {
                      needValueList.forEach(function(val) {
                        var tempList = val.split("=");
                        if (tempList != null && tempList.length > 0) {
                          if (tempOne.FieldName == tempList[0]) {
                            if (tempList[1] == valueField) {
                              //本栏位保存的值
                              tempOne.inputValue = value;
                            } else if (tempList[1] == displayField) {
                              //本栏位显示的值
                              tempOne.inputValue = displayValue;
                            } else if (tempList[1] == returnField) {
                              //附加返回的值
                              tempOne.inputValue = returnValue;
                            }
                          }
                        }
                      }, this);
                    }, this);
                  });
                }
              }
            }
          }, this);
        }, this);
      } else if (index == 3) {
        this.showFieldListThree.forEach(function(element) {
          element.forEach(function(subElement) {
            if (subElement.FieldName == fieldName) {
              subElement.inputValue = value;
              //将附加返回的值返回
              if (
                subElement.SearchReturnFields != null &&
                subElement.SearchReturnFields != ""
              ) {
                var needValueList = subElement.SearchReturnFields
                  .trim(";")
                  .split(";");
                if (needValueList != null && needValueList.length > 0) {
                  this.showFieldListOne.forEach(function(tempElement) {
                    //搜索所有的列栏位，如果和附加返回的栏位相同，则返回附加返回的值
                    tempElement.forEach(function(tempOne) {
                      needValueList.forEach(function(val) {
                        var tempList = val.split("=");
                        if (tempList != null && tempList.length > 0) {
                          if (tempOne.FieldName == tempList[0]) {
                            if (tempList[1] == valueField) {
                              //本栏位保存的值
                              tempOne.inputValue = value;
                            } else if (tempList[1] == displayField) {
                              //本栏位显示的值
                              tempOne.inputValue = displayValue;
                            } else if (tempList[1] == returnField) {
                              //附加返回的值
                              tempOne.inputValue = returnValue;
                            }
                          }
                        }
                      }, this);
                    }, this);
                  });
                }
              }
            }
          }, this);
        }, this);
      }
    },
    saveData() {
      var saveDataList = new Array();
      this.showFieldListOne.forEach(function(element) {
        element.forEach(function(subElement) {
          saveDataList.push(subElement);
        }, this);
      }, this);
      this.showFieldListTwo.forEach(function(element) {
        element.forEach(function(subElement) {
          saveDataList.push(subElement);
        }, this);
      }, this);
      this.showFieldListThree.forEach(function(element) {
        element.forEach(function(subElement) {
          saveDataList.push(subElement);
        }, this);
      }, this);
      this.hideFieldList.forEach(function(element) {
        saveDataList.push(element);
      }, this);
      //判断是否为空
      var isEmpty = false;
      saveDataList.every(function(element) {
        if (
          (element.IsNotNull == 1 || element.IsNotNull) &&
          (element.inputValue == null || element.inputValue == "")
        ) {
          this.$message({
            message: element.FieldCaption + "不能为空！",
            type: "warning"
          });
          isEmpty = true;
          return false;
        } else {
          return true;
        }
      }, this);
      if (isEmpty) {
        return;
      }
      //console.log(saveDataList);
      this.$http
        .post(
          this.localUrlString +
            this.Global.api.FastAddCustomer.saveCustomerData,
          saveDataList
        )
        .then(
          function(res) {
            var result = JSON.parse(res.body);
            if (result.status != null && result.status == "S") {
              this.$message({
                showClose: true,
                message: "save success",
                type: "success",
                duration:5000
              });
               this.$emit("closePage"); //关闭页面
            } else if (
              result.status != null &&
              result.status == "E" &&
              result.message != ""
            ) {
              this.$message({
                showClose: true,
                message: result.message,
                type: "error",
                duration: 5000
              });
            }
          },
          function(res) {
            //this.$message.error(res.body.msg);
          }
        );
    },
 getnowDate() {
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month =
        nowDate.getMonth() + 1 < 10
          ? "0" + (nowDate.getMonth() + 1)
          : nowDate.getMonth() + 1;
      var day =
        nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
      var dateStr = year + "-" + month + "-" + day;
      return dateStr;
    },

    getFieldList() {
      let _this = this;
      this.fastAddCustomerLoading = true;
      this.$http
        .get(
          _this.localUrlString + this.Global.api.FastAddCustomer.getFieldList,
          {
            params: {
              mouldId: "BF001",
              empId: this.empId
            }
          }
        )
        .then(
          function(res) {
            if (res.body) {
              var result = JSON.parse(res.body);
              if (result.status != null && result.status == "S") {
                //分不同的类别
                result.DataList.forEach(function(element) {
                  element.optionList = new Array();
                  element.optionList.push({
                    ValueID: "",
                    ValueName: ""
                  });

                 element.inputValue = "";
                 if (
                    element.DefaultValue != null &&
                    element.DefaultValue != ""
                  ) {
                    if (element.DefaultValue == "[df_date]") {
                      element.inputValue = this.getnowDate();
                    } else if (element.DefaultValue == "[df_EmpID]") {
                      element.inputValue = this.empId;
                    } else {
                      if (element.DefaultValue.indexOf("{") > -1) {
                        this.$http
                          .get(
                            this.localUrlString +
                              this.Global.api.FastAddCustomer
                                .getFieldDefaultValue,
                            {
                              params: {
                                fieldname: element.FieldName
                              }
                            }
                          )
                          .then(
                            function(res) {
                              //console.log(res);
                              if (res.body != "") {
                                var returndata = JSON.parse(res.body);
                                if (
                                  returndata.status != "E" &&
                                  returndata.status != null
                                ) {
                                    element.inputValue = returndata.resultString;
                                    element.DefaultValue=returndata.resultString;
                                } else {
                                  element.inputValue = "";
                                }
                              } else {
                                element.inputValue = "";
                              }
                            },
                            function(res) {}
                          );
                      } else {
                        element.inputValue = element.DefaultValue;
                      }
                    }
                  } else {
                    element.inputValue = "";
                  }

                  if (
                    element.IsShow &&
                    element.ControlType != null &&
                    element.ControlType != ""
                  ) {
                    if (element.SQLNo == 1) {
                      this.showFieldListOne.push(element);
                    } else if (element.SQLNo == 2) {
                      this.showFieldListTwo.push(element);
                    } else if (element.SQLNo == 3) {
                      this.showFieldListThree.push(element);
                    }
                  } else {
                    this.hideFieldList.push(element);
                  }
                }, this);

                //客户信息
                var tempOne = this.showFieldListOne;
                this.showFieldListOne = [];
                var groupTemp = [];
                for (var i = 0; i < tempOne.length; i++) {
                  groupTemp.push(tempOne[i]);
                  if (i % 3 == 2) {
                    this.showFieldListOne.push(groupTemp);
                    groupTemp = [];
                  } else if (i + 1 == tempOne.length) {
                    this.showFieldListOne.push(groupTemp);
                  }
                }

                //客户联系人
                var tempTwo = this.showFieldListTwo;
                this.showFieldListTwo = [];
                var groupTemp = [];
                for (var i = 0; i < tempTwo.length; i++) {
                  groupTemp.push(tempTwo[i]);
                  if (i % 3 == 2) {
                    this.showFieldListTwo.push(groupTemp);
                    groupTemp = [];
                  } else if (i + 1 == tempTwo.length) {
                    this.showFieldListTwo.push(groupTemp);
                  }
                }
                //客户联系人邮件地址
                var tempThree = this.showFieldListThree;
                this.showFieldListThree = [];
                var groupTemp = [];
                for (var i = 0; i < tempThree.length; i++) {
                  groupTemp.push(tempThree[i]);
                  if (i % 3 == 2) {
                    this.showFieldListThree.push(groupTemp);
                    groupTemp = [];
                  } else if (i + 1 == tempThree.length) {
                    this.showFieldListThree.push(groupTemp);
                  }
                }
                //加载数据
                this.showFieldListOne.forEach(function(element) {
                  element.forEach(function(subElement) {
                    if (
                      subElement.DataAssociateFUID != null &&
                      subElement.DataAssociateFUID != null
                    ) {
                      //下拉
                      if (subElement.ControlType == "TFMDBLookupComboBox") {
                        this.loadDropDownListData(subElement.DataAssociateFUID);
                      } else if (
                        subElement.ControlType == "TFMDBFilterLookup" &&
                        subElement.DataStyleType == "lkpCities"
                      ) {
                        //城市国家
                        // this.loadCity(subElement.DataAssociateFUID);
                      }
                    }
                    //
                  }, this);
                }, this);
                //Two
                this.showFieldListTwo.forEach(function(element) {
                  element.forEach(function(subElement) {
                    if (
                      subElement.DataAssociateFUID != null &&
                      subElement.DataAssociateFUID != null
                    ) {
                      //下拉
                      if (subElement.ControlType == "TFMDBLookupComboBox") {
                        this.loadDropDownListData(subElement.DataAssociateFUID);
                      } else if (
                        subElement.ControlType == "TFMDBFilterLookup" &&
                        subElement.DataStyleType == "lkpCities"
                      ) {
                        //城市国家
                        // this.loadCity(subElement.DataAssociateFUID);
                      }
                    }
                    //电话
                    if (subElement.FieldName == "FullName") {
                      subElement.inputValue = this.defaultFullName;
                    }
                  }, this);
                }, this);
                //three
                this.showFieldListThree.forEach(function(element) {
                  element.forEach(function(subElement) {
                    if (
                      subElement.DataAssociateFUID != null &&
                      subElement.DataAssociateFUID != null
                    ) {
                      //下拉
                      if (subElement.ControlType == "TFMDBLookupComboBox") {
                        this.loadDropDownListData(subElement.DataAssociateFUID);
                      } else if (
                        subElement.ControlType == "TFMDBFilterLookup" &&
                        subElement.DataStyleType == "lkpCities"
                      ) {
                        //城市国家
                        // this.loadCity(subElement.DataAssociateFUID);
                      }
                    }
                    //如果是邮件地址，则给默认值
                    if (subElement.FieldName == "MailAddress") {
                      subElement.inputValue = this.defaultMailAddress;
                    }
                  }, this);
                }, this);
                this.fastAddCustomerLoading = false;
              } else if (result.status != null && result.status == "E") {
                console.log(result.message);
                this.fastAddCustomerLoading = false;
              }
            }
          },
          function(res) {
            console.log(res.body);
            this.$message({
              message: res.body,
              type: "warning"
            });
            // this.isShow = false;
          }
        );
    },
    showCustDialog(mailAddress, fullName) {
      //this.isShow = true;
      this.showFieldListOne = [];
      this.showFieldListTwo = [];
      this.showFieldListThree = [];
      this.hideFieldList = [];
      this.defaultMailAddress = mailAddress;
      this.defaultFullName = fullName;
      this.getFieldList();
    },
    closeCustDialog() {
      this.isShow = false;
      // this.fieldList = [];
    },
    loadDropDownListData(dataAssociateFUID) {
      this.$http
        .get(
          this.localUrlString +
            this.Global.api.FastAddCustomer.getDropDownListData,
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
                //one
                this.showFieldListOne.forEach(function(element) {
                  element.forEach(function(subElement) {
                    if (subElement.DataAssociateFUID == dataAssociateFUID) {
                      subElement.optionList = result.DataList;
                    }
                  }, this);
                }, this);
                //two
                this.showFieldListTwo.forEach(function(element) {
                  element.forEach(function(subElement) {
                    if (subElement.DataAssociateFUID == dataAssociateFUID) {
                      subElement.optionList = result.DataList;
                      subElement.inputValue = "";
                    }
                  }, this);
                }, this);
                //three
                this.showFieldListThree.forEach(function(element) {
                  element.forEach(function(subElement) {
                    if (subElement.DataAssociateFUID == dataAssociateFUID) {
                      subElement.optionList = result.DataList;
                      subElement.inputValue = "";
                    }
                  }, this);
                }, this);
                // return result.DataList;
              }
            }
          },
          function(res) {}
        );
    },
    loadCity(dataAssociateFUID) {
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
                console.log("city");
                console.log(result.DataList);
                this.showFieldListOne.forEach(function(element) {
                  element.forEach(function(subElement) {
                    if (subElement.DataAssociateFUID == dataAssociateFUID) {
                      console.log(this.cityList.length);
                      result.DataList.forEach(function(element) {
                        //几大洲
                        if (element.ParGID == 0) {
                          this.cityList.push({
                            id: element.FID,
                            label: element.CityName,
                            children: this.recursionCity(
                              element.FID,
                              result.DataList
                            )
                          });
                        }
                      }, this);
                      console.log(this.cityList.length);
                    }
                  }, this);
                }, this);
                // return result.DataList;
              }
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
            id: element.FID,
            label: element.CityName,
            children: this.recursionCity(element.FID, tempDataList)
          });
        }
      }, this);
      return tempList;
    }
  },
  components: {
    fDatetime: FDatetime,
    fDorpdownList: FDorpdownList,
    fEmployee: FEmployee,
    fLookupCode: FLookupCode,
    fRegion: FRegion
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./zh-cn.less";
</style>
