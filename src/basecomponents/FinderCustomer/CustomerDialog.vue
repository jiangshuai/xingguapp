<template>
    <div>
        <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
        <el-dialog title="客户" top="0" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <div class="M_unknown_customer" v-if="form.firstShow">
                    <p><span class="C6"><em>"{{form.mailDisaplayName}}"</em>&lt;{{form.mailAddress}}&gt;</span><br>是一个陌生客户，<br>抓住机会。<br>立即“新建客户信息” </p>
                    <div class="newButton">
                        <el-button type="primary" @click="showNewCustomerInputPage()">新建客户信息</el-button>
                     <!--    <el-button type="primary" @click="showNewSupplierInputPage()">新建供应商</el-button> -->
                       <!--  <el-button type="primary">新增现有客户联系人</el-button> -->
                    </div>
                </div>
                <div v-if="form.newCustShow">
                    <!--   <el-row justify="start">
                            <el-col :span="12"><div class="grid-content">
                                <el-form-item label="活动名称" :label-width="formLabelWidth">
                                    <el-input v-model="form.name" auto-complete="off"></el-input>
                                </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12"><div class="grid-content">
                                <el-form-item label="活动名称" :label-width="formLabelWidth">
                                    <el-input v-model="form.name" auto-complete="off"></el-input>
                                </el-form-item>
                                </div>
                            </el-col>
                        </el-row> -->
                    <!--   <el-row type="flex" class="row-bg" justify="start">
                            <el-col :span="12"><div class="grid-content bg-purple-light ">
                                <el-form-item label="业务类别" :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12"><div class="grid-content bg-purple-light">
                                <el-form-item label="客户简称" :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                    </el-form-item></div>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg" justify="start">
                            <el-col :span="12"><div class="grid-content bg-purple-light ">
                                <el-form-item label="客户全称" :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12"><div class="grid-content bg-purple-light">
                                <el-form-item label="客户英文名" :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                    </el-form-item></div>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg" justify="start">
                            <el-col :span="12"><div class="grid-content bg-purple-light ">
                                <el-form-item label="地址" :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12"><div class="grid-content bg-purple-light">
                                <el-form-item label="电话" :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                    </el-form-item></div>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg" justify="start">
                            <el-col :span="12"><div class="grid-content bg-purple-light ">
                                <el-form-item label="传真" :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12"><div class="grid-content bg-purple-light">
                                <el-form-item label="备注" :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                    </el-form-item></div>
                            </el-col>
                        </el-row> -->
                </div>
            </el-form>
            <fastAddCustomer  ref="fastAddCustomer" @closePage="closePage"></fastAddCustomer>
            <!--  <el-form  :model="form" v-if="form.newCustShow"  :label-position="labelPosition"  >
                    <table>
                        <tr class="titleClass"><td colspan="4"><div>客户信息</div></td></tr>
                        <tr>
                            <td>
                                <el-row :gutter="20">
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="业务类别"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item>
                                        </div>
                                    </el-col>
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="客户简称"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                     <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="客户全称"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                </el-row>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-row :gutter="20">
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="客户英文名"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="地址"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                     <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="电话"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                </el-row>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-row :gutter="10">
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="传真"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="备注"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                      
                                </el-row>
                            </td>
                        </tr>
                        <tr class="titleClass"><td colspan="4"><div>客户联系人</div></td></tr>
                        <tr>
                            <td>
                                <el-row :gutter="20">
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="名字"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="称谓"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                     <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="电话"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                </el-row>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-row :gutter="20">
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="手机"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="传真"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                     <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="邮件地址"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                </el-row>
                            </td>
                        </tr>
                    </table>
                </el-form>
                <el-form  :model="form" v-if="form.newSupplierShow"  :label-position="labelPosition"  >
                        <table>
                        <tr class="titleClass"><td colspan="4"><div>供应商信息</div></td></tr>
                        <tr>
                            <td>
                                <el-row :gutter="20">
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="业务类别"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="供应商简称"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                     <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="供应商全称"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                </el-row>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-row :gutter="20">
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="供应商英文名"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="地址"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                     <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="电话"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                </el-row>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-row :gutter="10">
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="传真"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="备注"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                      
                                </el-row>
                            </td>
                        </tr>
                        <tr class="titleClass"><td colspan="4"><div>联系人</div></td></tr>
                        <tr>
                            <td>
                                <el-row :gutter="20">
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="名字"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="称谓"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                     <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="电话"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                </el-row>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-row :gutter="20">
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="手机"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                    <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="传真"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                     <el-col :span="8"><div class="grid-content  ">
                                        <el-form-item label="邮件地址"   :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item></div>
                                    </el-col>
                                </el-row>
                            </td>
                        </tr>
                    </table>
                </el-form> -->
            <div slot="footer" class="dialog-footer" v-if="buttonVisible">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveData()">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
    import FastAddCustomer from "@/basecomponents/FinderCustomer/FastAddCustomer";
    export default {
        name:"CustomerDialog",
        props: [],
        data() {
            return {
                dialogTableVisible: false,
                dialogFormVisible: false,
                labelPosition: "left",
                form: {
                    mailDisaplayName: "",
                    mailAddress: "",
                    firstShow: false,
                    newCustShow: false,
                    newSupplierShow: false,
                    phone:""
                },
                formLabelWidth: "120px",
                buttonVisible:false
            };
        },
        methods: {
            saveData(){
              //  this.dialogFormVisible = false;
                this.$refs.fastAddCustomer.saveData();
            },
            showCustDialog() {
                this.dialogFormVisible = true;
            },
            initData(name, address,phone) {
                this.form.mailDisaplayName = name;
                this.form.mailAddress = address;
                this.form.phone = phone;
            },
            //显示新建客户页面
            showNewCustomerInputPage() {
                this.form.firstShow = false;
                this.buttonVisible = true;
                this.$refs.fastAddCustomer.showCustDialog(this.form.mailAddress,this.form.phone);
            },
            //显示新建供应商页面
            showNewSupplierInputPage() {
                this.form.firstShow = false;
                this.form.newSupplierShow = true;
            },
            closePage() {
                this.dialogFormVisible = false;
                this.form.firstShow = true;
                this.form.mailDisaplayName = "";
                this.form.mailAddress = "";
                 this.buttonVisible = false;
                if (this.$refs.fastAddCustomer != null) {
                    this.$refs.fastAddCustomer.closeCustDialog();
                }
                this.form.newSupplierShow = false;
            }
        },
        components: {
            fastAddCustomer: FastAddCustomer
        }
        /*   computed: {
          isShow: function() {
            this.dialogFormVisible = this.isShow;
          }
        } */
    };
</script>

<style lang="less" rel="stylesheet/less">
    @import "./zh-cn.less";
</style>
