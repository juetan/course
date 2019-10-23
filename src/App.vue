<template>
  <div id="app">
    <header id="head">
        <h1 class="head-title"><img class="head-img" src="/static/images/logo.png" alt="在线课堂 - 大学生科技创新基地"></h1>
        <ul class="head-user" v-if="!username">
            <li><a  href="javascript:;" @click="show=true">登录/注册</a></li>
            <li><a href="/">已学课程</a></li>
            <li><a href="/">消息通知</a></li>
            <li><a href="/">个人中心</a></li>
        </ul>
        <ul class="head-user" v-else-if="type == 0">
            <li><a  href="javascript:;">{{username}}</a> <a href="javascipt:;" style="margin-left:5px" @click="loginOut">退出</a> </li>
            <li><router-link :to="{path:'/student/study'}">课程进度</router-link> </li>
            <li><router-link :to="{path:'/student/message'}">消息通知</router-link> </li>
            <li><router-link :to="{path:'/student'}">个人中心</router-link> </li>
        </ul>
        <ul class="head-user" v-else>
            <li><a  href="javascript:;">{{username}}</a> <a href="javascipt:;" style="margin-left:5px" @click="loginOut">退出</a> </li>
            <li><router-link :to="{path:'/teacher/course'}">课程管理</router-link> </li>
            <li><router-link :to="{path:'/teacher/message'}">消息管理</router-link> </li>
            <li><router-link :to="{path:'/teacher/living'}">开启直播</router-link> </li>
            <li><router-link :to="{path:'/teacher'}">个人中心</router-link> </li>
        </ul>
    </header>
    <nav id="nav">
        <el-menu class="nav-list" router  background-color="#545c64"  text-color="#fff" active-text-color="#ffd04b" mode="horizontal">
          <el-menu-item index="/">首页</el-menu-item>  
          <el-menu-item index="/student">学生中心</el-menu-item>
          <el-menu-item index="/teacher">教师中心</el-menu-item>
          <el-menu-item index="/live">课程直播</el-menu-item>
        </el-menu>        
    </nav>
    <main id="main">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <footer id="foot">
        <address class="foot-addr">
                <a href="#">网站简介</a> -
                <a href="#">客户服务</a> -
                <a href="#">法律条款</a> -
                <a href="#">建议提交</a> -
                <a href="#">联系方式</a> -
                <a href="#">关于我们</a>
            </address>
        <p class="foot-copy">Copy Arright 2019 &copy;大学生科技创新基地 - 科技改变未来，用心创造未来</p>
    </footer>
    <el-dialog title="通知" :visible.sync="show" width="450px" style="padding-top:0">
        <el-form :model="form" ref="form" label-width="80px" v-if="login">
          <el-form-item prop="username" :rules="rule()"><el-input v-model="form.username" placeholder="用户名" style="width:250px" :rules="rule()" prefix-icon="el-icon-user"></el-input></el-form-item>
          <el-form-item prop="password" :rules="rule()"><el-input v-model="form.password" type="password" placeholder="密码" :show-password="true" style="width:250px" prefix-icon="el-icon-lock"></el-input></el-form-item>
          <el-form-item>
            <el-button type="primary" width="100px" @click="login=false" style="width:120px">立即注册</el-button>
            <el-button type="primary" width="100px" @click="loginIn" style="width:120px">登录</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="newForm" ref="newForm" label-width="80px" v-else>
            <el-form-item prop="username" :rules="rule()" label="用户名">
              <el-input v-model="newForm.username" placeholder="请输入注册的用户名" style="width:250px"></el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="rule()" label="密码">
              <el-input v-model="newForm.password" placeholder="请输入密码" style="width:250px"></el-input>
            </el-form-item>
            <el-form-item prop="password2" :rules="[{validator:checkPassword,trigger:'blur'}]" label="确认密码">
              <el-input v-model="newForm.password2" placeholder="请再次输入密码" style="width:250px"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary"  style="width:120px" @click="login=true">返回登录</el-button>
              <el-button type="primary"  style="width:120px" @click="register">注册</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      type: null,
      username: null,
      token: null,
      data: null,
      show: false,
      form: {},
      login: true,
      newForm: {}
    }
  },
  methods: {
    checkPassword(rulw,value,callback) {
      if(value != this.newForm.password) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback()
      }
    },
    register() {
      this.$refs['newForm'].validate(valid=>{
        if(valid) {
          var reg = {"username":this.newForm.username,"password":this.newForm.password};
          this.$http.post('api/index/setUser',reg).then(res=>{
            if(res.data.status == 1) {
              this.$message({message:res.data.message,type:'success'});
              this.login = true;
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    },
    loginIn() {
      this.$refs['form'].validate(valid=>{
        if(valid) {
          this.$http.post('api/index/loginin',this.form).then(res=>{
            if(res.data.status == 1) {
              this.type = res.data.type;
              this.username = res.data.username;
              this.token = res.data.token;
              localStorage.setItem('username',res.data.username);
              localStorage.setItem('type',res.data.type);
              localStorage.setItem('token',res.data.token);
              this.$message({'message':res.data.message,'type':'success'});
              this.show = false;
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    },
    loginOut() {
      this.type = null;
      this.username = null;
      this.token = null;
      localStorage.clear();
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.type = localStorage.getItem('type');
    this.username = localStorage.getItem('username');
  }
}
</script>
<style lang="stylus">
  .fade-enter-active, .fade-leave-active 
    transition: opacity .5s;
  .fade-enter, .fade-leave-to 
    opacity: 0;
  .el-menu.el-menu--horizontal
    border-bottom none
  #head,#main,#foot 
    width: 1180px;
    margin: 0 auto;
  #head 
    position: relative;
    height: 100px;
    overflow: hidden;
    .head-title 
      color: #fff;
      .head-img 
        height: 100px;
    .head-user 
      position: absolute;
      top: 50px;
      right: 65px;
      font-size: 0;
      li 
        display: inline-block;
        margin: 0 5px;
  #nav
    background rgb(84, 92, 100)
    .nav-list
      width: 1180px
      margin: 0 auto
  #main
    height 684px
    margin: 10px auto
  #foot
    background: #e6e6e6;
    width: 100%;
    height: 100px;
    padding-top: 30px;
    text-align: center;
    .foot-addr
      font-style: normal;
      font-size: 14px;
      color: #333;
    .foot-copy
      font-size: 12px;
      color: #999;
      margin-top: 10px
</style>
