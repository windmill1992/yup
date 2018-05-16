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
            <el-table-column prop="op" width="120" label="操作"></el-table-column>
            <el-table-column prop="state" :render-header="renderHeader" width="120" label="状态-"></el-table-column>
          </el-table>
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
          op: '<a href="">查看详情</a>',
          state: "0"
        }
      ],
      stateOpts: [
        { label: "全部", value: "all" },
        { label: "待发布", value: "unpub" },
        { label: "待开奖", value: "unprize" },
        { label: "已结束", value: "end" }
      ],
      state: "全部",
      loading: false
    };
  },
  methods: {
    renderHeader(createElement, { _self }) {
      return createElement(
        "el-select",
        {
            attrs: { "value": this.state },
            on: { change: this.handleHeader1 },
            
        },
        [
            createElement(
                "el-option",
                {
                    attrs: { "label": "全部", "value": "all"}
                }
            ),
            createElement(
                "el-option",
                {
                    attrs: { "label": "待发布", "value": "unpub"}
                }
            ),
            createElement(
                "el-option",
                {
                    attrs: { "label": "待开奖", "value": "unprize"}
                }
            ),
            createElement(
                "el-option",
                {
                    attrs: { "label": "已结束", "value": "end"}
                }
            ),
        ]
      )
    },
    handleHeader1() {

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
</style>
