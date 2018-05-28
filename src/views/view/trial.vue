<template>
  <el-row>
      <el-col :span="24" class="tool-bar" >
        <el-form class="" :inline="true">
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
            style="width: 100%;height: 90%" border>
            <el-table-column prop="proId" width="70" label="编号"></el-table-column>
            <el-table-column prop="proName" label="标题"></el-table-column>
            <el-table-column prop="sellingPrice" label="原价"></el-table-column>
            <el-table-column prop="proCount" width="80" label="数量"></el-table-column>
            <el-table-column prop="peopleNum" width="120" label="申请人数"></el-table-column>
            <el-table-column width="120" label="操作">
                <template slot-scope="scope">
                    <a href="javascript:;" class="detail" @click="showDetail(scope.row.proId, scope.row.proStatus)">查看详情</a>
                </template>
            </el-table-column>
            <el-table-column 
                prop="status" 
                width="150" 
                :label="'状态-'+ state" 
                :filters="stateOpts" 
                :filter-multiple="false" 
                :filtered-value="[state]" 
                :filter-method="filterState">
            </el-table-column>
          </el-table>
          <el-pagination class="page" 
            @current-change="handleCurrentChange" 
            :current-page.sync="currentPage" 
            :page-size="proSize" 
            layout="total, prev, pager, next" 
            prev-text="上一页" 
            next-text="下一页" 
            :total="proTotal">
          </el-pagination>
      </el-col>
      <el-dialog :title="dialogTitle" :visible.sync="showDialog" width="500" custom-class="edit-dialog" >
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
                :on-success="frontSuccess" :on-error="frontError" 
                :limit="1" v-if="!read">
                <img :src="formdata.coverImg" v-if="formdata.coverImg" class="front-img" alt="">
                <i v-else class="el-icon-plus front-icon"></i>
              </el-upload>
              <img :src="formdata.coverImg" v-else class="front-img">
          </el-form-item>
          <el-form-item label="上架" prop="proStartTime">
            <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"
              v-if="!read" v-model="formdata.proStartTime">
            </el-date-picker>
            <p class="read" v-else>{{formdata.proStartTime}}</p>
          </el-form-item>
          <el-form-item label="开奖" prop="proEndTime">
            <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" 
              v-if="!read" v-model="formdata.proEndTime">
            </el-date-picker>
            <el-date-picker class="read" format="yyyy-MM-dd HH:mm" v-model="formdata.proEndTime" disabled v-else></el-date-picker>
          </el-form-item>
          <el-form-item label="开奖形式" required>
            <el-radio-group v-model="formdata.lotterType" v-if="!read">
              <el-radio label="自动">自动</el-radio>
              <el-radio label="">手动</el-radio>
              <label class="radio-tip">(请确保在开奖时间前选择中奖名单)</label>
            </el-radio-group>
            <el-radio-group v-model="formdata.lotterType" v-else>
              <el-radio label="自动" disabled ></el-radio>
              <el-radio label="" disabled >手动</el-radio>
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
                :on-success="goodsSuccess" :on-error="goodsError" 
                :limit="1" v-if="!read">
                <img :src="formdata.decsImg" v-if="formdata.decsImg" class="front-img" alt="">
                <i v-else class="el-icon-plus front-icon"></i>
              </el-upload>
              <img :src="formdata.decsImg" v-else class="front-img" alt="">
          </el-form-item>
          <template v-if="read && dialogState == '已结束'">
            <p class="label">中奖名单</p>
            <el-table :data="toLotUsers" highlight-current-row 
              style="width: 100%;max-height: 200px" border>
              <el-table-column prop="id" width="70" label="ID"></el-table-column>
              <el-table-column prop="nick" width="120" label="用户昵称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="mobile" width="130" label="手机号"></el-table-column>
              <el-table-column prop="addr" label="收货地址" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-pagination class="page" 
              @current-change="lotEndCurChange" 
              :current-page.sync="lotEndCurPage" 
              :page-size="20" 
              layout="total, prev, pager, next" 
              prev-text="上一页" 
              next-text="下一页" 
              :total="100">
            </el-pagination>
          </template>
        </el-form>
        <template slot="footer" v-if="!read && !edit">
          <el-button type="success" @click="saveProduct">保存</el-button>
          <el-button type="primary" @click="publish">发布</el-button>
          <el-button @click="showDialog = false">取消</el-button>
        </template>
        <template slot="footer" v-if="read && dialogState != '已结束'">
            <el-button type="success" @click="editTrial">编辑</el-button>
            <el-button type="primary" @click="lottery" v-if="dialogState == '待开奖'">开奖</el-button>
            <el-button type="primary" @click="publish" v-if="dialogState == '待发布'">发布</el-button>
        </template>
        <template slot="footer" v-if="edit">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="success" @click="saveProduct">保存</el-button>
        </template>
      </el-dialog>
      <el-dialog :visible.sync="showLotteryDialog" width="60%" fullscreen custom-class="lot-dialog">
        <template slot="title">
          <div class="lot-head">
            <p class="lot-title fl">试用列表-查看详情-开奖 ( {{selectedUser}} / {{userNum}} )</p>
            <el-input placeholder="搜索用户手机号/用户名" class="fr"></el-input>
          </div>
        </template>
        <el-table :data="toLotUsers" highlight-current-row v-loading="loading" 
            style="width: 100%;height: 90%" :style="{'max-height': maxFormHeight}" border>
            <el-table-column prop="id" width="60" label="ID"></el-table-column>
            <el-table-column prop="nick" width="120" label="用户昵称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mobile" width="140" label="手机号"></el-table-column>
            <el-table-column prop="addr" width="180" label="收货地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="trialWord" label="试用宣言" show-overflow-tooltip></el-table-column>
            <el-table-column width="100" label="操作" type="selection" @selection-change="selectUser">
              <!-- <template slot-scope="scope">
                <span>选中</span>
              </template> -->
            </el-table-column>
          </el-table>
          <el-pagination class="page" 
            @current-change="lotCurChange" 
            :current-page.sync="lotCurPage" 
            :page-size="20" 
            layout="total, prev, pager, next" 
            prev-text="上一页" 
            next-text="下一页" 
            :total="100">
          </el-pagination>
          <template slot="footer">
            <el-button @click="showLotteryDialog = false">取消</el-button>
            <el-button type="success">确定</el-button>
          </template>
      </el-dialog>
  </el-row>
