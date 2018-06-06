webpackJsonp([1],{

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

var base =  false ? '/api' : "http://api.yupfashion.cn/yup";

const baseUrl = base;
/* harmony export (immutable) */ __webpack_exports__["a"] = baseUrl;


/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/**
 * Created by vikey on 2017/5/26.
 */
/**
 * http配置
 * * */
// 引入axios


// axios 配置
__WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.timeout = 5000;

//添加请求拦截器

// http request 拦截器
__WEBPACK_IMPORTED_MODULE_0_axios___default.a.interceptors.request.use(config => {

    // if(config.url.indexOf('-batch-delete')>0)
    // {
    //     config.headers['Content-Type'] = 'application/json';
    // }else
    if (config.url.indexOf('-delete') > 0) {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }

    // config.headers.vAuthToken = sessionStorage.getItem("user");
    // config.headers.client = `web`;

    return config;
}, err => {
    return Promise.reject(err);
});

// http response 拦截器
__WEBPACK_IMPORTED_MODULE_0_axios___default.a.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 401 清除token信息并跳转到登录页面
                // store.commit(types.LOGOUT);
                router.replace({
                    path: 'login',
                    query: { redirect: router.currentRoute.fullPath }
                });
        }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error);
});

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_axios___default.a);

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_Login_vue__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_Login_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__views_Login_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_404_vue__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_404_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__views_404_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_Home_vue__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_Home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__views_Home_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_view_index_vue__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_view_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__views_view_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_view_trial_vue__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_view_trial_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__views_view_trial_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_view_feedback_vue__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_view_feedback_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__views_view_feedback_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_view_users_vue__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_view_users_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__views_view_users_vue__);









let routes = [{
    path: '/login',
    component: __WEBPACK_IMPORTED_MODULE_0__views_Login_vue___default.a,
    name: '',
    hidden: true
}, {
    path: '/404',
    component: __WEBPACK_IMPORTED_MODULE_1__views_404_vue___default.a,
    name: '',
    hidden: true
}, {
    path: '/',
    component: __WEBPACK_IMPORTED_MODULE_2__views_Home_vue___default.a,
    name: '商品管理',
    iconCls: 'el-icon-goods', //图标样式class
    children: [{ path: '/index', component: __WEBPACK_IMPORTED_MODULE_3__views_view_index_vue___default.a, name: '首页' }, { path: '/trial', component: __WEBPACK_IMPORTED_MODULE_4__views_view_trial_vue___default.a, name: '试用' }, { path: '/feedback', component: __WEBPACK_IMPORTED_MODULE_5__views_view_feedback_vue___default.a, name: '反馈' }, { path: '/users', component: __WEBPACK_IMPORTED_MODULE_6__views_view_users_vue___default.a, name: '用户' }]
}, {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
}];

/* harmony default export */ __webpack_exports__["a"] = (routes);

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getters__ = __webpack_require__(251);





__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

// 应用初始状态
const state = {
    count: 10

    // 定义所需的 mutations
};const mutations = {
    INCREMENT(state) {
        state.count++;
    },
    DECREMENT(state) {
        state.count--;
    }
};

// 创建 store 实例
/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
    actions: __WEBPACK_IMPORTED_MODULE_2__actions__,
    getters: __WEBPACK_IMPORTED_MODULE_3__getters__,
    state,
    mutations
}));

/***/ }),

/***/ 197:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 198:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(306)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(242),
  /* template */
  __webpack_require__(327),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'app',
	components: {}
});

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      sysName: "YUP后台管理系统",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function (a, b) {},
    //退出登录
    logout: function () {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      }).then(() => {
        localStorage.removeItem("user");
        _this.$router.push("/login");
      }).catch(() => {});
    },
    //折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed;
      $('.el-menu-vertical-demo').eq(0).css({ width: 'auto' });
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName("submenu-hook-" + i)[0].style.display = status ? "block" : "none";
    }
  },
  mounted() {
    var user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.username || "";
      this.sysUserAvatar = user.avatar || "";
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(310)))

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_baseUrl__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_md5__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_js_md5__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      logining: false,
      formdata: {
        account: '',
        password: ''
      },
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      checked: false
    };
  },
  methods: {
    handleReset() {
      this.$refs.form.resetFields();
    },
    handleSubmit(ev) {
      localStorage.setItem('rememberPW', this.checked);
      this.$refs.form.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = { username: this.formdata.account, password: '' };
          let pw = __WEBPACK_IMPORTED_MODULE_1_js_md5___default()(this.formdata.password);
          this.$http.post(`${__WEBPACK_IMPORTED_MODULE_0__api_baseUrl__["a" /* baseUrl */]}/yup-rest/login`, {
            account: this.formdata.account,
            loginMethod: 1,
            password: pw
          }).then(res => {
            this.logining = false;
            if (res.data.resultCode == 200) {
              if (res.data.resultData) {
                if (this.checked) {
                  loginParams.password = this.formdata.password;
                }
                localStorage.setItem('user', JSON.stringify(loginParams));
                this.$router.push({ path: '/index' });
              } else {
                this.$message.error('账户名或密码错误！');
              }
            } else {
              this.$message.error(res.data.resultMsg);
            }
          }).catch(() => {
            this.logining = false;
            this.$message.error('登录错误！');
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted() {
    let user = localStorage.getItem('user');
    this.checked = eval(localStorage.getItem('rememberPW'));
    if (user && user != '' && user != null) {
      user = JSON.parse(user);
      this.formdata.account = user.username;
      if (user.password) {
        this.formdata.password = user.password;
      }
    }
    const _this = this;
    document.body.addEventListener('keyup', function (e) {
      if (e.keyCode == 13) {
        _this.handleSubmit();
      }
    }, false);
  }
});

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_baseUrl__ = __webpack_require__(16);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
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
        curChange(idx) {
            this.curPage = idx;
            this.getEnterApplyList();
        },
        getEnterApplyList() {
            this.loading = true;
            this.$http.get(`${__WEBPACK_IMPORTED_MODULE_0__api_baseUrl__["a" /* baseUrl */]}/yup-rest/manage/enter-apply-list`, {
                params: { pageIndex: this.curPage, pageSize: this.pageSize }
            }).then(res => {
                this.loading = false;
                if (res.data.resultCode == 200) {
                    let r = res.data.resultData;
                    this.list = r.list;
                    this.total = r.total;
                } else {
                    this.$message({
                        message: res.data.resultMsg,
                        type: 'error',
                        duration: 0,
                        showClose: true
                    });
                }
            }).catch(() => {
                this.loading = false;
                this.$message.error('未知错误！');
            });
        }
    },
    mounted() {
        this.getEnterApplyList();
    }
});

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_baseUrl__ = __webpack_require__(16);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            countData: {
                userCount: 0,
                todayUserCount: 0,
                todayApplyUserCount: 0,
                proCount: 0
            }
        };
    },
    methods: {
        getIndexData() {
            this.$http.get(`${__WEBPACK_IMPORTED_MODULE_0__api_baseUrl__["a" /* baseUrl */]}/yup-rest/manage/index`, {}).then(res => {
                if (res.data.resultCode == 200) {
                    if (res.data.resultData) {
                        this.countData = res.data.resultData;
                    }
                } else {
                    this.$message.error(res.data.resultMsg);
                }
            }).catch(() => {
                this.$message.error('未知错误！');
            });
        }
    },
    mounted() {
        this.getIndexData();
    }
});

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_baseUrl__ = __webpack_require__(16);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var moment = __webpack_require__(0);

