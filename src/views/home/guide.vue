<template>
    <el-row>
        <el-col :span="24" class="tool-bar">
            <p class="title fl">指南列表</p>
            <!-- <el-input placeholder="搜索用户手机号／用户名" class="fr"></el-input> -->
        </el-col>
        <el-col :span="24">
            <el-table :data="list" highlight-current-row v-loading="loading" border style="width: 100%;height: 90%;">
                <el-table-column prop="index" label="排序" width="80"></el-table-column>
                <el-table-column prop="entryApplyId" label="ID" width="80"></el-table-column>
                <el-table-column prop="userName" label="标题" min-width="180"></el-table-column>
                <el-table-column prop="mobile" label="网址" min-width="180"></el-table-column>
                <el-table-column prop="wechat" label="来源" width="100"></el-table-column>
                <el-table-column prop="note" label="类型" width="100"></el-table-column>
                <el-table-column prop="note" label="状态" width="120"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editType(scope.row)">编辑</el-button>
                        <el-button type="success" size="mini" @click="relation(scope.row.entryApplyId)">关联商品</el-button>
                        <el-button type="danger" size="mini" @click="deleteType(scope.row.entryApplyId)">删除</el-button>
                    </template>
                </el-table-column>
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
        },
        relation(id) {

        },
    },
    mounted() {
        this.getEnterApplyList();
    }
}
</script>

<style scoped>
.tool-bar{
    line-height: 36px;
    margin-bottom: 15px;
}
</style>
