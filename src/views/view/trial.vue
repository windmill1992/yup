<template>
  <el-row>
      <el-col :span="24" class="tool-bar" >
        <el-form :inline="true">
            <el-form-item class="fl">
                <p class="title">试用列表</p>
            </el-form-item>
            <el-form-item class="fr">
                <el-input placeholder="搜索" class="fl"></el-input>
                <el-button type="primary" class="fl">搜索</el-button>
                <el-button type="primary" class="fl" @click="addTrial">添加试用</el-button>
            </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
          <el-table :data="trials" highlight-current-row v-loading="loading" 
            style="width: 100%;height: 80%" border>
            <el-table-column type="index" width="60" label="#"></el-table-column>
            <el-table-column prop="proId" width="70" label="ID"></el-table-column>
            <el-table-column prop="proName" label="标题" min-width="200"></el-table-column>
            <el-table-column prop="sellingPrice" label="原价" min-width="150"></el-table-column>
            <el-table-column prop="proCount" width="80" label="数量"></el-table-column>
            <el-table-column prop="peopleNum" width="120" label="申请人数"></el-table-column>
            <el-table-column width="120" label="详情">
                <template slot-scope="scope">
                    <a href="javascript:;" class="detail" @click="showDetail(scope.row.proId, scope.row.status)">查看详情</a>
                </template>
            </el-table-column>
            <el-table-column width="120" label="申请人列表">
                <template slot-scope="scope">
                    <a href="javascript:;" class="detail" @click="showApplyList(scope.row.proId)">申请人列表</a>
                </template>
            </el-table-column>
            <el-table-column 
                prop="status" width="120" label="状态" 
                :filters="stateOpts" 
                :filter-multiple="false" 
                :filter-method="filterState">
            </el-table-column>
            <!-- <el-table-column min-width="150" label="操作">
              <template slot-scope="scope">
                <el-button type="" size="mini" ></el-button>
              </template>
            </el-table-column> -->
          </el-table>
          <el-pagination class="page fr" v-if="proTotal > 10" 
            @current-change="handleCurrentChange" 
            :current-page.sync="currentPage" 
            :page-size="proSize" 
            layout="total, prev, pager, next" 
            prev-text="上一页" next-text="下一页" :total="proTotal">
          </el-pagination>
      </el-col>
      <el-dialog :title="dialogTitle" :visible.sync="showDialog" custom-class="edit-dialog" :fullscreen="fullscreen" >
        <el-form ref="form" :model="formdata" label-width="100px" :rules="rules"	
          :style="{'max-height': maxFormHeight}" size="small">
          <p class="label">试用信息</p>
          <el-form-item label="标题" prop="proName">
            <el-input v-if="!read" v-model="formdata.proName"></el-input>
            <p class="read" v-else>{{formdata.proName}}</p>
          </el-form-item>
          <el-form-item label="数量" prop="proCount">
            <el-input v-if="!read" v-model.number="formdata.proCount"></el-input>
            <p class="read" v-else>{{formdata.proCount}}</p>
          </el-form-item>
          <el-form-item label="售价" prop="sellingPrice">
            <el-input v-if="!read" v-model.number="formdata.sellingPrice"></el-input>
            <p class="read" v-else>{{formdata.sellingPrice}}</p>
          </el-form-item>
          <el-form-item label="封面" prop="coverImg">
              <el-upload class="front-pic" :action="uploadUrl" 
                :show-file-list="false" :multiple="false" 
                :before-upload="beforeUpload" accept="image/*"
                :on-success="frontSuccess" :on-error="uploadError" 
                :limit="1" v-if="!read">
                <img :src="formdata.coverImg" v-if="formdata.coverImg" class="front-img loading-target" alt="">
                <i v-else class="el-icon-plus front-icon loading-target"></i>
              </el-upload>
              <img :src="formdata.coverImg" v-else class="front-img">
          </el-form-item>
          <el-form-item label="轮播" prop="proBannerImgList">
              <template v-if="!read">
                <template v-if="edit && formdata.proBannerImgList && formdata.proBannerImgList.length > 0">
                  <a href="javascript:;" v-for="(img, index) in formdata.proBannerImgList" :key="'b'+index" 
                    class="uploaded">
                    <img :src="img.imgUrl" class="front-img">
                    <i class="del el-icon-delete" @click="deleteImg(img.imgUrl)"></i>
                  </a>
                </template>
                <el-upload class="front-pic" :action="uploadUrl" 
                  list-type="picture-card" accept="image/*"
                  :on-success="bannerSuccess" :on-error="uploadError" :on-remove="removeBanner"
                  :limit="10">
                  <i class="el-icon-plus front-icon loading-target"></i>
                </el-upload>
              </template>
              <template v-else>
                <img :src="img.imgUrl" v-for="(img, index) in formdata.proBannerImgList" :key="'b'+index" 
                  class="front-img fl" style="margin-right: 10px;">
              </template>
          </el-form-item>
          <el-form-item label="上架" prop="proStartTime">
            <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm" value-format="timestamp" 
              v-if="!read" v-model="formdata.proStartTime">
            </el-date-picker>
            <el-date-picker class="read" format="yyyy-MM-dd HH:mm" v-model="formdata.proStartTime" disabled v-else></el-date-picker>
          </el-form-item>
          <el-form-item label="开奖" prop="proEndTime">
            <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm" value-format="timestamp" 
              v-if="!read" v-model="formdata.proEndTime">
            </el-date-picker>
            <el-date-picker class="read" format="yyyy-MM-dd HH:mm" v-model="formdata.proEndTime" disabled v-else></el-date-picker>
          </el-form-item>
          <el-form-item label="开奖形式" required>
            <el-radio-group v-model="formdata.lotteryType" v-if="!read">
              <el-radio :label="1">自动</el-radio>
              <el-radio :label="2">手动</el-radio>
              <label class="radio-tip">(请确保在开奖时间前选择中奖名单)</label>
            </el-radio-group>
            <el-radio-group v-model="formdata.lotteryType" v-else>
              <el-radio :label="1" disabled >自动</el-radio>
              <el-radio :label="2" disabled >手动</el-radio>
            </el-radio-group>
          </el-form-item>
          <p class="label">试用规则</p>
          <el-form-item label="规则" prop="proDescribe">
            <el-input type="textarea" v-if="!read" :autosize="{minRows: 2, maxRows: 10}" 
              resize="vertical" v-model="formdata.proDescribe" style="width: 300px">
            </el-input>
            <p class="read txt" v-else>{{formdata.proDescribe}}</p>
          </el-form-item>
          <p class="label">商品信息</p>
          <el-form-item label="颜色" prop="color">
            <el-input v-if="!read" v-model="formdata.color"></el-input>
            <p class="read" v-else>{{formdata.color}}</p>
          </el-form-item>
          <el-form-item label="国家" prop="country">
            <el-input v-if="!read" v-model="formdata.country"></el-input>
            <p class="read" v-else>{{formdata.country}}</p>
          </el-form-item>
          <el-form-item label="价格" prop="consultPrice">
            <el-input v-if="!read" v-model.number="formdata.consultPrice"></el-input>
            <p class="read" v-else>{{formdata.consultPrice}}</p>
          </el-form-item>
          <el-form-item label="品牌" prop="brand">
            <el-input v-if="!read" v-model="formdata.brand"></el-input>
            <p class="read" v-else>{{formdata.brand}}</p>
          </el-form-item>
          <el-form-item label="品类" prop="category">
            <el-input v-if="!read" v-model="formdata.category"></el-input>
            <p class="read" v-else>{{formdata.category}}</p>
          </el-form-item>
          <el-form-item label="材质" prop="material">
            <el-input v-if="!read" v-model="formdata.material"></el-input>
            <p class="read" v-else>{{formdata.material}}</p>
          </el-form-item>
          <el-form-item label="图片" prop="decsImg">
              <el-upload class="front-pic" :action="uploadUrl" 
                :show-file-list="false" :multiple="false" 
                :before-upload="beforeUpload" accept="image/*"
                :on-success="goodsSuccess" :on-error="uploadError" 
                :limit="1" v-if="!read">
                <img :src="formdata.decsImg" v-if="formdata.decsImg" class="front-img loading-target" alt="">
                <i v-else class="el-icon-plus front-icon loading-target"></i>
              </el-upload>
              <img :src="formdata.decsImg" v-else class="front-img" alt="">
          </el-form-item>
          <template v-if="read && dialogState == '已结束'">
            <p class="label">中奖名单</p>
            <el-table :data="winnerUsers" highlight-current-row 
              style="width: 100%;max-height: 200px" border>
              <el-table-column prop="useId" width="60" label="ID"></el-table-column>
              <el-table-column prop="userNickName" width="120" label="用户昵称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="userAddressName" width="120" label="收货名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="userMobile" width="130" label="手机号"></el-table-column>
              <el-table-column prop="userAddress" label="收货地址" min-width="200" show-overflow-tooltip></el-table-column>
              <el-table-column prop="userApplyTime" label="申请时间" width="180"></el-table-column>
            </el-table>
          </template>
        </el-form>
        <template slot="footer" v-if="!read && !edit">
          <el-button type="success" @click="saveProduct">保存</el-button>
          <!-- <el-button type="primary" @click="publish">发布</el-button> -->
          <el-button @click="showDialog = false">取消</el-button>
        </template>
        <template slot="footer" v-if="read">
            <el-button type="success" @click="editTrial" v-if="(dialogState != '已开奖' && dialogState != '已结束')">编辑</el-button>
            <el-button type="primary" @click="lottery" v-if="dialogState == '待开奖'">开奖</el-button>
            <el-button type="primary" @click="publish" v-if="dialogState == '待发布'">发布</el-button>
        </template>
        <template slot="footer" v-if="edit">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="success" @click="saveProduct">保存</el-button>
        </template>
      </el-dialog>
      <!-- 开奖选择申请人列表 -->
      <el-dialog :visible.sync="showLotteryDialog" fullscreen custom-class="lot-dialog">
        <template slot="title">
          <div class="lot-head" v-if="!lotRead">
            <p class="lot-title fl">试用列表-查看详情-开奖 ( {{selectedUser}} / {{lotTotal}} )</p>
            <!-- <el-input placeholder="搜索用户手机号/用户名" class="fr"></el-input> -->
          </div>
          <div class="lot-head" v-else>
            <p class="lot-title">申请人列表</p>
          </div>
        </template>
        <el-table :data="toLotUsers" highlight-current-row v-loading="loading" 
            @select="selectUser" @select-all="selectAllUser"
            style="width: 100%;height: 90%" :style="{'max-height': maxFormHeight}" border>
            <el-table-column prop="userId" width="100" label="ID"></el-table-column>
            <el-table-column prop="userName" width="120" label="用户昵称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mobile" width="140" label="手机号"></el-table-column>
            <el-table-column prop="userAddress" min-width="200" label="收货地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="note" min-width="200" label="试用宣言" show-overflow-tooltip></el-table-column>
            <el-table-column width="80" label="操作" type="selection" v-if="!lotRead">
              <!-- <template slot-scope="scope">
                <span>选中</span>
              </template> -->
            </el-table-column>
          </el-table>
          <el-pagination class="page fr" 
            @current-change="lotCurChange" 
            :current-page.sync="lotCurPage" 
            :page-size="lotPageSize" 
            layout="total, prev, pager, next" 
            prev-text="上一页" next-text="下一页" :total="lotTotal">
          </el-pagination>
          <div class="clearFix"></div>
          <template slot="footer" v-if="!lotRead">
            <el-button @click="showLotteryDialog = false">取消</el-button>
            <el-button type="success" @click="chooseUsers">确定</el-button>
          </template>
          <template slot="footer" v-else>
            <el-button type="primary" @click="showLotteryDialog = false">关闭</el-button>
          </template>
      </el-dialog>
  </el-row>
