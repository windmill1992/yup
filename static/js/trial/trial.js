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
        },
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
      dialogTitle: '',
      showDialog: false,
      sizeForm: {
        title: '',
        frontUrl: '',
        goodsUrl: '',
        prizeway: ''
      },
      read: false
    };
  },
  computed: {
    trialLen() {
      return this.trials.length;
    }
  },
  methods: {
    filterState(value, row) {
        this.state = value;
        if(value == '全部'){
            return true;
        }else{
            return row.state === value;
        }
    },
    handleCurrentChange(val) {

    },
    showDetail() {
      
    },
    add() {
      this.showDialog = true;
      this.dialogTitle = '试用列表-添加试用';
    },
    hideAdd() {
      this.showDialog = false;
    },
    frontSuccess() {

    },
    frontError() {

    },
    goodsSuccess() {

    },
    goodsError() {

    }
  }
};