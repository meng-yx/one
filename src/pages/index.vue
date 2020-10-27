<template>
  <div id="caid">
    <el-container class="side">
      <el-aside width="200px">
        <!-- <ul class="nav_bar">
          <li>
            <h3>
              <router-link to="/" exact-active-class="red">首页</router-link>
            </h3>
          </li>
          <li>
            <h3>
              <router-link to="/xtsz" exact-active-class="red">系统设置</router-link>
            </h3>
            <ul>
              <li>
                <router-link to="/cdgl" exact-active-class="red">菜单管理</router-link>
              </li>
              <li>
                <router-link to="/jsgl" exact-active-class="red">角色管理</router-link>
              </li>
              <li>
                <router-link to="/glygl" exact-active-class="red">管理员管理</router-link>
              </li>
            </ul>
          </li>
          <li>
            <h3>
              <router-link to="/scgl" exact-active-class="red">商城管理</router-link>
            </h3>
            <ul>
              <li>
                <router-link to="/spfl" exact-active-class="red">商品分类</router-link>
              </li>
              <li>
                <router-link to="/spgg" exact-active-class="red">商品规格</router-link>
              </li>
              <li>
                <router-link to="/spgl" exact-active-class="red">商品管理</router-link>
              </li>
              <li>
                <router-link to="/hygl" exact-active-class="red">会员管理</router-link>
              </li>
              <li>
                <router-link to="/lbtgl" exact-active-class="red">轮播图管理</router-link>
              </li>
              <li>
                <router-link to="/mshd" exact-active-class="red">秒杀活动</router-link>
              </li>
            </ul>
          </li>
        </ul> -->
        <chebian></chebian>
      </el-aside>
      <el-container class="main">
        <el-header class="header">
          <myheader :username="username"></myheader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import myheader from '../components/header'
import chebian from '../components/HelloWorld'
export default {
  components:{
    myheader,
    chebian
  },
  computed: {
    username(){
      return this.$store.state.info.username;
    }
  },
}
</script>
<style lang="">
.red {
  color: #f00;
}
.nav_bar {
  list-style: none;
  background-color: #3c3c3c;
  color: #fff;
  height: 100%;
}
li {
  padding: 7px 0px;
}
a {
  text-decoration: none;
  color: #fff;
}
.header {
  height: 60px;
  background-color: #e3e3e3;
}
.side {
  width: 250px;
  height: 100%;
}
.main {
  flex-grow: 1;
  background-color: cyan;
}
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
#caid {
  height: 100%;
  display: flex;
}
</style>
