<template>
    <div class="InvoiceManage">
        <div class="Box">
            <el-form :model="filterForm" :inline="true" label-width="70px">
                <el-form-item label="发票状态">
                    <el-radio-group v-model="filterForm.invoice">
                        <el-radio-button label="全部"></el-radio-button>
                        <el-radio-button label="已申请"></el-radio-button>
                        <el-radio-button label="已寄送"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="邮寄信息">
                    <el-radio-group v-model="filterForm.express">
                        <el-radio-button label="全部"></el-radio-button>
                        <el-radio-button label="顺丰寄送"></el-radio-button>
                        <el-radio-button label="顺丰到付"></el-radio-button>
                    </el-radio-group>
                </el-form-item>

           <router-link   to="/rechargeRecord"><el-button type="primary" style="margin-left:15px;">申请开票</el-button></router-link>
                
            </el-form>

            <el-table :data="tableData" height="350">                
                <el-table-column prop="num" label="发票单号" width="120">
                </el-table-column>
                <el-table-column prop="value" label="发票金额">
                </el-table-column>
                <el-table-column prop="title" label="发票抬头" width="180">
                </el-table-column>
                <el-table-column prop="date" label="申请时间" width="180">
                </el-table-column>
                <el-table-column prop="express" label="快递公司">
                </el-table-column>
                <el-table-column prop="trickNum" label="快递单号" width="150">
                </el-table-column>
                <el-table-column prop="invoice" label="发票状态" width="100">
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template scope="scope">
                        <el-button type="text" @click="showInvoceInfo()">详情</el-button>
                    </template>

                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 200, 500]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="3000">
                </el-pagination>
            </div>
        </div>

        <el-dialog title="发票详情" :visible.sync="isOpen" custom-class="width520">
            <table class="widthFull">
                <tr>
                    <td><span class="text-black">发票性质</span><span>纸质</span></td>
                    <td><span class="text-black">发票状态</span><span>已申请</span></td>
                </tr>
                <tr>
                    <td><span class="text-black">发票性质</span><span>增值税专用发票</span></td>
                    <td><span class="text-black">发票状态</span><span>已申请</span></td>
                </tr>
                <tr>
                    <td><span class="text-black">发票性质</span><span>纸质</span></td>
                    <td><span class="text-black">发票状态</span><span>深圳万科企业股份有限公司</span></td>
                </tr>
                <tr>
                    <td><span class="text-black">发票性质</span><span>纸质</span></td>
                    <td><span class="text-black">发票状态</span><span>已申请</span></td>
                </tr>
                <tr>
                    <td><span class="text-black">发票性质</span><span>纸质</span></td>
                    <td><span class="text-black">发票状态</span><span>已申请</span></td>
                </tr>
                <tr>
                    <td><span class="text-black">发票性质</span><span>纸质</span></td>
                    <td><span class="text-black">发票状态</span><span>已申请</span></td>
                </tr>
               
            </table>            
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "InvoiceManage",
    props: [],
    data() {
        return {
            filterForm: {
                invoice: '全部',
                express: '全部'
            },
            currentPage: 1,//当前页
            tableData: [
                {
                    num: '130556945',
                    value: '2000.00',
                    title: '孚盟软件有限公司',
                    date: '2017-11-17 01:12:13',
                    express: '顺丰寄送',
                    trickNum: '254562542568',
                    invoice: '已寄送'
                },
                {
                    num: '130556945',
                    value: '2000.00',
                    title: '孚盟软件有限公司',
                    date: '2017-11-17 01:12:13',
                    express: '顺丰寄送',
                    trickNum: '254562542568',
                    invoice: '已寄送'
                },
                {
                    num: '130556945',
                    value: '2000.00',
                    title: '孚盟软件有限公司',
                    date: '2017-11-17 01:12:13',
                    express: '顺丰寄送',
                    trickNum: '254562542568',
                    invoice: '已寄送'
                },
                {
                    num: '130556945',
                    value: '2000.00',
                    title: '孚盟软件有限公司',
                    date: '2017-11-17 01:12:13',
                    express: '顺丰寄送',
                    trickNum: '254562542568',
                    invoice: '已寄送'
                },
                {
                    num: '130556945',
                    value: '2000.00',
                    title: '孚盟软件有限公司',
                    date: '2017-11-17 01:12:13',
                    express: '顺丰寄送',
                    trickNum: '254562542568',
                    invoice: '已寄送'
                },
                {
                    num: '130556945',
                    value: '2000.00',
                    title: '孚盟软件有限公司',
                    date: '2017-11-17 01:12:13',
                    express: '顺丰寄送',
                    trickNum: '254562542568',
                    invoice: '已寄送'
                },
                {
                    num: '130556945',
                    value: '2000.00',
                    title: '孚盟软件有限公司',
                    date: '2017-11-17 01:12:13',
                    express: '顺丰寄送',
                    trickNum: '254562542568',
                    invoice: '已寄送'
                },
                {
                    num: '130556945',
                    value: '2000.00',
                    title: '孚盟软件有限公司',
                    date: '2017-11-17 01:12:13',
                    express: '顺丰寄送',
                    trickNum: '254562542568',
                    invoice: '已寄送'
                },
            ],
            isOpen:false,
        };
    },
    created() {

    },
    mounted() {

    },
    computed: {},
    methods: {

        showInvoceInfo()
        {

         this.isOpen=true;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        //表格合计
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] += ' 元';
                } else {
                    sums[index] = ' - ';
                }
            });

            return sums;
        }
    },
    components: {}
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./zh-cn.less";
</style>