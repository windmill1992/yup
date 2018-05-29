<template>
    <el-row>
        <el-col :span="24" class="tool-bar">
            <p class="title fl">反馈列表</p>
            <el-input placeholder="搜索用户手机号／用户名" class="fr"></el-input>
        </el-col>
        <el-col :span="24">
            <el-table :data="list" highlight-current-row v-loading="loading" border style="width: 100%;height: 90%;">
                <el-table-column prop="entryApplyId" label="编号" width="80"></el-table-column>
                <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
                <el-table-column prop="mobile" label="手机号" width="180"></el-table-column>
                <el-table-column prop="wechat" label="微信号" width="180"></el-table-column>
                <el-table-column prop="note" label="经验产品/服务"></el-table-column>
            </el-table>
            <el-pagination @current-change="curChange" :current-page="curPage" 
                :page-size="pageSize" :total="total" layout="total, prev, pager, next" class="page fr">
            </el-pagination>
        </el-col>
    </el-row>
</template>

<script>
import { baseUrl } from './../../api/baseUrl'

export default {
    data() {
        return {
            list: [],
            curPage: 1,
            pageSize: 20,
            total: 0,
            loading: false
        }
    },
    methods: {
        curChange(idx) {
            this.curPage = idx;
            this.getEnterApplyList();
        },
        getEnterApplyList() {
            this.loading = true;
            this.$http.get(`${baseUrl}/yup-rest/manage/enter-apply-list`, {
                params: {  pageIndex: this.curPage, pageSize: this.pageSize}
            })
            .then(res => {
                this.loading = false;
                if(res.data.resultCode == 200){
                    let r = res.data.resultData;
                    this.list = r.list;
                    this.total = r.total;
                }else{
                    this.$message({
                        message: res.data.resultMsg,
                        type: 'error',
                        duration: 0,
                        showClose: true
                    })
                }
            })
            .catch(() => {
                this.loading = false;
                this.$message.error('未知错误！');
            })
        }
    },
    mounted() {
        this.getEnterApplyList();
    }
}
</script>

<style>
@import url(./../../../static/css/base.css);
@import url(./../../../static/css/home/feedback.css);
</style>
