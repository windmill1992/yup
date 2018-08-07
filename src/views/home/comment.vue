<template>
  <el-row>
    <el-col :span="24" class="tool-bar">
      <p class="title fl">评论管理</p>
    </el-col>
    <el-col :span="24">
      <el-table :data="list" highlight-current-row v-loading="loading" border style="width: 100%;height: 80%;">
        <el-table-column prop="commenteeId" label="ID" width="80"></el-table-column>
        <el-table-column prop="commenteeName" label="评论人名称" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="yupDesc" label="描述" min-width="180"></el-table-column>
        <el-table-column prop="yupDescTemplate" label="描述模板" width="150"></el-table-column>
        <el-table-column prop="yupTypeCode" label="类型唯一code" width="150"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editType(scope.row.commentId)">展示</el-button>
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
        if(res.data.resultCode == 200){
          let r = res.data.resultData;
          this.list = r.list;
          this.total = r.total;
        }else{
          if(res.data.resultMsg){
            this.$message.error(res.data.resultMsg);
          }else{
            this.$message.error('服务器错误！');
          }
        }
      })
      .catch(() => {
        this.loading = false;
        this.$message.error('未知错误！');
      })
    },
    curChange(idx) {
      this.page = idx;
      this.getList();
    },
    
  },
  mounted() {
    this.getList();
  }
}
</script>

<style scoped>

</style>
