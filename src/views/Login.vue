<template>
  <el-form :model="formdata" :rules="rules" ref="form" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <!-- <h3 class="title">系统登录</h3> -->
    <div class="left">
      <img src="./../assets/img/logo.png" alt="logo">
      <p>YUP-共享潮牌电商</p>
      <p>后台管理系统</p>
    </div>
    <div class="right">
      <el-form-item prop="account">
        <el-input type="text" v-model="formdata.account" auto-complete="off" placeholder="请输入用户账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="formdata.password" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="yzm">
        <el-input type="text" auto-complete="off" placeholder="请输入验证码">
          <template slot="append"><img src="" alt="验证码" class="yzm"></template>
        </el-input>
      </el-form-item> -->
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <!-- <a href="http://"  class="forget">忘记账号/密码</a> -->
      <el-form-item style="width:100%;">
        <el-button class="login" @click.native.prevent="handleSubmit" :loading="logining">立即登录</el-button>
        <!--<el-button @click.native.prevent="handleReset">重置</el-button>-->
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { baseUrl } from '../api/baseUrl';
import md5 from 'js-md5'

export default {
  data() {
    return {
      logining: false,
      formdata: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.logining = true;
          var loginParams = { username: this.formdata.account, password: '' };
          let pw = md5(this.formdata.password);
          this.$http.post(`${baseUrl}/yup-rest/login`, { 
            account: this.formdata.account,
            loginMethod: 1,
            password: pw
          })
          .then(res => {
            this.logining = false;
            if(res.data.resultCode == 200){
              if(res.data.resultData){
                if(this.checked){
                  loginParams.password = this.formdata.password;
                }
                sessionStorage.setItem('user', JSON.stringify(loginParams));
                this.$router.push({ path: '/index' });
              }else{
                this.$message.error('账户名或密码错误！');
              }
            }else{
              this.$message.error(res.data.resultMsg);
            }
            })
          .catch(() => {
            this.logining = false;
            this.$message.error('登录错误！');
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted() {
    let user = sessionStorage.getItem('user');
    this.checked = eval(localStorage.getItem('rememberPW'));
    if(user && user != '' && user != null){
      user = JSON.parse(user);
      this.formdata.account = user.username;
      if(user.password){
        this.formdata.password = user.password;
      }
    }
    const _this = this;
    document.body.addEventListener('keyup', function(e){
      if(e.keyCode == 13){
        _this.handleSubmit();
      }
    }, false);
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