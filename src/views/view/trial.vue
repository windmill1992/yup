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
            <el-table-column prop="id" width="70" label="编号"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="originPrice" label="原价"></el-table-column>
            <el-table-column prop="num" width="80" label="数量"></el-table-column>
            <el-table-column prop="applyNum" width="120" label="申请人数"></el-table-column>
            <el-table-column width="120" label="操作">
                <template slot-scope="scope">
                    <a href="javascript:;" class="detail" @click="showDetail(scope.row.id, scope.row.state)">查看详情</a>
                </template>
            </el-table-column>
            <el-table-column 
                prop="state" 
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
            :page-size="20" 
            layout="total, prev, pager, next" 
            prev-text="上一页" 
            next-text="下一页" 
            :total="100">
          </el-pagination>
      </el-col>
      <el-dialog :title="dialogTitle" :visible.sync="showDialog" width="500" custom-class="edit-dialog" >
        <el-form ref="form" :model="sizeForm" label-width="100px" :style="{'max-height': maxFormHeight}">
          <p class="label">试用信息</p>
          <el-form-item label="标题">
            <el-input v-if="!read" v-model="sizeForm.title"></el-input>
            <p class="read" v-else>{{sizeForm.title}}</p>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-if="!read" v-model="sizeForm.num"></el-input>
            <p class="read" v-else>{{sizeForm.num}}</p>
          </el-form-item>
          <el-form-item label="售价">
            <el-input v-if="!read" v-model="sizeForm.salePrice"></el-input>
            <p class="read" v-else>{{sizeForm.salePrice}}</p>
          </el-form-item>
          <el-form-item label="封面">
              <el-upload class="front-pic" action="" 
                :show-file-list="false" :multiple="false" :on-success="frontSuccess" :on-error="frontError" 
                :limit="1" v-if="!read">
                <img :src="sizeForm.frontUrl" v-if="sizeForm.frontUrl" class="front-img" alt="">
                <i v-else class="el-icon-plus front-icon"></i>
              </el-upload>
              <img :src="sizeForm.frontUrl" v-else class="front-img">
          </el-form-item>
          <el-form-item label="上架">
            <el-date-picker type="datetime" v-if="!read" v-model="sizeForm.grounding"></el-date-picker>
            <p class="read" v-else>{{sizeForm.grounding}}</p>
          </el-form-item>
          <el-form-item label="开奖">
            <el-date-picker type="datetime" v-if="!read" v-model="sizeForm.lottery"></el-date-picker>
            <p class="read" v-else>{{sizeForm.lottery}}</p>
          </el-form-item>
          <el-form-item label="开奖形式">
            <el-radio-group v-model="sizeForm.prizeway" v-if="!read">
              <el-radio label="自动"></el-radio>
              <el-radio label="手动 "></el-radio>
              <label class="radio-tip">(请确保在开奖时间前选择中奖名单)</label>
            </el-radio-group>
            <el-radio-group v-model="sizeForm.prizeway" v-else>
              <el-radio label="自动" disabled ></el-radio>
              <el-radio label="手动" disabled ></el-radio>
            </el-radio-group>
          </el-form-item>
          <p class="label">试用规则</p>
          <el-form-item label="规则">
            <el-input type="textarea" v-if="!read" :autosize="{minRows: 2, maxRows: 10}" 
              resize="vertical" v-model="sizeForm.rule" style="width: 300px">
            </el-input>
            <p class="read txt" v-else>{{sizeForm.rule}}</p>
          </el-form-item>
          <p class="label">商品信息</p>
          <el-form-item label="颜色">
            <el-input v-if="!read" v-model="sizeForm.color"></el-input>
            <p class="read" v-else>{{sizeForm.color}}</p>
          </el-form-item>
          <el-form-item label="国家">
            <el-input v-if="!read" v-model="sizeForm.country"></el-input>
            <p class="read" v-else>{{sizeForm.country}}</p>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-if="!read" v-model="sizeForm.price"></el-input>
            <p class="read" v-else>{{sizeForm.price}}</p>
          </el-form-item>
          <el-form-item label="品牌">
            <el-input v-if="!read" v-model="sizeForm.brand"></el-input>
            <p class="read" v-else>{{sizeForm.brand}}</p>
          </el-form-item>
          <el-form-item label="品类">
            <el-input v-if="!read" v-model="sizeForm.category"></el-input>
            <p class="read" v-else>{{sizeForm.category}}</p>
          </el-form-item>
          <el-form-item label="材质">
            <el-input v-if="!read" v-model="sizeForm.material"></el-input>
            <p class="read" v-else>{{sizeForm.material}}</p>
          </el-form-item>
          <el-form-item label="图片">
              <el-upload class="front-pic" action="" 
                :show-file-list="false" :multiple="false" :on-success="goodsSuccess" :on-error="goodsError" 
                :limit="1" v-if="!read">
                <img :src="sizeForm.goodsUrl" v-if="sizeForm.goodsUrl" class="front-img" alt="">
                <i v-else class="el-icon-plus front-icon"></i>
              </el-upload>
              <img :src="sizeForm.goodsUrl" v-else class="front-img" alt="">
          </el-form-item>
          <template v-if="read && dialogState == '已结束'">
            <p class="label">中奖名单</p>
            <el-table :data="toLotUsers" highlight-current-row 
              style="width: 100%;max-height: 200px" border>
              <el-table-column prop="id" width="70" label="ID"></el-table-column>
              <el-table-column prop="nick" label="用户昵称"></el-table-column>
              <el-table-column prop="mobile" label="手机号"></el-table-column>
              <el-table-column prop="addr" width="380" label="收货地址" show-overflow-tooltip></el-table-column>
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
          <el-button type="success">保存</el-button>
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
          <el-button type="success" @click="editTrial()">保存</el-button>
        </template>
      </el-dialog>
      <el-dialog :visible.sync="showLotteryDialog" width="500" custom-class="lot-dialog">
        <template slot="title">
          <div class="lot-head">
            <p class="lot-title fl">试用列表-查看详情-开奖 ( {{selectedUser}} / {{userNum}} )</p>
            <el-input placeholder="搜索用户手机号/用户名" class="fr"></el-input>
          </div>
        </template>
        <el-table :data="toLotUsers" highlight-current-row v-loading="loading" 
            style="width: 100%;height: 90%" :style="{'max-height': maxFormHeight}" border>
            <el-table-column prop="id" width="70" label="ID"></el-table-column>
            <el-table-column prop="nick" label="用户昵称"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="addr" width="180" label="收货地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="trialWord" width="200" label="试用宣言" show-overflow-tooltip></el-table-column>
            <el-table-column width="120" label="操作" type="selection" @selection-change="selectUser">
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
export default {
  data() {
    return {
      trials: [
        {
          id: 1,
          title: "supreme最新款卫衣",
          originPrice: "1998.00",
          num: 30,
          applyNum: 100000,
          state: "待发布"
        },
        {
          id: 2,
          title: "supreme最新款卫衣",
          originPrice: "1998.00",
          num: 30,
          applyNum: 100000,
          state: "待发布"
        },
        {
          id: 3,
          title: "supreme最新款卫衣",
          originPrice: "1998.00",
          num: 30,
          applyNum: 100000,
          state: "待开奖"
        },
        {
          id: 4,
          title: "supreme最新款卫衣",
          originPrice: "1998.00",
          num: 30,
          applyNum: 100000,
          state: "已结束"
        }
      ],
      stateOpts: [
        { text: "全部", value: "全部" },
        { text: "待发布", value: "待发布" },
        { text: "待开奖", value: "待开奖" },
        { text: "已结束", value: "已结束" }
      ],
      state: "全部",
      loading: false,
      currentPage: 1,
      dialogTitle: "",
      showDialog: false,
      sizeForm: {
        title: "",
        num: "",
        salePrice: "",
        frontUrl: "",
        grounding: "",
        lottery: "",
        prizeway: "",
        rule: "",
        color: "",
        country: "",
        price: "",
        brand: "",
        category: "",
        material: "",
        goodsUrl: ""
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
    }
  },
  methods: {
    filterState(value, row) {
      this.state = value;
      if (value == "全部") {
        return true;
      } else {
        return row.state === value;
      }
    },
    handleCurrentChange(val) {},
    showDetail(id, state) {
      this.read = true;
      this.editId = id;
      this.dialogState = state;
      this.showDialog = true;
      this.dialogTitle = "试用列表-查看详情";
    },
    addTrial() {
      this.read = false;
      this.edit = false;
      this.showDialog = true;
      this.dialogTitle = "试用列表-添加试用";
      for (const a in this.sizeForm) {
        if (this.sizeForm.hasOwnProperty(a)) {
          this.sizeForm[a] = "";
        }
      }
    },
    editTrial() {
      this.showDialog = true;
      this.edit = true;
      this.read = false;
      this.dialogTitle = "试用列表-编辑试用";
      this.sizeForm = {};
    },
    publish() {},
    frontSuccess() {},
    frontError() {},
    goodsSuccess() {},
    goodsError() {},
    selectUser() {},
    lotCurChange() {},
    lottery() {
      this.showLotteryDialog = true;
      // this.showDialog = false;
    },
    lotEndCurChange() {}
  }
};
</script>

<style>
@import url(./../../../static/css/base.css);
@import url(./../../../static/css/home/trial.css);
</style>