/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      trials: [],
      stateOpts: [{ text: "待发布", value: "0" }, { text: "待开奖", value: "1" }, { text: "已结束", value: "2" }, { text: "已下架", value: "3" }],
      proTotal: 0,
      proSize: 20,
      loading: false,
      currentPage: 1,
      dialogTitle: "",
      fullscreen: false,
      showDialog: false,
      formdata: {},
      rules: {
        proName: [{ required: true, message: '请输入试用标题', trigger: 'blur' }, { min: 1, max: 20, message: '1-20 个字符', trigger: 'blur' }],
        proCount: [{ required: true, message: '请输入数量' }, { type: 'number', message: '请填写有效数字' }],
        sellingPrice: [{ required: true, message: '请输入售价' }, { type: 'number', message: '请填写有效数字' }],
        coverImg: [{ required: true, message: '请上传封面图', trigger: 'blur' }],
        proStartTime: [{ type: 'number', required: true, message: '请选择上架日期', trigger: 'blur' }],
        proEndTime: [{ type: 'number', required: true, message: '请选择开奖日期', trigger: 'blur' }],
        proDescribe: [{ required: true, message: '请输入试用规则', trigger: 'blur' }],
        color: [{ required: true, message: '请输入商品颜色', trigger: 'blur' }],
        country: [{ required: true, message: '请输入商品所在国家', trigger: 'blur' }],
        consultPrice: [{ required: true, message: '请输入商品价格' }, { type: 'number', message: '请填写有效数字' }],
        brand: [{ required: true, message: '请输入商品品牌', trigger: 'blur' }],
        category: [{ required: true, message: '请输入商品品类', trigger: 'blur' }],
        material: [{ required: true, message: '请输入商品材质', trigger: 'blur' }],
        decsImg: [{ required: true, message: '请输入商品图片', trigger: 'blur' }]
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
      return `${__WEBPACK_IMPORTED_MODULE_0__api_baseUrl__["a" /* baseUrl */]}/yup-rest/upload`;
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
      this.$http.get(`${__WEBPACK_IMPORTED_MODULE_0__api_baseUrl__["a" /* baseUrl */]}/yup-rest/manage/product-list`, { params: params }).then(res => {
        this.loading = false;
        if (res.data.resultCode == 200) {
          let r = res.data.resultData;
          this.trials = r.list;
          this.proTotal = r.total;
          if (this.trials != null && this.trials.length > 0) {
            this.trials.filter(item => {
              if (item.proStatus == 0) {
                item.status = '待发布';
              } else if (item.proStatus == 1) {
                item.status = '待开奖';
              } else if (item.proStatus == 2) {
                item.status = '已结束';
              } else if (item.proStatus == 3) {
                item.status = '已下架';
              } else {
                item.status = '待发布';
              }
            });
          }
        } else {
          this.$message.error(res.data.resultMsg);
        }
      }).catch(res => {
        this.loading = false;
        this.$message.error('未知错误');
      });
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
      this.$http.get(`${__WEBPACK_IMPORTED_MODULE_0__api_baseUrl__["a" /* baseUrl */]}/yup-rest/manage/product-info`, { params: { proId: this.editId } }).then(res => {
        this.uploading.close();
        if (res.data.resultCode == 200) {
          this.formdata = res.data.resultData;
          this.formdata.proBannerImgList = [];
          this.formdata.bannerImgList.forEach((item, index) => {
            this.formdata.proBannerImgList.push({
              imgSort: index + 1,
              imgUrl: item,
              proImageId: null,
              proId: this.formdata.proId
            });
          });
          delete this.formdata.bannerImgList;
          if (this.formdata.proStatus > 1) {
            this.getWinnerUserList(this.formdata.proId);
          }
        } else {
          this.$message.error(res.data.resultMsg);
        }
      }).catch(() => {
        this.uploading.close();
        this.$message.error('未知错误');
      });
    },
    addTrial() {
      this.read = false;
      this.edit = false;
      this.showDialog = true;
      this.dialogTitle = "试用列表-添加试用";
      this.$refs.form.resetFields();
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
      };
    },
    editTrial() {
      this.showDialog = true;
      this.edit = true;
      this.read = false;
      this.dialogTitle = "试用列表-编辑试用";
    },
    saveProduct() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let f = this.isPublish;
          console.log(this.formdata.proEndTime);
          if (new Date(this.formdata.proEndTime).getTime() < Date.now()) {
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
          let updateUrl = `${__WEBPACK_IMPORTED_MODULE_0__api_baseUrl__["a" /* baseUrl */]}/yup-rest/manage/update-product`;
          let saveUrl = `${__WEBPACK_IMPORTED_MODULE_0__api_baseUrl__["a" /* baseUrl */]}/yup-rest/manage/save-product`;
          let apiUrl = f ? updateUrl : saveUrl;
          this.$http.post(apiUrl, this.formdata).then(res => {
            if (res.data.resultCode == 200 && res.data.resultData) {
              this.$message({
                type: 'success',
                message: f ? '发布成功！' : '保存成功！',
                showClose: true,
                center: true
              });
              if (this.formdata.proId == 0) {
                this.currentPage = 1;
                this.getProductList();
              } else {
                this.getProductList();
              }
            } else {
              if (!res.data.resultMsg) {
                this.$message.error('保存失败！');
              } else {
                this.$message({
                  message: res.data.resultMsg,
                  type: 'error',
                  duration: 0,
                  showClose: true
                });
              }
            }
            this.showDialog = false;
            this.isPublish = false;
          }).catch(() => {
            this.$message.error('保存失败！');
            if (this.edit) {
              this.showDialog = false;
            }
            this.isPublish = false;
          });
        } else {
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
      if (file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/jpeg' && file.type != 'image/gif' && file.type != 'images/bmp') {
        return false;
      }
      this.uploading = this.$loading({
        target: '.loading-target'
      });
      return true;
    },
    frontSuccess(res, file) {
      if (res.resultCode == 200) {
        this.formdata.coverImg = res.resultData;
      } else {
        this.$message.error('上传失败！');
      }
      this.uploading.close();
    },
    uploadError() {
      this.$message.error('上传失败！');
      this.uploading.close();
    },
    goodsSuccess(res, file) {
      if (res.resultCode == 200) {
        this.formdata.decsImg = res.resultData;
      } else {
        this.$message.error('上传失败！');
      }
      this.uploading.close();
    },
    bannerSuccess(res, file) {
      if (res.resultCode == 200) {
        let size = 0;
        if (!this.formdata.proBannerImgList || this.formdata.proBannerImgList == null) {
          this.formdata.proBannerImgList = [];
        }
        let len = this.formdata.proBannerImgList.length;
        if (len > 0) {
          size = this.formdata.proBannerImgList[len - 1].imgSort;
        }
        this.formdata.proBannerImgList.push({
          imgSort: ++size,
          proImageId: null,
          proId: this.formdata.proId,
          imgUrl: res.resultData
        });
      } else {
        this.$message.error('上传失败！');
      }
      this.uploading.close();
    },
    removeBanner(file, fileList) {
      this.formdata.proBannerImgList.forEach((item, index) => {
        if (item.imgUrl == file.response.resultData) {
          this.formdata.proBannerImgList.splice(index, 1);
          return;
        }
      });
    },
    deleteImg(fileName) {
      this.$http.post(`${__WEBPACK_IMPORTED_MODULE_0__api_baseUrl__["a" /* baseUrl */]}/yup-rest/delete?fileName=` + fileName, {}).then(res => {
        if (res.data.resultCode == 200 && res.data.resultData) {
          this.$message({
            type: 'success',
            message: '删除成功',
            showClose: true,
            center: true
          });
          this.formdata.proBannerImgList.forEach((item, index) => {
            if (item.imgUrl == fileName) {
              this.formdata.proBannerImgList.splice(index, 1);
              this.formdata = Object.assign({}, this.formdata);
              return false;
            }
          });
        } else {
          this.$message.error(res.data.resultMsg ? res.data.resultMsg : '删除失败！');
        }
      }).catch(() => {
        this.$message.error('删除失败！');
      });
    },
    selectUser(selection, row) {
      this.selUserList = [];
      if (selection.length > 0) {
        selection.forEach(item => {
          this.selUserList.push(item.userId);
        });
      }
      this.selectedUser = selection.length;
    },
    selectAllUser(selection) {
      this.selUserList = [];
      if (selection.length > 0) {
        selection.forEach(item => {
          this.selUserList.push(item.userId);
        });
      }
      this.selectedUser = selection.length;
    },
    chooseUsers() {
      if (this.selUserList.length == 0) {
        this.$message.error('至少选择一个用户！');
        return;
      }
      let query = 'userIdList=' + this.selUserList.join(',') + '&proId=' + this.formdata.proId;
      this.$http.post(`${__WEBPACK_IMPORTED_MODULE_0__api_baseUrl__["a" /* baseUrl */]}/yup-rest/manage/choose-user?` + query, {}).then(res => {
        if (res.data.resultCode == 200) {
          if (res.data.resultData) {
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
          } else {
            this.$message.error('开奖失败');
          }
        } else {
          this.$message.error(res.data.resultMsg);
        }
      }).catch(() => {
        this.$message.error('开奖失败');
      });
    },
    lotCurChange(idx) {
      this.lotCurPage = idx;
      this.getApplyUserList();
    },
    lottery() {
      this.showLotteryDialog = true;
      this.selUserList = [];
      this.lotCurPage = 1;
      this.getApplyUserList();
    },
    getApplyUserList() {
      this.$http.get(`${__WEBPACK_IMPORTED_MODULE_0__api_baseUrl__["a" /* baseUrl */]}/yup-rest/manage/apply-user-list`, {
        params: { pageIndex: this.lotCurPage, pageSize: this.lotPageSize, proId: this.formdata.proId }
      }).then(res => {
        if (res.data.resultCode == 200) {
          let r = res.data.resultData;
          this.toLotUsers = r.list;
          this.lotTotal = r.total;
        } else {
          this.$message({
            message: res.data.resultMsg,
            type: 'error',
            showClose: true
          });
        }
      }).catch(() => {
        this.$message.error('查询申请用户失败！');
      });
    },
    getWinnerUserList(id) {
      this.$http.get(`${__WEBPACK_IMPORTED_MODULE_0__api_baseUrl__["a" /* baseUrl */]}/yup-rest/manage/winner-user-list`, {
        params: { proId: id }
      }).then(res => {
        if (res.data.resultCode == 200) {
          let r = res.data.resultData;
          if (r && r.length > 0) {
            this.winnerUsers = r;
            for (let i = 0; i < r.length; i++) {
              r[i].userApplyTime = moment(new Date(r[i].userApplyTime)).format('YYYY-MM-DD HH:mm:ss');
            }
          } else {
            this.winnerUsers = [];
          }
        } else {
          this.$message.error(res.data.resultMsg);
        }
      }).catch(() => {
        this.$message.error('查询已中奖名单失败！');
      });
    }
  },
  mounted() {
    this.getProductList();
  }
});

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_baseUrl__ = __webpack_require__(16);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var moment = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["default"] = ({
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
            this.$http.post(`${__WEBPACK_IMPORTED_MODULE_0__api_baseUrl__["a" /* baseUrl */]}/yup-rest/manage/user-list`, { pageIndex: this.curPage, pageSize: this.pageSize }).then(res => {
                if (res.data.resultCode == 200) {
                    let r = res.data.resultData;
                    if (r) {
                        this.list = r.list;
                        this.total = r.total;
                    }
                } else {
                    this.$message.error(res.data.resultMsg);
                }
            }).catch(() => {
                this.$message.error('未知错误！');
            });
        },
        curChange(idx) {
            this.curPage = idx;
        },
        formatTime(row, column) {
            return moment(new Date(row.regisTime)).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    mounted() {
        this.getUserList();
    }
});

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_element_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui_lib_theme_default_index_css__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui_lib_theme_default_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_element_ui_lib_theme_default_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_router__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vuex_store__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuex__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_font_awesome_css_font_awesome_min_css__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_font_awesome_css_font_awesome_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_font_awesome_css_font_awesome_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__http_http__ = __webpack_require__(193);












__WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$http = __WEBPACK_IMPORTED_MODULE_9__http_http__["a" /* default */];

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_2_element_ui___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_4_vue_router__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_6_vuex__["a" /* default */]);

const router = new __WEBPACK_IMPORTED_MODULE_4_vue_router__["a" /* default */]({
  // mode: 'history',
  routes: __WEBPACK_IMPORTED_MODULE_7__routes__["a" /* default */]
});

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    localStorage.removeItem('user');
  }

  next();
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' });
  } else {
    next();
  }
});

new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  //el: '#app',
  //template: '<App/>',
  router,
  store: __WEBPACK_IMPORTED_MODULE_5__vuex_store__["a" /* default */],
  //components: { App }
  render: h => h(__WEBPACK_IMPORTED_MODULE_1__App___default.a)
}).$mount('#app');

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//test
const increment = ({ commit }) => {
    commit('INCREMENT');
};
/* harmony export (immutable) */ __webpack_exports__["increment"] = increment;

const decrement = ({ commit }) => {
    commit('DECREMENT');
};
/* harmony export (immutable) */ __webpack_exports__["decrement"] = decrement;


/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//test
const getCount = state => {
    return state.count;
};
/* harmony export (immutable) */ __webpack_exports__["getCount"] = getCount;


/***/ }),

