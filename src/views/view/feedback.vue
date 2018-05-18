<template>
    <el-row>
        <el-col :span="24" class="tool-bar">
            <p class="title fl">反馈列表</p>
            <el-input placeholder="搜索用户手机号／用户名" class="fr"></el-input>
        </el-col>
        <el-col :span="24">
            <el-table :data="list" highlight-current-row v-loading="loading" border style="width: 100%;height: 90%;">
                <el-table-column prop="id" label="编号" width="80"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="mobile" label="手机号" width="180"></el-table-column>
                <el-table-column prop="wx" label="微信号" width="180"></el-table-column>
                <el-table-column prop="service" label="经验产品/服务"></el-table-column>
            </el-table>
            <el-pagination @current-change="curChange" :current-page="curPage" 
                :page-size="20" :total="100" layout="total, prev, pager, next" class="page">
            </el-pagination>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {id: 1, name: '张三', mobile: '1233214244', wx: 'dsadasdasd', service: '本公司经验潮牌服饰，可以提供潮牌服饰，鞋帽，滑板等物品进行合作。'},
                {id: 2, name: '李四', mobile: '1233214244', wx: 'dsadasdasd', service: '本公司经验潮牌服饰，可以提供潮牌服饰，鞋帽，滑板等物品进行合作。'},
                {id: 3, name: '王五', mobile: '1233214244', wx: 'dsadasdasd', service: 'it品牌经销商'}
            ],
            curPage: 1,
            loading: false
        }
    },
    methods: {
        curChange() {

        }
    }
}
</script>

<style>
@import url(./../../../static/css/base.css);
@import url(./../../../static/css/home/feedback.css);
</style>