</template>

<script>
import { baseUrl } from './../../api/baseUrl'

export default {
  data() {
    return {
      trials: [],
      stateOpts: [
        { text: "全部", value: null },
        { text: "待发布", value: "0" },
        { text: "待开奖", value: "1" },
        { text: "已开奖", value: "2" },
        { text: "已结束", value: "3" }
      ],
      proTotal: 0,
      proSize: 20,
      state: "全部",
      loading: false,
      currentPage: 1,
      dialogTitle: "",
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
          { type: 'date', required: true, message: '请选择上架日期', trigger: 'blur' }
        ],
        proEndTime: [
          { type: 'date', required: true, message: '请选择开奖日期', trigger: 'blur' }
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
      toLotUsers: [
        {
          id: 1,
          nick: "那个杯子",
          mobile: "15972955687",
          addr: "北京市朝阳区",
          trialWord: "我要试用，我很爱"
        },
        {
          id: 2,
          nick: "那个杯子",
          mobile: "15972955687",
          addr: "北京市朝阳区",
          trialWord: "我要试用，我很爱"
        },
        {
          id: 3,
          nick: "那个杯子",
          mobile: "15972955687",
          addr: "北京市朝阳区",
          trialWord: "我要试用，我很爱"
        },
        {
          id: 4,
          nick: "那个杯子",
          mobile: "15972955687",
          addr: "北京市朝阳区",
          trialWord: "我要试用，我很爱打电话卡事件回调"
        }
      ],
      userNum: 100,
      selectedUser: 0,
      lotCurPage: 1,
      lotEndCurPage: 1,
      dialogState: ""
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
        pageSize: this.proSize
      };
      this.$http.get(`${baseUrl}/yup-rest/manage/product-list`, {params: params})
      .then(res => {
        console.log(res);
        if(res.data.resultCode == 200){
          let r = res.data.resultData;
          this.trials = r.list;
          this.proTotal = r.total;
          this.trials.filter(item => {
            if(item.proStatus == 0){
              item.status = '待发布';
            } else if(item.proStatus == 1){
              item.status = '待开奖';
            } else if(item.proStatus == 2){
              item.status = '已开奖';
            } else if(item.proStatus == 3){
              item.status = '已结束';
            } else {
              item.status = '待发布';
            }
          })
        }else{
          this.$message.error(res.data.resultMsg);
        }
      })
      .catch(res => {
        this.$message.error('未知错误');
      })
    },
    filterState(value, row) {
      if(value != null){
        this.state = this.stateOpts[parseInt(value) + 1].text;
      }else{
        this.state = '全部'
      }
      if (value == null) {
        return true;
      } else {
        return row.proStatus === value;
      }
    },
    handleCurrentChange(val) {},
    showDetail(id, state) {
      this.read = true;
      this.editId = id;
      this.dialogState = state;
      this.showDialog = true;
      this.dialogTitle = "试用列表-查看详情";
      this.getProDetail();
    },
    getProDetail() {
      this.$http.get(`${baseUrl}/yup-rest/pro-detail`, { params: { proId: this.editId } })
      .then(res => {
        if(res.data.resultCode == 200){
          this.formdata = res.data.resultData;
          Object.assign({}, this.formdata, {
            proStartTime: '',
            lotterType: '',
            proStatus: 0,
            proId: this.editId,
            proBannerImgList: []
          })
        }else{
          this.$message.error(res.data.resultMsg);  
        }
      })
      .catch(() => {
        this.$message.error('未知错误');  
      })
    },
    addTrial() {
      this.read = false;
      this.edit = false;
      this.showDialog = true;
      this.dialogTitle = "试用列表-添加试用";
      this.formdata = {
        proName: '',
        proCount: '',
        sellingPrice: '',
        coverImg: '',
        proStartTime: '',
        proEndTime: '',
        lotterType: '',
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
      this.$http.defaults.headers.userId = 1;
      this.$http.post(`${baseUrl}/yup-rest/manage/save-product`, this.formdata)
      .then(res => {
        if(res.data.resultCode == 200){
          this.$message({
            type: 'success',
            message: '保存成功！',
            showClose: true,
            center: true
          });
          this.currentPage = 1;
          this.getProductList(1, 20);
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
         this.$message.error('保存失败！');
      })
    },
    publish() {

    },
    beforeUpload(file) {
      if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/jpeg' && file.type != 'image/gif' && file.type != 'images/bmp'){
        return false;
      }
      this.$loading({
        target: '.front-icon',
      })
      return true;
    },
    frontSuccess(res, file) {
      if(res.resultCode == 200){
        this.formdata.frontUrl = res.resultData;
      }else{
        this.$message.error('上传失败！');
      }
    },
    frontError() {
      this.$message.error('上传失败！');
    },
    goodsSuccess(res, file) {
      if(res.resultCode == 200){
        this.formdata.goodsUrl = res.resultData;
      }else{
        this.$message.error('上传失败！');
      }
    },
    goodsError() {
      this.$message.error('上传失败！');
    },
    selectUser() {},
    lotCurChange() {},
    lottery() {
      this.showLotteryDialog = true;
      // this.showDialog = false;
    },
    lotEndCurChange() {},
    getApplyUserList() {
      this.$http.get(`${baseUrl}/yup-rest/manage/apply-user-list`, {
        params: { pageIndex: this.lotCurPage, pageSize: 10, proId: this.proId }
      })
      .then(res => {
        if(res.data.resultCode == 200){
          this.toLotUsers = res.data.resultData;
        }else{
          this.$message({
            message: res.data.resultMsg,
            type: 'error',
            showClose: true,
          })
        }
      })
    }
  },
  mounted() {
    this.getProductList();
  }
};
</script>

<style>
@import url(./../../../static/css/base.css);
@import url(./../../../static/css/home/trial.css);
</style>