/***/ 302:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 303:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 304:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 305:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 306:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 307:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 308:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 309:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 74,
	"./af.js": 74,
	"./ar": 81,
	"./ar-dz": 75,
	"./ar-dz.js": 75,
	"./ar-kw": 76,
	"./ar-kw.js": 76,
	"./ar-ly": 77,
	"./ar-ly.js": 77,
	"./ar-ma": 78,
	"./ar-ma.js": 78,
	"./ar-sa": 79,
	"./ar-sa.js": 79,
	"./ar-tn": 80,
	"./ar-tn.js": 80,
	"./ar.js": 81,
	"./az": 82,
	"./az.js": 82,
	"./be": 83,
	"./be.js": 83,
	"./bg": 84,
	"./bg.js": 84,
	"./bm": 85,
	"./bm.js": 85,
	"./bn": 86,
	"./bn.js": 86,
	"./bo": 87,
	"./bo.js": 87,
	"./br": 88,
	"./br.js": 88,
	"./bs": 89,
	"./bs.js": 89,
	"./ca": 90,
	"./ca.js": 90,
	"./cs": 91,
	"./cs.js": 91,
	"./cv": 92,
	"./cv.js": 92,
	"./cy": 93,
	"./cy.js": 93,
	"./da": 94,
	"./da.js": 94,
	"./de": 97,
	"./de-at": 95,
	"./de-at.js": 95,
	"./de-ch": 96,
	"./de-ch.js": 96,
	"./de.js": 97,
	"./dv": 98,
	"./dv.js": 98,
	"./el": 99,
	"./el.js": 99,
	"./en-au": 100,
	"./en-au.js": 100,
	"./en-ca": 101,
	"./en-ca.js": 101,
	"./en-gb": 102,
	"./en-gb.js": 102,
	"./en-ie": 103,
	"./en-ie.js": 103,
	"./en-nz": 104,
	"./en-nz.js": 104,
	"./eo": 105,
	"./eo.js": 105,
	"./es": 108,
	"./es-do": 106,
	"./es-do.js": 106,
	"./es-us": 107,
	"./es-us.js": 107,
	"./es.js": 108,
	"./et": 109,
	"./et.js": 109,
	"./eu": 110,
	"./eu.js": 110,
	"./fa": 111,
	"./fa.js": 111,
	"./fi": 112,
	"./fi.js": 112,
	"./fo": 113,
	"./fo.js": 113,
	"./fr": 116,
	"./fr-ca": 114,
	"./fr-ca.js": 114,
	"./fr-ch": 115,
	"./fr-ch.js": 115,
	"./fr.js": 116,
	"./fy": 117,
	"./fy.js": 117,
	"./gd": 118,
	"./gd.js": 118,
	"./gl": 119,
	"./gl.js": 119,
	"./gom-latn": 120,
	"./gom-latn.js": 120,
	"./gu": 121,
	"./gu.js": 121,
	"./he": 122,
	"./he.js": 122,
	"./hi": 123,
	"./hi.js": 123,
	"./hr": 124,
	"./hr.js": 124,
	"./hu": 125,
	"./hu.js": 125,
	"./hy-am": 126,
	"./hy-am.js": 126,
	"./id": 127,
	"./id.js": 127,
	"./is": 128,
	"./is.js": 128,
	"./it": 129,
	"./it.js": 129,
	"./ja": 130,
	"./ja.js": 130,
	"./jv": 131,
	"./jv.js": 131,
	"./ka": 132,
	"./ka.js": 132,
	"./kk": 133,
	"./kk.js": 133,
	"./km": 134,
	"./km.js": 134,
	"./kn": 135,
	"./kn.js": 135,
	"./ko": 136,
	"./ko.js": 136,
	"./ky": 137,
	"./ky.js": 137,
	"./lb": 138,
	"./lb.js": 138,
	"./lo": 139,
	"./lo.js": 139,
	"./lt": 140,
	"./lt.js": 140,
	"./lv": 141,
	"./lv.js": 141,
	"./me": 142,
	"./me.js": 142,
	"./mi": 143,
	"./mi.js": 143,
	"./mk": 144,
	"./mk.js": 144,
	"./ml": 145,
	"./ml.js": 145,
	"./mr": 146,
	"./mr.js": 146,
	"./ms": 148,
	"./ms-my": 147,
	"./ms-my.js": 147,
	"./ms.js": 148,
	"./my": 149,
	"./my.js": 149,
	"./nb": 150,
	"./nb.js": 150,
	"./ne": 151,
	"./ne.js": 151,
	"./nl": 153,
	"./nl-be": 152,
	"./nl-be.js": 152,
	"./nl.js": 153,
	"./nn": 154,
	"./nn.js": 154,
	"./pa-in": 155,
	"./pa-in.js": 155,
	"./pl": 156,
	"./pl.js": 156,
	"./pt": 158,
	"./pt-br": 157,
	"./pt-br.js": 157,
	"./pt.js": 158,
	"./ro": 159,
	"./ro.js": 159,
	"./ru": 160,
	"./ru.js": 160,
	"./sd": 161,
	"./sd.js": 161,
	"./se": 162,
	"./se.js": 162,
	"./si": 163,
	"./si.js": 163,
	"./sk": 164,
	"./sk.js": 164,
	"./sl": 165,
	"./sl.js": 165,
	"./sq": 166,
	"./sq.js": 166,
	"./sr": 168,
	"./sr-cyrl": 167,
	"./sr-cyrl.js": 167,
	"./sr.js": 168,
	"./ss": 169,
	"./ss.js": 169,
	"./sv": 170,
	"./sv.js": 170,
	"./sw": 171,
	"./sw.js": 171,
	"./ta": 172,
	"./ta.js": 172,
	"./te": 173,
	"./te.js": 173,
	"./tet": 174,
	"./tet.js": 174,
	"./th": 175,
	"./th.js": 175,
	"./tl-ph": 176,
	"./tl-ph.js": 176,
	"./tlh": 177,
	"./tlh.js": 177,
	"./tr": 178,
	"./tr.js": 178,
	"./tzl": 179,
	"./tzl.js": 179,
	"./tzm": 181,
	"./tzm-latn": 180,
	"./tzm-latn.js": 180,
	"./tzm.js": 181,
	"./uk": 182,
	"./uk.js": 182,
	"./ur": 183,
	"./ur.js": 183,
	"./uz": 185,
	"./uz-latn": 184,
	"./uz-latn.js": 184,
	"./uz.js": 185,
	"./vi": 186,
	"./vi.js": 186,
	"./x-pseudo": 187,
	"./x-pseudo.js": 187,
	"./yo": 188,
	"./yo.js": 188,
	"./zh-cn": 189,
	"./zh-cn.js": 189,
	"./zh-hk": 190,
	"./zh-hk.js": 190,
	"./zh-tw": 191,
	"./zh-tw.js": 191
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 312;

/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/logo.840488a.png";

/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(302)

var Component = __webpack_require__(7)(
  /* script */
  null,
  /* template */
  __webpack_require__(323),
  /* scopeId */
  "data-v-04519ea6",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(303)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(243),
  /* template */
  __webpack_require__(324),
  /* scopeId */
  "data-v-0c4ce001",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(307)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(244),
  /* template */
  __webpack_require__(328),
  /* scopeId */
  "data-v-c997f292",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(304)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(245),
  /* template */
  __webpack_require__(325),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 320:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(308)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(246),
  /* template */
  __webpack_require__(329),
  /* scopeId */
  "data-v-cdb1c82c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 321:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(309)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(247),
  /* template */
  __webpack_require__(330),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(305)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(248),
  /* template */
  __webpack_require__(326),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 323:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "page-container"
  }, [_vm._v("404 page not found")])
},staticRenderFns: []}

