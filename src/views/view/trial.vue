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
                <el-button type="primary" class="fl">添加试用</el-button>
            </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
          <el-table :data="trials" highlight-current-row v-loading="loading" style="width: 100%;" border height="400">
            <el-table-column prop="id" width="70" label="编号"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="originPrice" label="原价"></el-table-column>
            <el-table-column prop="num" width="80" label="数量"></el-table-column>
            <el-table-column prop="applyNum" width="120" label="申请人数"></el-table-column>
            <el-table-column width="120" label="操作">
                <template slot-scope="scope">
                    <a href="javascript:;" class="detail">查看详情</a>
                </template>
            </el-table-column>
            <el-table-column 
                prop="state" 
                width="150" 
                :label="'状态-'+ state" 
                :filters="stateOpts" 
                :filter-multiple="false" 
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
      currentPage: 1
    };
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

    }
  }
};
</script>

<style scoped>
@import url(./../../../static/css/base.css);
.tool-bar {
  white-space: nowrap;
}
.el-input {
  width: auto;
  margin-right: 10px;
}
.detail{
    text-decoration: underline;
    color: #333;
}
.page{
    margin-top: 20px;
}
</style>
