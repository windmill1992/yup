<template>
  <el-row>
    <el-col :span="24" class="tool-bar">
      <p class="title fl">评论管理</p>
    </el-col>
    <el-col :span="24">
      <el-table :data="list" highlight-current-row v-loading="loading" border style="width: 100%;height: 80%;">
        <el-table-column prop="userName" label="评论者名称" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="comment" label="评论内容" min-width="180"></el-table-column>
        <el-table-column prop="relatedTitle" label="相关评论标题" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="评论时间" width="180"></el-table-column>
        <el-table-column label="是否展示" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.isShow == 1 ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showHide(scope.row)">{{scope.row.isShow == 1 ? '隐藏' : '展示'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="curChange" :current-page="page" 
        :page-size="pageSize" :total="total" layout="total, prev, pager, next" class="page fr">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import { baseUrl } from './../../api/baseUrl'
const moment = require('moment')
export default {
  data() {
    return {
      list: [],
      loading: false,
      formdata: {},
      page: 1,
      pageSize: 20,
      total: 0,
      relatedId: 0,
      relatedType: 1,
    }
  },
  methods: {
    getList() {
      let param = {
        relatedId: this.relatedId,
        relatedType: this.relatedType,
        pageIndex: this.page,
        pageSize: this.pageSize,
      }
      this.loading = true;
      this.$http.post(`${baseUrl}/yup-rest/manage/comment-list`, param)
      .then(res => {
        this.loading = false;
        if(res.data.resultCode == 200 && res.data.resultData){
          let r = res.data.resultData;
          if(r.list && r.list.length > 0){
            for(let v of r.list){
              v.createTime = moment(new Date(v.createTime)).format('YYYY-MM-DD HH:mm:ss');
            }
            this.list = r.list;
            this.total = r.total;
          }
        }else{
          if(res.data.resultMsg){
            this.$message.error(res.data.resultMsg);
          }else{
            this.$message.error('服务器错误！');
          }
        }
      })
      .catch(e => {
        this.loading = false;
        this.$message.error('未知错误！' + e);
      })
    },
    curChange(idx) {
      this.page = idx;
      this.getList();
    },
    showHide(row) {
      let param = '?commentId='+ row.relatedId + '&isShow='+ !row.isShow;
      this.$http.post(`${baseUrl}/yup-rest/manage/handle-comment`+ param, {}, {
        headers: { userId: 1 }
      })
      .then(res => {
        if(res.data.resultCode == 200 && res.data.resultData){
          this.$message.success('操作成功！');
          this.getList();
        }else{
          if(res.data.resultMsg){
            this.$message.error(res.data.resultMsg);
          }else{
            this.$message.error('服务器错误！');
          }
        }
      })
      .catch(e => {
        this.$message.error('未知异常！' + e);
      })
    },
  },
  mounted() {
    this.getList();
  }
}
</script>

<style scoped>

</style>