</template>

<script>
import { baseUrl } from './../../api/baseUrl'
var moment = require('moment');

export default {
  data() {
    return {
      trials: [],
      stateOpts: [
        { text: "待发布", value: "0" },
        { text: "待开奖", value: "1" },
        { text: "已结束", value: "2" },
        { text: "已下架", value: "3" }
      ],
      proTotal: 0,
      proSize: 20,
      loading: false,
      currentPage: 1,
      dialogTitle: "",
      fullscreen: false,
      showDialog: false,
      formdata: {},
      rules: {
        proName: [
          { required: true, message: '请输入试用标题', trigger: 'blur' },
          { min: 1, max: 20, message: '1-20 个字符', trigger: 'blur' }
        ],
        proCount: [
          { required: true, message: '请输入数量' },
          { type: 'number', message: '请填写有效数字' }
        ],
        sellingPrice: [
          { required: true, message: '请输入售价' },
          { type: 'number', message: '请填写有效数字' }
        ],
        coverImg: [
          { required: true, message: '请上传封面图', trigger: 'blur' }
        ],
        proStartTime: [
          { type: 'number', required: true, message: '请选择上架日期', trigger: 'blur' }
        ],
        proEndTime: [
          { type: 'number', required: true, message: '请选择开奖日期', trigger: 'blur' }
        ],
        proDescribe: [
          { required: true, message: '请输入试用规则', trigger: 'blur' },
        ],
        color: [
          { required: true, message: '请输入商品颜色', trigger: 'blur' },
        ],
        country: [
          { required: true, message: '请输入商品所在国家', trigger: 'blur' },
        ],
        consultPrice: [
          { required: true, message: '请输入商品价格' },
          { type: 'number', message: '请填写有效数字' }
        ],
        brand: [
          { required: true, message: '请输入商品品牌', trigger: 'blur' },
        ],
        category: [
          { required: true, message: '请输入商品品类', trigger: 'blur' },
        ],
        material: [
          { required: true, message: '请输入商品材质', trigger: 'blur' },
        ],
        decsImg: [
          { required: true, message: '请输入商品图片', trigger: 'blur' },
        ],
      },
      read: false,
      edit: false,
      showLotteryDialog: false,
      toLotUsers: [],
      winnerUsers: [],
      selUserList: [],
      selectedUser: 0,
      lotCurPage: 1,
      lotPageSize: 20,
      lotTotal: 0,
      lotRead: false,
      dialogState: "",
      isPublish: false
    };
  },
  computed: {
    trialLen() {
      return this.trials.length;
    },
    maxFormHeight() {
      let h = window.innerHeight;
      return h - 400 + "px";
    },
    uploadUrl() {
      return `${baseUrl}/yup-rest/upload`;
    }
  },
  methods: {
    getProductList() {
      let params = {
        pageIndex: this.currentPage,
        pageSize: this.proSize,
        t: Date.now()
      };
      this.loading = true;
      this.$http.get(`${baseUrl}/yup-rest/manage/product-list`, { params: params })
      .then(res => {
        this.loading = false;
        if(res.data.resultCode == 200){
          let r = res.data.resultData;
          this.trials = r.list;
          this.proTotal = r.total;
          if(this.trials != null && this.trials.length > 0){
            this.trials.filter(item => {
              if(item.proStatus == 0){
                item.status = '待发布';
              } else if(item.proStatus == 1){
                item.status = '待开奖';
              } else if(item.proStatus == 2){
                item.status = '已结束';
              } else if(item.proStatus == 3){
                item.status = '已下架';
              } else {
                item.status = '待发布';
              }
            })
          }
        }else{
          this.$message.error(res.data.resultMsg);
        }
      })
      .catch(res => {
        this.loading = false;
        this.$message.error('未知错误');
      })
    },
    filterState(value, row) {
      return row.proStatus == value;
    },
    handleCurrentChange(idx) {
      this.currentPage = idx;
      this.getProductList();
    },
    showDetail(id, status) {
      this.read = true;
      this.edit = false;
      this.editId = id;
      this.dialogState = status;
      this.showDialog = true;
      this.dialogTitle = "试用列表-查看详情";
      this.formdata = {};
      this.getProDetail();
    },
    getProDetail() {
      this.uploading = this.$loading();
      this.$http.get(`${baseUrl}/yup-rest/manage/product-info`, { params: { proId: this.editId } })
      .then(res => {
        this.uploading.close();
        if(res.data.resultCode == 200){
          this.formdata = res.data.resultData;
          this.formdata.proBannerImgList = [];
          this.formdata.bannerImgList.forEach((item, index) => {
            this.formdata.proBannerImgList.push({
              imgSort: index + 1,
              imgUrl: item,
              proImageId: null,
              proId: this.formdata.proId
            })
          })
          delete this.formdata.bannerImgList;
          if(this.formdata.proStatus > 1){
            this.getWinnerUserList(this.formdata.proId);
          }
        }else{
          this.$message.error(res.data.resultMsg);  
        }
      })
      .catch(() => {
        this.uploading.close();
        this.$message.error('未知错误');  
      })
    },
    addTrial() {
      this.read = false;
      this.edit = false;
      this.showDialog = true;
      this.dialogTitle = "试用列表-添加试用";
      if(this.$refs.form){
        this.$refs.form.resetFields();
      }
      this.formdata = {
        proName: '',
        proCount: '',
        sellingPrice: '',
        coverImg: '',
        proStartTime: '',
        proEndTime: '',
        lotteryType: 2,
        proDescribe: '',
        color: '',
        country: '',
        consultPrice: '',
        brand: '',
        category: '',
        material: '',
        decsImg: '',
        proStatus: 0,
        proId: 0,
        proBannerImgList: []
      }
    },
    editTrial() {
      this.showDialog = true;
      this.edit = true;
      this.read = false;
      this.dialogTitle = "试用列表-编辑试用";
    },
    saveProduct() {
      this.formdata.proStartTime = new Date(this.formdata.proStartTime).getTime();
      this.formdata.proEndTime = new Date(this.formdata.proEndTime).getTime();
      this.formdata = Object.assign({}, this.formdata);
      this.$refs.form.validate((valid) => {
        if(valid){
          let f = this.isPublish;
          if(new Date(this.formdata.proEndTime).getTime() < Date.now()){
            this.formdata.proStatus = 2;
            this.formdata = Object.assign({}, this.formdata);
          }
          this.formdata.proStartTime = moment(new Date(this.formdata.proStartTime)).format('YYYY-MM-DD HH:mm');
          this.formdata.proEndTime = moment(new Date(this.formdata.proEndTime)).format('YYYY-MM-DD HH:mm');
          delete this.formdata.applyPeopleNum;
          delete this.formdata.applyUserList;
          delete this.formdata.winningPeopleNum;
          delete this.formdata.winningUserList;
          delete this.formdata.bannerImgList;
          this.$http.defaults.headers.userId = 1;
          let updateUrl = `${baseUrl}/yup-rest/manage/update-product`;
          let saveUrl = `${baseUrl}/yup-rest/manage/save-product`;
          let apiUrl = f ? updateUrl : saveUrl;
          this.$http.post(apiUrl, this.formdata)
          .then(res => {
            if(res.data.resultCode == 200 && res.data.resultData){
              this.$message({
                type: 'success',
                message: f ? '发布成功！' : '保存成功！',
                showClose: true,
                center: true
              });
              if(this.formdata.proId == 0){
                this.currentPage = 1;
                this.getProductList();
              }else{
                this.getProductList();
              }
            }else{
              if(!res.data.resultMsg){
                this.$message.error('保存失败！');
              }else{
                this.$message({
                  message: res.data.resultMsg,
                  type: 'error',
                  duration: 0,
                  showClose: true
                })
              }
            }
            this.showDialog = false;
            this.isPublish = false;
          })
          .catch(() => {
            this.$message.error('保存失败！');
            if(this.edit){
              this.showDialog = false;
            }
            this.isPublish = false;
          })
        }else{
          this.$message.error('验证未通过！');
          return false;
        }
      });
    },
    publish() {
      this.formdata.proStatus = 1;
      this.formdata = Object.assign({}, this.formdata);
      this.isPublish = true;
      this.saveProduct();
    },
    beforeUpload(file) {
      if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/jpeg' && file.type != 'image/gif' && file.type != 'images/bmp'){
        return false;
      }
      this.uploading = this.$loading({
        target: '.loading-target',
      })
      return true;
    },
    frontSuccess(res, file) {
      if(res.resultCode == 200){
        this.formdata.coverImg = res.resultData;
      }else{
        this.$message.error('上传失败！');
      }
      this.uploading.close();
    },
    uploadError() {
      this.$message.error('上传失败！');
      this.uploading.close();
    },
    goodsSuccess(res, file) {
      if(res.resultCode == 200){
        this.formdata.decsImg = res.resultData;
      }else{
        this.$message.error('上传失败！');
      }
      this.uploading.close();
    },
    bannerSuccess(res, file) {
      if(res.resultCode == 200){
        let size = 0;
        if(!this.formdata.proBannerImgList || this.formdata.proBannerImgList == null){
          this.formdata.proBannerImgList = [];
        }
        let len = this.formdata.proBannerImgList.length;
        if(len > 0){
          size = this.formdata.proBannerImgList[len - 1].imgSort;
        }
        this.formdata.proBannerImgList.push({
          imgSort: ++size,
          proImageId: null,
          proId: this.formdata.proId,
          imgUrl: res.resultData
        });
      }else{
        this.$message.error('上传失败！');
      }
      this.uploading.close();
    },
    removeBanner(file, fileList) {
      this.formdata.proBannerImgList.forEach((item, index) => {
        if(item.imgUrl == file.response.resultData){
          this.formdata.proBannerImgList.splice(index, 1);
          return;
        }
      })
    },
    deleteImg(fileName) {
      this.$http.post(`${baseUrl}/yup-rest/delete?fileName=`+ fileName, {})
      .then(res => {
        if(res.data.resultCode == 200 && res.data.resultData){
          this.$message({
            type: 'success',
            message: '删除成功',
            showClose: true,
            center: true
          });
          this.formdata.proBannerImgList.forEach((item, index) => {
            if(item.imgUrl == fileName){
              this.formdata.proBannerImgList.splice(index, 1);
              this.formdata = Object.assign({}, this.formdata);
              return false;
            }
          })
        }else{
          this.$message.error(res.data.resultMsg? res.data.resultMsg : '删除失败！');
        }
      })
      .catch(() => {
        this.$message.error('删除失败！');
      })
    },
    selectUser(selection, row) {
      this.selUserList = [];
      if(selection.length > 0){
        selection.forEach(item => {
          this.selUserList.push(item.userId);
        })
      }
      this.selectedUser = selection.length;
    },
    selectAllUser(selection) {
      this.selUserList = [];
      if(selection.length > 0){
        selection.forEach(item => {
          this.selUserList.push(item.userId);
        })
      }
      this.selectedUser = selection.length;
    },
    chooseUsers() {
      if(this.selUserList.length == 0){
        this.$message.error('至少选择一个用户！');
        return;
      }
      let query = 'userIdList='+ this.selUserList.join(',') + '&proId='+ this.formdata.proId;
      this.$http.post(`${baseUrl}/yup-rest/manage/choose-user?`+ query, {})
      .then(res => {
        if(res.data.resultCode == 200){
          if(res.data.resultData){
            this.$message({
              type: 'success',
              message: '开奖成功',
              showClose: true,
              center: true
            });
            this.showLotteryDialog = false;
            this.formdata.proStatus = 2;
            this.formdata = Object.assign({}, this.formdata);
            this.saveProduct();
          }else{
            this.$message.error('开奖失败');
          }
        }else{
          this.$message.error(res.data.resultMsg);
        }
      })
      .catch(() => {
        this.$message.error('开奖失败');
      })
    },
    lotCurChange(idx) {
      this.lotCurPage = idx;
      this.getApplyUserList();
    },
    lottery() {
      this.showLotteryDialog = true;
      this.selUserList = [];
      this.lotCurPage = 1;
      this.lotRead = false;
      this.getApplyUserList();
    },
    showApplyList(id) {
      this.formdata.proId = id;
      this.formdata = Object.assign({}, this.formdata);
      this.lotCurPage = 1;
      this.lotRead = true;
      this.showLotteryDialog = true;
      this.getApplyUserList();
    },
    getApplyUserList() {
      this.$http.get(`${baseUrl}/yup-rest/manage/apply-user-list`, {
        params: { pageIndex: this.lotCurPage, pageSize: this.lotPageSize, proId: this.formdata.proId }
      })
      .then(res => {
        if(res.data.resultCode == 200){
          let r = res.data.resultData;
          this.toLotUsers = r.list;
          this.lotTotal = r.total;
        }else{
          this.$message({
            message: res.data.resultMsg,
            type: 'error',
            showClose: true,
          })
        }
      })
      .catch(() => {
        this.$message.error('查询申请用户失败！');
      })
    },
    getWinnerUserList(id) {
      this.$http.get(`${baseUrl}/yup-rest/manage/winner-user-list`, { 
        params: { proId: id } 
      })
      .then(res => {
        if(res.data.resultCode == 200){
          let r = res.data.resultData;
          if(r && r.length > 0){
            this.winnerUsers = r;
            for( let i=0; i<r.length; i++){
              r[i].userApplyTime = moment(new Date(r[i].userApplyTime)).format('YYYY-MM-DD HH:mm:ss');
            }
          }else{
            this.winnerUsers = [];
          }
        }else{
          this.$message.error(res.data.resultMsg);
        }
      })
      .catch(() => {
        this.$message.error('查询已中奖名单失败！');
      })
    }
  },
  mounted() {
    this.getProductList();
  }
};
</script>

<style scoped>
@import url(./../../assets/css/home/trial.css);
</style>
