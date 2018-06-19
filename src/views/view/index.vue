<template>
    <el-row>
        <el-col :span="24">
            <div class="header">
                <el-col :span="6" class="item">
                    <p class="num">{{countData.userCount}}</p>
                    <p class="name">用户总数</p>
                </el-col>
                <el-col :span="6" class="item">
                    <p class="num">{{countData.proCount}}</p>
                    <p class="name">试用商品总数</p>
                </el-col>
                <el-col :span="6" class="item">
                    <p class="num">{{countData.todayUserCount}}</p>
                    <p class="name">今日新增用户总数</p>
                </el-col>
                <el-col :span="6" class="item">
                    <p class="num">{{countData.todayApplyUserCount}}</p>
                    <p class="name">今日申请用户总数 </p>
                </el-col>
            </div>
            <p class="tip">快捷入口</p>
            <div class="quick-enter">
                <!-- <router-link to="trial/add" class="item">添加试用</router-link> -->
                <router-link to="trial" class="item">管理试用</router-link>
                <router-link to="feedback" class="item">用户反馈</router-link>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { baseUrl } from "./../../api/baseUrl"
export default {
    data() {
        return {
            countData: {
                userCount: 0,
                todayUserCount: 0,
                todayApplyUserCount: 0,
                proCount: 0
            }
        }
    },
    methods: {
        getIndexData() {
            this.$http.get(`${baseUrl}/yup-rest/manage/index`, {})
            .then(res => {
                if(res.data.resultCode == 200){
                    if(res.data.resultData){
                        this.countData = res.data.resultData;
                    }
                }else{
                    this.$message.error(res.data.resultMsg);
                }
            })
            .catch(() => {
                this.$message.error('未知错误！');
            })
        }
    },
    mounted() {
        this.getIndexData();
    }
}
</script>

<style scoped>
    .header{
        padding: 10px 20px;
        background: #f2f2f2;
        overflow: hidden;
    }
    .header .item{
       text-align: center;
       font-size: 16px;
    }
    .header .item .num{
        font-size: 22px;
        font-weight: 600;
    }
    .tip{
        margin: 10px 0;
        font-size: 14px;
    }
    .quick-enter{
        padding: 0;
    }
    .quick-enter .item{
        display: inline-block;
        width: 150px;
        height: 150px;
        line-height: 150px;
        margin-right: 20px;
        text-align: center;
        background: #f2f2f2;
        color: #333;
        text-decoration: none;
    }
</style>
