<template>
  <el-row>
    <el-col :span="24" class="tool-bar">
      <p class="title fl">指南标签管理</p>
      <el-button type="primary" size="middle" class="add-btn" @click="addType">添加</el-button>
    </el-col>
    <el-col :span="24">
      <el-table :data="list" highlight-current-row v-loading="loading" border style="width: 100%;height: 80%;">
        <el-table-column prop="labelSort" label="排序" width="80"></el-table-column>
        <el-table-column prop="labelId" label="ID" width="80"></el-table-column>
        <el-table-column prop="labelName" label="标签名称" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="labelCode" label="标签唯一code" width="150"></el-table-column>
        <el-table-column prop="labelRelatedNum" label="文章数" min-width="80"></el-table-column>
        <el-table-column prop="labelStatus" label="是否启用" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.labelStatus == 1">启用</span>
            <span v-else>未启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <!-- <el-button v-if="scope.row.labelStatus == 0" type="success" size="mini" @click="online(scope.row.labelId)">上线</el-button> -->
            <el-button type="primary" size="mini" @click="editType(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog :visible.sync="showModal" :title="title" >
      <el-form ref="form" :model="formdata" label-width="100px" :rules="rules" size="small">
        <el-form-item label="名称" prop="labelName">
          <el-input v-model="formdata.labelName"></el-input>
        </el-form-item>
        <el-form-item label="Code" prop="labelCode">
          <el-input v-model="formdata.labelCode"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="labelSort">
          <el-input v-model.number="formdata.labelSort"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formdata.labelStatus">
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
export default {
  data() {
    return {
      list: [],
      loading: false,
      showModal: false,
      title: '',
      formdata: {},
      rules: {
        labelName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        labelCode: [
          { required: true, message: 'code不能为空', trigger: 'blur' }
        ],
        labelSort: [
          { type: 'number', required: true, message: '排序不能为空', trigger: 'blur' }
        ],
      },
      curPage: 1,
      pageSize: 10,
    }
  },
  methods: {
    getList() {
      this.loading = true;
      this.$http.post(`${baseUrl}/yup-rest/manage/label-list`, { pageIndex: this.curPage, pageSize: this.pageSize })
      .then(res => {
        this.loading = false;
        if(res.data.resultCode == 200){
          this.list = res.data.resultData.list;
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
    addType() {
      this.showModal = true;
      this.title = '添加标签';
      this.formdata = {
        labelId: 0,
        labelName: '',
        labelCode: '',
        labelSort: 0,
        labelStatus: 0,
        labelParentId: 0,
        enable: false,
      }
    },
    editType(row) {
      this.formdata = Object.assign({}, row);
      this.title = '编辑';
      this.showModal = true;
    },
    save() {
      this.$refs.form.validate(valid => {
        if(valid){
          this.formdata.enable = this.formdata.labelStatus == 1;
          this.$http.post(`${baseUrl}/yup-rest/manage/save-label`, this.formdata, { headers: { userId: 1 } } )
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
    deleteType(id) {
      this.$confirm('是否删除该条数据？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$http.post(`${baseUrl}/yup-rest/manage/delete-yup-type?yupTypeId=`+ id, {})
        .then(res => {
          if(res.data.resultCode == 200){
            this.$message.success('删除成功');
            this.getList();
          }else{
            if(res.data.resultMsg){
              this.$message.error(res.data.resultMsg);
            }else{
              this.$message.error('服务器错误！');
            }
          }
        }).catch(() => {
          this.$message.error('未知错误！');
        })
      })
		},
		online(id) {
      
		}
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
