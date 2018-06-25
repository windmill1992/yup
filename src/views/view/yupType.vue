<template>
  <el-row>
    <el-col :span="24" class="tool-bar">
      <p class="title fl">yup类型管理</p>
      <el-button type="primary" size="middle" class="add-btn" @click="addType">添加</el-button>
    </el-col>
    <el-col :span="24">
      <el-table :data="list" highlight-current-row v-loading="loading" border style="width: 100%;height: 80%;">
        <el-table-column type="index" label="#" width="60"></el-table-column>
        <el-table-column prop="yupTypeId" label="ID" width="80"></el-table-column>
        <el-table-column prop="yupTypeName" label="yup名称" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="yup" label="yup值" width="80"></el-table-column>
        <el-table-column prop="yupDesc" label="yup描述" min-width="180"></el-table-column>
        <el-table-column prop="yupLimit" label="领取限制" width="100"></el-table-column>
        <el-table-column prop="yupLimitCount" label="领取限制次数" width="150"></el-table-column>
        <el-table-column prop="isEnable" label="是否启用" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.isEnable == 1 ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editType(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteType(scope.row.yupTypeId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog :visible.sync="showModal" :title="title" >
      <el-form ref="form" :model="formdata" label-width="100px" :rules="rules" size="small">
        <el-form-item label="类型名称" prop="yupTypeName">
          <el-input v-model="formdata.yupTypeName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="yupDesc">
          <el-input v-model="formdata.yupDesc"></el-input>
        </el-form-item>
        <el-form-item label="yup值">
          <el-input v-model.number="formdata.yup"></el-input>
        </el-form-item>
        <el-form-item label="领取限制">
          <el-radio-group v-model="formdata.yupLimit">
            <el-radio :label="1">每天</el-radio>
            <el-radio :label="2">总共</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="领取限制次数">
          <el-input v-model.number="formdata.yupLimitCount"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="formdata.isEnable">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
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
        yupTypeName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        yupDesc: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getList() {
      this.loading = true;
      this.$http.get(`${baseUrl}/yup-rest/manage/yup-type-list`, {})
      .then(res => {
        this.loading = false;
        if(res.data.resultCode == 200){
          this.list = res.data.resultData;
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
      this.title = '新增';
      this.formdata = {
        yupTypeId: 0,
        yupTypeName: '',
        yupDesc: '',
        yup: '',
        yupLimit: 1,
        yupLimitCount: '',
        isEnable: 0
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
          if(!this.formdata.yup){
            this.formdata.yup = -1;
          }
          if(!this.formdata.yupLimitCount){
            this.formdata.yupLimitCount = -1;
          }
          this.$http.post(`${baseUrl}/yup-rest/manage/save-yup-type`, { data: this.formdata })
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
        this.$http.post(`${baseUrl}/yup-rest/manage/delete-yup-type`, { yupTypeId: id }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
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
  },
  computed: {
    maxFormHeight() {
      let h = window.innerHeight;
      return h - 400 + "px";
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
