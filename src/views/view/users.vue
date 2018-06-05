<template>
    <el-row>
        <el-col :span="24" class="tool-bar">
            <p class="title fl">用户列表</p>
            <el-input placeholder="搜索用户手机号／用户名" class="fr"></el-input>
        </el-col>
        <el-col :span="24">
            <el-table :data="list" highlight-current-row v-loading="loading" border style="width: 100%;height: 90%;">
                <el-table-column type="index" label="#" width="60"></el-table-column>
                <el-table-column prop="userId" label="用户ID" width="80" show-overflow-tooltip></el-table-column>
                <el-table-column prop="userName" label="用户昵称" min-width="150" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="mobile" label="手机号" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="regisTime" label="注册时间" :formatter="formatTime" 
                    width="180" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="city" label="所在城市" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="vip" label="会员状态" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="from" label="用户来源" width="100" show-overflow-tooltip></el-table-column> -->
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <!-- <a href="javascript:;" class="icon icon-edit"></a> -->
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
var moment = require('moment');
import { baseUrl } from './../../api/baseUrl'

export default {
  data() {
    return {
      list: [],
      curPage: 1,
      pageSize: 20,
      total: 0,
      loading: false
    };
  },
  methods: {
    getUserList() {
        this.$http.post(`${baseUrl}/yup-rest/manage/user-list`, { pageIndex: this.curPage, pageSize: this.pageSize })
        .then(res => {
            if(res.data.resultCode == 200){
                let r = res.data.resultData;
                if(r){
                    this.list = r.list;
                    this.total = r.total;
                }
            }else{
                this.$message.error(res.data.resultMsg);
            }
        })
        .catch(() => {
            this.$message.error('未知错误！');
        })
    },
    curChange(idx) {
        this.curPage = idx;
    },
    formatTime(row, column){
        return moment(new Date(row.regisTime)).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  mounted() {
      this.getUserList();
  }
};
</script>

<style>
@import url(./../../assets/css/base.css);
.el-table th>.cell{
    white-space: nowrap;
}
.tool-bar {
  line-height: 36px;
  margin-bottom: 15px;
}
.icon{
    display: inline-block;
    margin-right: 10px;
    width: 18px;
    height: 18px;
    background: url(./../../assets/img/logo.png) no-repeat 0 0 / 100% 100%;
}
</style>