/***/ }),

/***/ 324:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', {
    staticClass: "container"
  }, [_c('el-col', {
    staticClass: "header",
    attrs: {
      "span": 24
    }
  }, [_c('el-col', {
    staticClass: "logo",
    class: _vm.collapsed ? 'logo-collapse-width' : 'logo-width',
    attrs: {
      "span": 10
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.collapsed ? '' : _vm.sysName) + "\n\t\t")]), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 10
    }
  }, [_c('div', {
    staticClass: "tools",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.collapse($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-align-justify"
  })])]), _vm._v(" "), _c('el-col', {
    staticClass: "userinfo",
    attrs: {
      "span": 4
    }
  }, [_c('el-dropdown', {
    attrs: {
      "trigger": "hover"
    }
  }, [_c('span', {
    staticClass: "el-dropdown-link userinfo-inner"
  }, [_vm._v(" " + _vm._s(_vm.sysUserName))]), _vm._v(" "), _c('el-dropdown-menu', {
    attrs: {
      "slot": "dropdown"
    },
    slot: "dropdown"
  }, [_c('el-dropdown-item', {
    attrs: {
      "divided": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.logout($event)
      }
    }
  }, [_vm._v("退出登录")])], 1)], 1)], 1)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "main",
    attrs: {
      "span": 24
    }
  }, [_c('aside', {
    class: _vm.collapsed ? 'menu-collapsed' : 'menu-expanded'
  }, [_c('el-menu', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.collapsed),
      expression: "!collapsed"
    }],
    staticClass: "el-menu-vertical-demo",
    attrs: {
      "default-active": _vm.$route.path,
      "unique-opened": "",
      "router": ""
    },
    on: {
      "open": _vm.handleopen,
      "close": _vm.handleclose,
      "select": _vm.handleselect
    }
  }, [_vm._l((_vm.$router.options.routes), function(item, index) {
    return (!item.hidden) ? [(!item.leaf) ? _c('el-submenu', {
      key: index,
      attrs: {
        "index": index + ''
      }
    }, [_c('template', {
      attrs: {
        "slot": "title"
      },
      slot: "title"
    }, [_c('i', {
      class: item.iconCls
    }), _vm._v(_vm._s(item.name))]), _vm._v(" "), _vm._l((item.children), function(child) {
      return (!child.hidden) ? _c('el-menu-item', {
        key: child.path,
        attrs: {
          "index": child.path
        }
      }, [_vm._v(_vm._s(child.name))]) : _vm._e()
    })], 2) : _vm._e(), _vm._v(" "), (item.leaf && item.children.length > 0) ? _c('el-menu-item', {
      key: index,
      attrs: {
        "index": item.children[0].path
      }
    }, [_c('i', {
      class: item.iconCls
    }), _vm._v(_vm._s(item.children[0].name))]) : _vm._e()] : _vm._e()
  })], 2), _vm._v(" "), _c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.collapsed),
      expression: "collapsed"
    }],
    ref: "menuCollapsed",
    staticClass: "el-menu el-menu-vertical-demo collapsed"
  }, _vm._l((_vm.$router.options.routes), function(item, index) {
    return (!item.hidden) ? _c('li', {
      key: index,
      staticClass: "el-submenu item"
    }, [(!item.leaf) ? [_c('div', {
      staticClass: "el-submenu__title",
      staticStyle: {
        "padding-left": "20px"
      },
      on: {
        "mouseover": function($event) {
          _vm.showMenu(index, true)
        },
        "mouseout": function($event) {
          _vm.showMenu(index, false)
        }
      }
    }, [_c('i', {
      class: item.iconCls
    })]), _vm._v(" "), _c('ul', {
      staticClass: "el-menu submenu",
      class: 'submenu-hook-' + index,
      on: {
        "mouseover": function($event) {
          _vm.showMenu(index, true)
        },
        "mouseout": function($event) {
          _vm.showMenu(index, false)
        }
      }
    }, _vm._l((item.children), function(child) {
      return (!child.hidden) ? _c('li', {
        key: child.path,
        staticClass: "el-menu-item",
        class: _vm.$route.path == child.path ? 'is-active' : '',
        staticStyle: {
          "padding-left": "40px"
        },
        on: {
          "click": function($event) {
            _vm.$router.push(child.path)
          }
        }
      }, [_vm._v(_vm._s(child.name))]) : _vm._e()
    }))] : [_c('li', {
      staticClass: "el-submenu"
    }, [_c('div', {
      staticClass: "el-submenu__title el-menu-item",
      class: _vm.$route.path == item.children[0].path ? 'is-active' : '',
      staticStyle: {
        "padding-left": "20px",
        "height": "56px",
        "line-height": "56px",
        "padding": "0 20px"
      },
      on: {
        "click": function($event) {
          _vm.$router.push(item.children[0].path)
        }
      }
    }, [_c('i', {
      class: item.iconCls
    })])])]], 2) : _vm._e()
  }))], 1), _vm._v(" "), _c('section', {
    staticClass: "content-container"
  }, [_c('div', {
    staticClass: "grid-content bg-purple-light"
  }, [_c('el-col', {
    staticClass: "content-wrapper",
    attrs: {
      "span": 24
    }
  }, [_c('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [_c('router-view')], 1)], 1)], 1)])])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 325:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', [_c('el-col', {
    staticClass: "tool-bar",
    attrs: {
      "span": 24
    }
  }, [_c('p', {
    staticClass: "title fl"
  }, [_vm._v("反馈列表")])]), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 24
    }
  }, [_c('el-table', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: (_vm.loading),
      expression: "loading"
    }],
    staticStyle: {
      "width": "100%",
      "height": "90%"
    },
    attrs: {
      "data": _vm.list,
      "highlight-current-row": "",
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "entryApplyId",
      "label": "编号",
      "width": "80"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "userName",
      "label": "姓名",
      "width": "180"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "mobile",
      "label": "手机号",
      "width": "180"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "wechat",
      "label": "微信号",
      "width": "180"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "note",
      "label": "经验产品/服务"
    }
  })], 1), _vm._v(" "), _c('el-pagination', {
    staticClass: "page fr",
    attrs: {
      "current-page": _vm.curPage,
      "page-size": _vm.pageSize,
      "total": _vm.total,
      "layout": "total, prev, pager, next"
    },
    on: {
      "current-change": _vm.curChange
    }
  })], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 326:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', [_c('el-col', {
    staticClass: "tool-bar",
    attrs: {
      "span": 24
    }
  }, [_c('p', {
    staticClass: "title fl"
  }, [_vm._v("用户列表")]), _vm._v(" "), _c('el-input', {
    staticClass: "fr",
    attrs: {
      "placeholder": "搜索用户手机号／用户名"
    }
  })], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 24
    }
  }, [_c('el-table', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: (_vm.loading),
      expression: "loading"
    }],
    staticStyle: {
      "width": "100%",
      "height": "90%"
    },
    attrs: {
      "data": _vm.list,
      "highlight-current-row": "",
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "type": "index",
      "label": "#",
      "width": "60"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "userId",
      "label": "用户ID",
      "width": "80",
      "show-overflow-tooltip": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "userName",
      "label": "用户昵称",
      "min-width": "150",
      "show-overflow-tooltip": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "操作",
      "width": "200"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return undefined
      }
    }])
  })], 1), _vm._v(" "), _c('el-pagination', {
    staticClass: "page fr",
    attrs: {
      "current-page": _vm.curPage,
      "page-size": _vm.pageSize,
      "total": _vm.total,
      "layout": "total, prev, pager, next"
    },
    on: {
      "current-change": _vm.curChange
    }
  })], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 327:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [_c('router-view')], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-form', {
    ref: "form",
    staticClass: "demo-ruleForm login-container",
    attrs: {
      "model": _vm.formdata,
      "rules": _vm.rules,
      "label-position": "left",
      "label-width": "0px"
    }
  }, [_c('div', {
    staticClass: "left"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(315),
      "alt": "logo"
    }
  }), _vm._v(" "), _c('p', [_vm._v("YUP-共享潮牌电商")]), _vm._v(" "), _c('p', [_vm._v("后台管理系统")])]), _vm._v(" "), _c('div', {
    staticClass: "right"
  }, [_c('el-form-item', {
    attrs: {
      "prop": "account"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "text",
      "auto-complete": "off",
      "placeholder": "请输入用户账号"
    },
    model: {
      value: (_vm.formdata.account),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "account", $$v)
      },
      expression: "formdata.account"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "checkPass"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "password",
      "auto-complete": "off",
      "placeholder": "请输入密码"
    },
    model: {
      value: (_vm.formdata.password),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "password", $$v)
      },
      expression: "formdata.password"
    }
  })], 1), _vm._v(" "), _c('el-checkbox', {
    staticClass: "remember",
    attrs: {
      "checked": ""
    },
    model: {
      value: (_vm.checked),
      callback: function($$v) {
        _vm.checked = $$v
      },
      expression: "checked"
    }
  }, [_vm._v("记住密码")]), _vm._v(" "), _c('el-form-item', {
    staticStyle: {
      "width": "100%"
    }
  }, [_c('el-button', {
    staticClass: "login",
    attrs: {
      "loading": _vm.logining
    },
    nativeOn: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v("立即登录")])], 1)], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 329:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', [_c('el-col', {
    attrs: {
      "span": 24
    }
  }, [_c('div', {
    staticClass: "header"
  }, [_c('el-col', {
    staticClass: "item",
    attrs: {
      "span": 6
    }
  }, [_c('p', {
    staticClass: "num"
  }, [_vm._v(_vm._s(_vm.countData.userCount))]), _vm._v(" "), _c('p', {
    staticClass: "name"
  }, [_vm._v("用户总数")])]), _vm._v(" "), _c('el-col', {
    staticClass: "item",
    attrs: {
      "span": 6
    }
  }, [_c('p', {
    staticClass: "num"
  }, [_vm._v(_vm._s(_vm.countData.proCount))]), _vm._v(" "), _c('p', {
    staticClass: "name"
  }, [_vm._v("试用商品总数")])]), _vm._v(" "), _c('el-col', {
    staticClass: "item",
    attrs: {
      "span": 6
    }
  }, [_c('p', {
    staticClass: "num"
  }, [_vm._v(_vm._s(_vm.countData.todayUserCount))]), _vm._v(" "), _c('p', {
    staticClass: "name"
  }, [_vm._v("今日新增用户总数")])]), _vm._v(" "), _c('el-col', {
    staticClass: "item",
    attrs: {
      "span": 6
    }
  }, [_c('p', {
    staticClass: "num"
  }, [_vm._v(_vm._s(_vm.countData.todayApplyUserCount))]), _vm._v(" "), _c('p', {
    staticClass: "name"
  }, [_vm._v("今日申请用户总数 ")])])], 1), _vm._v(" "), _c('p', {
    staticClass: "tip"
  }, [_vm._v("快捷入口")]), _vm._v(" "), _c('div', {
    staticClass: "quick-enter"
  }, [_c('router-link', {
    staticClass: "item",
    attrs: {
      "to": "trial"
    }
  }, [_vm._v("管理试用")]), _vm._v(" "), _c('router-link', {
    staticClass: "item",
    attrs: {
      "to": "feedback"
    }
  }, [_vm._v("用户反馈")])], 1)])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 330:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', [_c('el-col', {
    staticClass: "tool-bar",
    attrs: {
      "span": 24
    }
  }, [_c('el-form', {
    attrs: {
      "inline": true
    }
  }, [_c('el-form-item', {
    staticClass: "fl"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v("试用列表")])]), _vm._v(" "), _c('el-form-item', {
    staticClass: "fr"
  }, [_c('el-input', {
    staticClass: "fl",
    attrs: {
      "placeholder": "搜索"
    }
  }), _vm._v(" "), _c('el-button', {
    staticClass: "fl",
    attrs: {
      "type": "primary"
    }
  }, [_vm._v("搜索")]), _vm._v(" "), _c('el-button', {
    staticClass: "fl",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.addTrial
    }
  }, [_vm._v("添加试用")])], 1)], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 24
    }
  }, [_c('el-table', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: (_vm.loading),
      expression: "loading"
    }],
    staticStyle: {
      "width": "100%",
      "height": "90%"
    },
    attrs: {
      "data": _vm.trials,
      "highlight-current-row": "",
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "proId",
      "width": "70",
      "label": "编号"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "proName",
      "label": "标题"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "sellingPrice",
      "label": "原价"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "proCount",
      "width": "80",
      "label": "数量"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "peopleNum",
      "width": "120",
      "label": "申请人数"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "width": "120",
      "label": "操作"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('a', {
          staticClass: "detail",
          attrs: {
            "href": "javascript:;"
          },
          on: {
            "click": function($event) {
              _vm.showDetail(scope.row.proId, scope.row.status)
            }
          }
        }, [_vm._v("查看详情")])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "status",
      "width": "150",
      "label": "状态",
      "filters": _vm.stateOpts,
      "filter-multiple": false,
      "filter-method": _vm.filterState
    }
  })], 1), _vm._v(" "), (_vm.proTotal > 10) ? _c('el-pagination', {
    staticClass: "page fr",
    attrs: {
      "current-page": _vm.currentPage,
      "page-size": _vm.proSize,
      "layout": "total, prev, pager, next",
      "prev-text": "上一页",
      "next-text": "下一页",
      "total": _vm.proTotal
    },
    on: {
      "current-change": _vm.handleCurrentChange,
      "update:currentPage": function($event) {
        _vm.currentPage = $event
      }
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": _vm.dialogTitle,
      "visible": _vm.showDialog,
      "custom-class": "edit-dialog",
      "fullscreen": _vm.fullscreen
    },
    on: {
      "update:visible": function($event) {
        _vm.showDialog = $event
      }
    }
  }, [_c('el-form', {
    ref: "form",
    style: ({
      'max-height': _vm.maxFormHeight
    }),
    attrs: {
      "model": _vm.formdata,
      "label-width": "100px",
      "rules": _vm.rules,
      "size": "small"
    }
  }, [_c('p', {
    staticClass: "label"
  }, [_vm._v("试用信息")]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "标题",
      "prop": "proName"
    }
  }, [(!_vm.read) ? _c('el-input', {
    model: {
      value: (_vm.formdata.proName),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "proName", $$v)
      },
      expression: "formdata.proName"
    }
  }) : _c('p', {
    staticClass: "read"
  }, [_vm._v(_vm._s(_vm.formdata.proName))])], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "数量",
      "prop": "proCount"
    }
  }, [(!_vm.read) ? _c('el-input', {
    model: {
      value: (_vm.formdata.proCount),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "proCount", _vm._n($$v))
      },
      expression: "formdata.proCount"
    }
  }) : _c('p', {
    staticClass: "read"
  }, [_vm._v(_vm._s(_vm.formdata.proCount))])], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "售价",
      "prop": "sellingPrice"
    }
  }, [(!_vm.read) ? _c('el-input', {
    model: {
      value: (_vm.formdata.sellingPrice),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "sellingPrice", _vm._n($$v))
      },
      expression: "formdata.sellingPrice"
    }
  }) : _c('p', {
    staticClass: "read"
  }, [_vm._v(_vm._s(_vm.formdata.sellingPrice))])], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "封面",
      "prop": "coverImg"
    }
  }, [(!_vm.read) ? _c('el-upload', {
    staticClass: "front-pic",
    attrs: {
      "action": _vm.uploadUrl,
      "show-file-list": false,
      "multiple": false,
      "before-upload": _vm.beforeUpload,
      "accept": "image/*",
      "on-success": _vm.frontSuccess,
      "on-error": _vm.uploadError,
      "limit": 1
    }
  }, [(_vm.formdata.coverImg) ? _c('img', {
    staticClass: "front-img loading-target",
    attrs: {
      "src": _vm.formdata.coverImg,
      "alt": ""
    }
  }) : _c('i', {
    staticClass: "el-icon-plus front-icon loading-target"
  })]) : _c('img', {
    staticClass: "front-img",
    attrs: {
      "src": _vm.formdata.coverImg
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "轮播",
      "prop": "proBannerImgList"
    }
  }, [(!_vm.read) ? [(_vm.edit && _vm.formdata.proBannerImgList && _vm.formdata.proBannerImgList.length > 0) ? _vm._l((_vm.formdata.proBannerImgList), function(img, index) {
    return _c('a', {
      key: 'b' + index,
      staticClass: "uploaded",
      attrs: {
        "href": "javascript:;"
      }
    }, [_c('img', {
      staticClass: "front-img",
      attrs: {
        "src": img.imgUrl
      }
    }), _vm._v(" "), _c('i', {
      staticClass: "del el-icon-delete",
      on: {
        "click": function($event) {
          _vm.deleteImg(img.imgUrl)
        }
      }
    })])
  }) : _vm._e(), _vm._v(" "), _c('el-upload', {
    staticClass: "front-pic",
    attrs: {
      "action": _vm.uploadUrl,
      "list-type": "picture-card",
      "accept": "image/*",
      "on-success": _vm.bannerSuccess,
      "on-error": _vm.uploadError,
      "on-remove": _vm.removeBanner,
      "limit": 10
    }
  }, [_c('i', {
    staticClass: "el-icon-plus front-icon loading-target"
  })])] : _vm._l((_vm.formdata.proBannerImgList), function(img, index) {
    return _c('img', {
      key: 'b' + index,
      staticClass: "front-img fl",
      staticStyle: {
        "margin-right": "10px"
      },
      attrs: {
        "src": img.imgUrl
      }
    })
  })], 2), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "上架",
      "prop": "proStartTime"
    }
  }, [(!_vm.read) ? _c('el-date-picker', {
    attrs: {
      "type": "datetime",
      "format": "yyyy-MM-dd HH:mm",
      "value-format": "yyyy-MM-dd HH:mm"
    },
    model: {
      value: (_vm.formdata.proStartTime),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "proStartTime", $$v)
      },
      expression: "formdata.proStartTime"
    }
  }) : _c('el-date-picker', {
    staticClass: "read",
    attrs: {
      "format": "yyyy-MM-dd HH:mm",
      "disabled": ""
    },
    model: {
      value: (_vm.formdata.proStartTime),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "proStartTime", $$v)
      },
      expression: "formdata.proStartTime"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "开奖",
      "prop": "proEndTime"
    }
  }, [(!_vm.read) ? _c('el-date-picker', {
    attrs: {
      "type": "datetime",
      "format": "yyyy-MM-dd HH:mm",
      "value-format": "yyyy-MM-dd HH:mm"
    },
    model: {
      value: (_vm.formdata.proEndTime),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "proEndTime", $$v)
      },
      expression: "formdata.proEndTime"
    }
  }) : _c('el-date-picker', {
    staticClass: "read",
    attrs: {
      "format": "yyyy-MM-dd HH:mm",
      "disabled": ""
    },
    model: {
      value: (_vm.formdata.proEndTime),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "proEndTime", $$v)
      },
      expression: "formdata.proEndTime"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "开奖形式",
      "required": ""
    }
  }, [(!_vm.read) ? _c('el-radio-group', {
    model: {
      value: (_vm.formdata.lotteryType),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "lotteryType", $$v)
      },
      expression: "formdata.lotteryType"
    }
  }, [_c('el-radio', {
    attrs: {
      "label": 1
    }
  }, [_vm._v("自动")]), _vm._v(" "), _c('el-radio', {
    attrs: {
      "label": 2
    }
  }, [_vm._v("手动")]), _vm._v(" "), _c('label', {
    staticClass: "radio-tip"
  }, [_vm._v("(请确保在开奖时间前选择中奖名单)")])], 1) : _c('el-radio-group', {
    model: {
      value: (_vm.formdata.lotteryType),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "lotteryType", $$v)
      },
      expression: "formdata.lotteryType"
    }
  }, [_c('el-radio', {
    attrs: {
      "label": 1,
      "disabled": ""
    }
  }, [_vm._v("自动")]), _vm._v(" "), _c('el-radio', {
    attrs: {
      "label": 2,
      "disabled": ""
    }
  }, [_vm._v("手动")])], 1)], 1), _vm._v(" "), _c('p', {
    staticClass: "label"
  }, [_vm._v("试用规则")]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "规则",
      "prop": "proDescribe"
    }
  }, [(!_vm.read) ? _c('el-input', {
    staticStyle: {
      "width": "300px"
    },
    attrs: {
      "type": "textarea",
      "autosize": {
        minRows: 2,
        maxRows: 10
      },
      "resize": "vertical"
    },
    model: {
      value: (_vm.formdata.proDescribe),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "proDescribe", $$v)
      },
      expression: "formdata.proDescribe"
    }
  }) : _c('p', {
    staticClass: "read txt"
  }, [_vm._v(_vm._s(_vm.formdata.proDescribe))])], 1), _vm._v(" "), _c('p', {
    staticClass: "label"
  }, [_vm._v("商品信息")]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "颜色",
      "prop": "color"
    }
  }, [(!_vm.read) ? _c('el-input', {
    model: {
      value: (_vm.formdata.color),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "color", $$v)
      },
      expression: "formdata.color"
    }
  }) : _c('p', {
    staticClass: "read"
  }, [_vm._v(_vm._s(_vm.formdata.color))])], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "国家",
      "prop": "country"
    }
  }, [(!_vm.read) ? _c('el-input', {
    model: {
      value: (_vm.formdata.country),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "country", $$v)
      },
      expression: "formdata.country"
    }
  }) : _c('p', {
    staticClass: "read"
  }, [_vm._v(_vm._s(_vm.formdata.country))])], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "价格",
      "prop": "consultPrice"
    }
  }, [(!_vm.read) ? _c('el-input', {
    model: {
      value: (_vm.formdata.consultPrice),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "consultPrice", _vm._n($$v))
      },
      expression: "formdata.consultPrice"
    }
  }) : _c('p', {
    staticClass: "read"
  }, [_vm._v(_vm._s(_vm.formdata.consultPrice))])], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "品牌",
      "prop": "brand"
    }
  }, [(!_vm.read) ? _c('el-input', {
    model: {
      value: (_vm.formdata.brand),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "brand", $$v)
      },
      expression: "formdata.brand"
    }
  }) : _c('p', {
    staticClass: "read"
  }, [_vm._v(_vm._s(_vm.formdata.brand))])], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "品类",
      "prop": "category"
    }
  }, [(!_vm.read) ? _c('el-input', {
    model: {
      value: (_vm.formdata.category),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "category", $$v)
      },
      expression: "formdata.category"
    }
  }) : _c('p', {
    staticClass: "read"
  }, [_vm._v(_vm._s(_vm.formdata.category))])], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "材质",
      "prop": "material"
    }
  }, [(!_vm.read) ? _c('el-input', {
    model: {
      value: (_vm.formdata.material),
      callback: function($$v) {
        _vm.$set(_vm.formdata, "material", $$v)
      },
      expression: "formdata.material"
    }
  }) : _c('p', {
    staticClass: "read"
  }, [_vm._v(_vm._s(_vm.formdata.material))])], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "图片",
      "prop": "decsImg"
    }
  }, [(!_vm.read) ? _c('el-upload', {
    staticClass: "front-pic",
    attrs: {
      "action": _vm.uploadUrl,
      "show-file-list": false,
      "multiple": false,
      "before-upload": _vm.beforeUpload,
      "accept": "image/*",
      "on-success": _vm.goodsSuccess,
      "on-error": _vm.uploadError,
      "limit": 1
    }
  }, [(_vm.formdata.decsImg) ? _c('img', {
    staticClass: "front-img loading-target",
    attrs: {
      "src": _vm.formdata.decsImg,
      "alt": ""
    }
  }) : _c('i', {
    staticClass: "el-icon-plus front-icon loading-target"
  })]) : _c('img', {
    staticClass: "front-img",
    attrs: {
      "src": _vm.formdata.decsImg,
      "alt": ""
    }
  })], 1), _vm._v(" "), (_vm.read && _vm.dialogState == '已结束') ? [_c('p', {
    staticClass: "label"
  }, [_vm._v("中奖名单")]), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "width": "100%",
      "max-height": "200px"
    },
    attrs: {
      "data": _vm.winnerUsers,
      "highlight-current-row": "",
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "useId",
      "width": "60",
      "label": "ID"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "userNickName",
      "width": "120",
      "label": "用户昵称",
      "show-overflow-tooltip": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "userAddressName",
      "width": "120",
      "label": "收货名称",
      "show-overflow-tooltip": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "userMobile",
      "width": "130",
      "label": "手机号"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "userAddress",
      "label": "收货地址",
      "min-width": "200",
      "show-overflow-tooltip": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "userApplyTime",
      "label": "申请时间",
      "width": "180"
    }
  })], 1)] : _vm._e()], 2), _vm._v(" "), (!_vm.read && !_vm.edit) ? _c('template', {
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    attrs: {
      "type": "success"
    },
    on: {
      "click": _vm.saveProduct
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('el-button', {
    on: {
      "click": function($event) {
        _vm.showDialog = false
      }
    }
  }, [_vm._v("取消")])], 1) : _vm._e(), _vm._v(" "), (_vm.read) ? _c('template', {
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [((_vm.dialogState != '已开奖' && _vm.dialogState != '已结束')) ? _c('el-button', {
    attrs: {
      "type": "success"
    },
    on: {
      "click": _vm.editTrial
    }
  }, [_vm._v("编辑")]) : _vm._e(), _vm._v(" "), (_vm.dialogState == '待开奖') ? _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.lottery
    }
  }, [_vm._v("开奖")]) : _vm._e(), _vm._v(" "), (_vm.dialogState == '待发布') ? _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.publish
    }
  }, [_vm._v("发布")]) : _vm._e()], 1) : _vm._e(), _vm._v(" "), (_vm.edit) ? _c('template', {
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.showDialog = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "success"
    },
    on: {
      "click": _vm.saveProduct
    }
  }, [_vm._v("保存")])], 1) : _vm._e()], 2), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "visible": _vm.showLotteryDialog,
      "fullscreen": "",
      "custom-class": "lot-dialog"
    },
    on: {
      "update:visible": function($event) {
        _vm.showLotteryDialog = $event
      }
    }
  }, [_c('template', {
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_c('div', {
    staticClass: "lot-head"
  }, [_c('p', {
    staticClass: "lot-title fl"
  }, [_vm._v("试用列表-查看详情-开奖 ( " + _vm._s(_vm.selectedUser) + " / " + _vm._s(_vm.lotTotal) + " )")])])]), _vm._v(" "), _c('el-table', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: (_vm.loading),
      expression: "loading"
    }],
    staticStyle: {
      "width": "100%",
      "height": "90%"
    },
    style: ({
      'max-height': _vm.maxFormHeight
    }),
    attrs: {
      "data": _vm.toLotUsers,
      "highlight-current-row": "",
      "border": ""
    },
    on: {
      "select": _vm.selectUser,
      "select-all": _vm.selectAllUser
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "userId",
      "width": "60",
      "label": "ID"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "userName",
      "width": "120",
      "label": "用户昵称",
      "show-overflow-tooltip": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "mobile",
      "width": "140",
      "label": "手机号"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "userAddress",
      "min-width": "200",
      "label": "收货地址",
      "show-overflow-tooltip": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "width": "100",
      "label": "操作",
      "type": "selection"
    }
  })], 1), _vm._v(" "), _c('el-pagination', {
    staticClass: "page fr",
    attrs: {
      "current-page": _vm.lotCurPage,
      "page-size": _vm.lotPageSize,
      "layout": "total, prev, pager, next",
      "prev-text": "上一页",
      "next-text": "下一页",
      "total": _vm.lotTotal
    },
    on: {
      "current-change": _vm.lotCurChange,
      "update:currentPage": function($event) {
        _vm.lotCurPage = $event
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "clearFix"
  }), _vm._v(" "), _c('template', {
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.showLotteryDialog = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "success"
    },
    on: {
      "click": _vm.chooseUsers
    }
  }, [_vm._v("确定")])], 1)], 2)], 1)
},staticRenderFns: []}

/***/ })

},[249]);
//# sourceMappingURL=app.98aaf487fa9e1144dd41.js.map