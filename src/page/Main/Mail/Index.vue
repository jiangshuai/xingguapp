<template>
    <div>
        <el-button @click="showMail()">快速添加</el-button>
         <el-button @click="showSer()">高级设置</el-button>
        <el-dialog title="添加邮箱账号" top="0" size="small" style="width:1000px" :visible.sync="fastDialogFormVisible">
            <el-form :label-position="labelPosition">
                <table class="tableClass">
                    <tr>
                       <td class="text-center">
                            <span class="tdTitle">邮箱账号:</span>
                            <template>
                                    <el-input placeholder="请输入邮箱账号"  class="pull-right f-width">
                                    </el-input>
                             </template>
                    </td>
                   
                </tr>
                <tr>
                     <td class="text-center">
                        <span class="tdTitle">邮箱密码:</span>
                <template>
                    <el-input placeholder="请输入邮箱密码" class="pull-right f-width">
                    </el-input>
                </template>
                 </td>
                </tr>
                <tr>
                    <td class="text-center">
                        正在验证邮箱服务器..
                    </td>
                </tr>
                <tr>
                    <td class="text-center">
                         <el-button type="primary">立即保存</el-button> 
                         <el-button type="text">高级设置</el-button>  
                    </td>
                </tr>
                <tr>
                    <td class="text-center">
                        {{errorMessage}}
                    </td>
                </tr>
            </table>
        </el-form>
        </el-dialog>

        <el-dialog title="添加邮箱账号" top="0" size="small"  :visible.sync="serDialogVisible">
            <el-form :label-position="labelPosition">
                <table class="tableClass">
                    <tr class="titleClass">
                        <td colspan="8">
                            <div>基本信息</div>
                        </td>
                    </tr>
                    <tr>
                        <td>邮箱账户:</td>
                        <td colspan="3">
                             <el-input placeholder="请输入内容" class="pull-right f-width"></el-input>
                        </td>
                        <td>账户类型:</td>
                        <td colspan="3">
                             <el-select  clearable placeholder="请选择" v-model="accountType" class="pull-right f-width">
                                      <el-option
                                    v-for="item in accountTypeOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option> 
                             </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>邮箱密码:</td>
                        <td colspan="3">
                             <el-input placeholder="请输入内容" class="pull-right f-width"></el-input>
                        </td>
                        <td>拥有人:</td>
                        <td colspan="3">
                            <el-input placeholder="请输入内容"   class="pull-right f-width"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>显示名字:</td>
                        <td colspan="3">
                             <el-input placeholder="请输入内容" class="pull-right f-width"></el-input>
                        </td>
                        <td>回复地址:</td>
                        <td colspan="3">
                            <el-input placeholder="请输入内容"   class="pull-right f-width"></el-input>
                        </td>
                    </tr>
                     <tr>
                        <td>邮箱协议:</td>
                        <td colspan="3">
                             <el-select  clearable placeholder="请选择" v-model="mailboxProtocol">
                                    <el-option
                                    v-for="item in mailboxProtocolOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>  
                                </el-select>
                        </td>
                        <td></td>
                        <td colspan="3">
                           
                        </td>
                    </tr>

                     <tr class="titleClass">
                        <td colspan="8">
                            <div>收信设置</div>
                        </td>
                    </tr>
                     <tr>
                        <td>接收账户:</td>
                        <td colspan="3">
                             <el-input placeholder="请输入内容" class="pull-right f-width"></el-input>
                        </td>
                        <td></td>
                        <td colspan="3">
                           
                        </td>
                    </tr>
                     <tr>
                        <td>允许接收:</td>
                        <td colspan="3">
                             
                        </td>
                        <td></td>
                        <td colspan="3">
                           
                        </td>
                    </tr>
                     <tr>
                        <td>保存邮件副本:</td>
                        <td colspan="7" >
                              <el-radio-group  v-model="copySaveradio">
                                <el-radio :label="0">永久保留</el-radio>
                                <el-radio :label="1">保留10天</el-radio>
                                <el-radio :label="2">保留30天</el-radio>
                                <el-radio :label="3">保留60天</el-radio>
                                <el-radio :label="4">不保留副本</el-radio>
                              </el-radio-group>
                        </td>
                    </tr>


                    <tr class="titleClass">
                        <td colspan="8">
                            <div>发信设置</div>
                        </td>
                    </tr>
                    <tr>
                        <td>发信认证:</td>
                        <td colspan="5">
                             <el-select  v-model="ESMTP" clearable placeholder="请选择" class="f-width">
                                     <el-option
                                    v-for="item in ESMTPOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option> 
                                </el-select>
                        </td>
                        <td></td>
                        <td colspan="1">
                           
                        </td>
                    </tr>
                    <tr>
                        <td>发送账号:</td>
                        <td colspan="3">
                             <el-input placeholder="请输入内容" class="pull-right f-width"></el-input>
                        </td>
                        <td>密码:</td>
                        <td colspan="3">
                            <el-input placeholder="请输入内容"   class="pull-right f-width"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>允许发送:</td>
                        <td colspan="3">
                             
                        </td>
                        <td></td>
                        <td colspan="3">
                           
                        </td>
                    </tr>


                    <tr class="titleClass">
                        <td>
                            <div>服务器</div>
                        </td>
                        <td colspan="7"><em style="font-size:6pt;">当前服务器参数取自平台的邮箱智库 </em><el-button type="text" size="mini" >修改设置</el-button></td>
                    </tr>
                     <tr>
                        <td>收信服务器:</td>
                        <td colspan="3">
                             <el-input placeholder="请输入内容" class="pull-right f-width"></el-input>
                        </td>
                        <td>
                             <el-checkbox >SSL</el-checkbox>
                        </td>
                        <td>端口:</td>
                        <td colspan="2">
                            <el-input placeholder="请输入内容"   class="pull-right f-width"></el-input>
                        </td>
                    </tr>
                     <tr>
                        <td>SMTP服务器:</td>
                        <td colspan="3">
                             <el-input placeholder="请输入内容" class="pull-right f-width"></el-input>
                        </td>
                        <td>
                             <el-checkbox >SSL</el-checkbox>
                        </td>
                        <td>端口:</td>
                        <td colspan="2">
                            <el-input placeholder="请输入内容"   class="pull-right f-width"></el-input>
                        </td>
                    </tr>
                     <tr>
                        <td colspan="8">  <el-checkbox >如果服务器支持就使用STARTTLS加密传输</el-checkbox></td>
                    </tr>
                    <tr>
                         <td class="text-center" colspan="8"><el-button type="primary" style="width:200px;" size="large" >保存</el-button><el-button type="text">返回到快速添加</el-button></td>
                    </tr>
                </table>
            </el-form>
        </el-dialog>
</div>
</template>

<script>
    export default {
        name: "Mail",
        data() {
            return {
                labelPosition: "left",
                fastDialogFormVisible: false,
                errorMessage:"错误信息sssssssssssssssssssssssssssssss",
                serDialogVisible:false,
                copySaveradio: 0,
                accountType:0,
                accountTypeOption:[{"label":"个人","value":0},{"label":"公共","value":1}],
                mailboxProtocol:"POP",
                mailboxProtocolOption:[{"label":"POP","value":"POP"},{"label":"IMAP","value":"IMAP"}],
                ESMTP:0,
                ESMTPOption:[{"label":"发信账户密码与收件相同（默认）","value":0},{"label":"指定发信账户","value":1}]
            };
        },
        created() {},
        methods: {
            showMail() {
                this.fastDialogFormVisible = true;
            },
            showSer(){
                this.serDialogVisible = true;
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../less/base.less";
    @import "./zh-cn.less";
</style>


