<template>
  <el-menu
    :default-active="$route.path"
    background-color="#545c64"
    text-color="#fff"
    unique-opened
  >
    <h3>后台管理系统</h3>
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <router-link to="/">首页</router-link>
    </el-menu-item>
    <el-submenu
      v-for="(item, index) in menus"
      :key="index"
      :index="(index + 1).toString()"
    >
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </template>
      <el-menu-item-group>
        <!-- submenu：子菜单 -->
        <el-menu-item
          v-for="(tiem, index) in item.children"
          :key="index"
          :index="tiem.url"
        >
          <router-link :to="tiem.url">{{ tiem.title }}</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "HelloWorld",
  computed: {
    menus() {
      return this.$store.state.info.menus;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-menu {
  overflow: hidden;
  height: 100%;
  h3 {
    font-size: 24px;
    margin: 20px;
    color: #fff;
  }
  .el-menu-item.is-active {
    color: #00f;
  }
  .is-active {
    .router-link-exact-active {
      color: #f00;
    }
  }
}
</style>
