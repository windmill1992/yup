<template>
  <el-row>
    <el-col :span="24" class="tool-bar">
      <p class="title fl">文案库管理</p>
      <p class="fr">
        <el-input v-model="words" placeholder="搜索内容"></el-input>
        <el-button type="primary" size="middle" @click="search">搜索</el-button>
        <el-button type="primary" size="middle" class="add-btn" @click="addCopy">添加</el-button>
      </p>
    </el-col>
    <el-col :span="24">
      <el-table :data="list" highlight-current-row v-loading="loading" border style="width: 100%;height: 80%;">
        <el-table-column prop="copywritingId" label="ID" width="80"></el-table-column>
        <el-table-column prop="copywriting" label="内容" min-width="250"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
        <el-table-column label="是否启用" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.isEnable == 1">启用</span>
            <span v-else>未启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editCopy(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page fr"
            @current-change="curChange" 
            :current-page.sync="page" 
            :page-size="pageSize" 
            layout="total, prev, pager, next" 
            prev-text="上一页" next-text="下一页" :total="total">
          </el-pagination>
    </el-col>
    <el-dialog :visible.sync="showModal" :title="title" >
      <el-form ref="form" :model="formdata" label-width="100px" :rules="rules" size="small">
        <el-form-item label="内容" prop="copywriting">
          <el-input v-model="formdata.copywriting"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formdata.isEnable">
            <el-radio :label="0">不启用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="showModal = false">取消</el-button>
        <el-button type="success" @click="save">保存</el-button>
      </template>
    </el-dialog>
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
      showModal: false,
      title: '',
      formdata: {},
      rules: {
        copywriting: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
      },
      page: 1,
      pageSize: 20,
      total: 0,
      words: '',
    }
  },
  methods: {
    getList() {
      let param = { 
        pageIndex: this.page, 
        pageSize: this.pageSize,
        keywords: this.words,
      }
      this.loading = true;
      this.$http.post(`${baseUrl}/yup-rest/manage/copywriting-list`, param)
      .then(res => {
        this.loading = false;
        if(res.data.resultCode == 200){
          let r = res.data.resultData;
          for(let v of r.list){
            v.updateTime = moment(new Date(v.updateTime)).format('YYYY-MM-DD HH:mm:ss');
          }
          this.total = r.total;
          this.list = r.list;
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
    search() {
      this.getList();
    },
    addCopy() {
      this.showModal = true;
      this.title = '添加文案';
      this.formdata = {
        copywritingId: 0,
        copywriting: '',
        isEnable: 0,
      }
    },
    editCopy(row) {
      let obj = { copywritingId: row.copywritingId, copywriting: row.copywriting, isEnable: row.isEnable };
      this.formdata = Object.assign({}, obj);
      this.title = '编辑';
      this.showModal = true;
    },
    save() {
      this.$refs.form.validate(valid => {
        if(valid){
          this.$http.post(`${baseUrl}/yup-rest/manage/save-copywriting`, this.formdata, { headers: { userId: 1 } } )
          .then(res => {
            if(res.data.resultCode == 200 && res.data.resultData){
              this.$message.success('保存成功');
              this.getList();
              this.showModal = false;
            }else{
              if(res.data.resultMsg){
                this.$message.error(res.data.resultMsg);
              }else{
                this.$message.error('服务器错误！');
              }
            }
          })
          .catch(() => {
            this.$message.error('未知错误！');
          })
        }else{
          this.$message.error('验证失败！');
        }
      })
    },
  },
  mounted() {
    this.getList();
  }
}
</script>

<style scoped>
.add-btn{
  margin-left: 30px;
}
</style>
