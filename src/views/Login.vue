<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <!-- <h3 class="title">系统登录</h3> -->
    <div class="left">
      <img src="./../assets/img/logo.png" alt="logo">
      <p>YUP-共享潮牌电商</p>
      <p>后台管理系统</p>
    </div>
    <div class="right">
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="请输入用户账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="yzm">
        <el-input type="text" auto-complete="off" placeholder="请输入验证码">
          <template slot="append"><img src="" alt="验证码" class="yzm"></template>
        </el-input>
      </el-form-item> -->
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <!-- <a href="http://"  class="forget">忘记账号/密码</a> -->
      <el-form-item style="width:100%;">
        <el-button class="login" @click.native.prevent="handleSubmit2" :loading="logining">立即登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
  import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            sessionStorage.setItem('user', JSON.stringify(loginParams));
           // this.$router.push({ path: '/table' });
            this.logining = false;

            //sessionStorage.setItem('user', JSON.stringify(user));

            this.$router.push({ path: '/index' });
//            requestLogin(loginParams).then(data => {
//              this.logining = false;
//              //NProgress.done();
//              let { msg, code, user } = data;
//              if (code !== 200) {
//                this.$message({
//                  message: msg,
//                  type: 'error'
//                });
//              } else {
//                sessionStorage.setItem('user', JSON.stringify(user));
//                this.$router.push({ path: '/table' });
//              }
//            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 650px;
    padding: 65px 45px 55px 120px;
    background: #f2f2f2;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    overflow: hidden;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .left{
    width: 150px;
    float: left;
    text-align: center;
    color: #555;
    line-height: 1.6;
    margin-top: 70px;
  }
  .left img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
  .left p{
    margin: 0;
  }
  .right{
    width: 220px;
    float: right;
    background: #fff;
    padding: 20px 20px 0;
  }
  .right .el-input__inner{
    border: none;
    border-bottom: 1px solid #f1f1f1;
  }
  .right .yzm{
    width: 100px;
    height: 28px;
  }
  .right .forget{
    color: #999;
    font-size: 13px;
    text-decoration: none;
    margin-left: 10px;
  }
  .right .login{
    width: 100%;
    background: #333;
    color: #fff;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
</style>