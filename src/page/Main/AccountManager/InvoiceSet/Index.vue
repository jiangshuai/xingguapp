<template>
    <div class="InvoiceSet">
        <div class="Box">
            <el-row :gutter="15">
                <el-col :span="8">
                    <ul>
                        <div class="btns">
                            <el-button type="text">编辑</el-button>
                            <el-button type="text" class="text-red">删除</el-button>
                        </div>
                        <li>
                            <span class="pull-right">
                                <el-button size="small">设为默认</el-button>
                            </span>
                            <span class="name">深圳万科企业股份有限公司</span>
                        </li>
                        <li>增值税普通发票</li>
                    </ul>
                </el-col>
                <el-col :span="8">
                    <ul>
                        <div class="btns">
                            <el-button type="text">编辑</el-button>
                            <el-button type="text" class="text-red">删除</el-button>
                        </div>
                        <li>
                            <span class="pull-right">
                                <el-button type="info" size="small">默认</el-button>
                            </span>
                            <span class="name">深圳万科企业股份有限公司</span>
                        </li>
                        <li>增值税普通发票</li>
                    </ul>
                </el-col>
                <el-col :span="8">
                    <ul>
                        <div class="btns">
                            <el-button type="text">编辑</el-button>
                            <el-button type="text" class="text-red">删除</el-button>
                        </div>
                        <li>
                            <span class="pull-right">
                                <el-button size="small">设为默认</el-button>
                            </span>
                            <span class="name">深圳万科企业股份有限公司</span>
                        </li>
                        <li>增值税普通发票</li>
                    </ul>
                </el-col>
                <el-col :span="8">
                    <ul>
                        <div class="addInvoice">
                            <el-button type="text" @click="isOpenAdd=true">
                                <i class="iconfont el-icon-plus"></i>
                                新增发票信息
                            </el-button>
                        </div>
                    </ul>
                </el-col>
            </el-row>
        </div>

        <el-dialog title="新增发票信息" :visible.sync="isOpenAdd" custom-class="width520" @close="resetForm('addForm')">
            <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="90px">

                <el-form-item label="开具类型" prop="type">
                    <el-radio-group v-model="addForm.type">
                        <el-radio :label="1">个人</el-radio>
                        <el-radio :label="2">企业</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="发票抬头" prop="company">
                    <el-input v-model="addForm.company" placeholder="请输入发票抬头"></el-input>
                </el-form-item>
                <el-form-item label="发票类型" prop="invoiceType">
                    <el-radio-group v-model="addForm.invoiceType">
                        <el-radio :label="1">增值税普通发票</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="身份证号" prop="ID">
                    <el-input v-model="addForm.ID" placeholder="如果您无个人税号，请填写身份证号"></el-input>
                </el-form-item>
                <div class="input_notice">请与贵公司财务人员核实并填写准确的税务登记证号，以免影响您发票后续的使用</div>

                <el-form-item label="收件人姓名" prop="name">
                    <el-input v-model="addForm.name" placeholder="请输入收件人姓名"></el-input>
                </el-form-item>

                <el-form-item label="所在地区">
                    <el-select v-model="addForm.province" placeholder="请选择" style="width:110px;">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <el-select v-model="addForm.city" placeholder="请选择" style="width:110px;">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <el-select v-model="addForm.town" placeholder="请选择" style="width:110px;">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="街道地址" prop="address">
                    <el-input v-model="addForm.address" placeholder="请输入街道地址"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码" prop="postalCode">
                    <el-input v-model="addForm.postalCode" placeholder="请输入邮政编码"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="addForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="" prop="">
                    <el-checkbox-group v-model="addForm.isDefault">
                        <el-checkbox label="设为默认" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <div class="text-center">
                    <el-button type="primary" @click="submit('addForm')" style="width:123px;">确定</el-button>
                    <el-button @click="isOpenAdd=false" style="width:123px;">取消</el-button>
                </div>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "InvoiceSet",
    props: [],
    data() {
        return {
            isOpenAdd: false,
            addForm: {
                type: 1,
                company: '',
                invoiceType: 1,
                ID: '',
                name: '',
                province: '',
                city: '',
                town: '',
                address: '',
                postalCode: '',
                mobile: '',
                isDefault: true
            },
            addFormRules: {
                company: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                ],
            }

        };
    },
    created() {

    },
    mounted() {

    },
    computed: {},
    methods: {
        //表单提交
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //清空表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    components: {}
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./zh-cn.less";
</style>