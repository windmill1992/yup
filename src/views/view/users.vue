<template>
    <el-row>
        <el-col :span="24" class="tool-bar">
            <p class="title fl">反馈列表</p>
            <el-input placeholder="搜索用户手机号／用户名" class="fr"></el-input>
        </el-col>
        <el-col :span="24">
            <el-table :data="list" highlight-current-row v-loading="loading" border style="width: 100%;height: 90%;">
                <el-table-column prop="id" label="用户ID" width="80" show-overflow-tooltip></el-table-column>
                <el-table-column prop="nick" label="用户昵称" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="mobile" label="手机号" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="regisTime" label="注册时间" :formatter="formatTime" 
                    width="180" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="city" label="所在城市" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="vip" label="会员状态" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="from" label="用户来源" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <a href="javascript:;" class="icon icon-edit"></a>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="curChange" :current-page="curPage" 
                :page-size="20" :total="100" layout="total, prev, pager, next" class="page">
            </el-pagination>
        </el-col>
    </el-row>
</template>

<script>
var moment = require('moment');
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          nick: "张三",
          mobile: "1233214244",
          regisTime: 1526798145964,
          city: "杭州",
          vip: '0',
          from: 'wx'
        },
        {
          id: 2,
          nick: "张三",
          mobile: "1233214244",
          regisTime: 1526798145964,
          city: "杭州",
          vip: '0',
          from: 'wx'
        },
        {
          id: 3,
          nick: "张三",
          mobile: "1233214244",
          regisTime: 1526798145964,
          city: "杭州",
          vip: '0',
          from: 'wx'
        }
      ],
      curPage: 1,
      loading: false
    };
  },
  methods: {
    curChange() {},
    formatTime(row, column){
        return moment(new Date(row.regisTime)).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>

<style>
@import url(./../../../static/css/base.css);
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
    background: url(./../../../static/img/logo.png) no-repeat 0 0 / 100% 100%;
}
</style>
