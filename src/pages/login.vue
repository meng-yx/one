<template>
  <div class="login-bg">
    <div class="login-container">
      <h2>登录</h2>
      <el-form :model="form" :rules="rules" ref="loginform">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="el-button" @click="submint('loginform')" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        // 验证规则名称，每一个对象都是一条验证规则
        username: [
          {
            required: true, //必填项
            message: "请输入账号", //提示信息
            trigger: "blur", //失去焦点时触发验证
          },
          {
            pattern: /^\S{5,16}$/g,
            message: "请输入4-8非空字符",
            trigger: "blur", //失去焦点时触发验证
          },
        ],
        password: [
          {
            required: true, //必填项
            message: "请输入密码", //提示信息
            trigger: "blur", //失去焦点时触发验证
          },
          {
            max: 16,
            min: 6,
            message: "请输入6-16位密码",
            trigger: "blur", //失去焦点时触发验证
          },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(["setinfo"]),
    ...mapActions(["login"]),
    // login() {
    //   axios.post("/api/userlogin", this.form).then((res) => {
    //     console.log(res);
    //     if (res.data.code == 200) {
    //       sessionStorage.setItem("isLogin", true);
    //       this.$router.replace("/");
    //     }
    //   });
    // },
    submint(form){
      this.$refs[form].validate(value=>{
        if(!value){
          return false;
        }
        this.login(this.form);
        // this.$http.post('/api/userlogin',this.form).then(res=>{
        //   console.log(res);
        //   if(res.code == 200){
        //     this.setinfo({token:res.list.token,info:res.list});
        //     this.$router.replace("/");
        //   }else{
        //     this.$message.error(res.msg)
        //   }
        // })
      })
    }
  },
};
</script>
<style lang="stylus">
.login-bg {
  height: 100%;
  background: -webkit-linear-gradient(left, #563443, #413a53, #2f3d60);

  .login-container {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    width: 300px;
    height: 250px;

    h2 {
      color: #fff;
      margin-bottom: 20px;
      font-size 30px
      font-weight 1000
    }

    .el-button {
      width: 100%;
    }
  }
}
</style>