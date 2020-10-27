<template>
    <el-dropdown trigger="click"   @command="logout">
      <span class="el-dropdown-link">
        <samp>{{username}}</samp>
        <i class="el-icon-setting"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-delete">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
export default {
    props:["username"],
    methods: {
        logout(){
            this.$store.commit("clearinfo");
            this.$router.replace("/login");
        }
    },
}
</script>
<style lang="stylus">
    .el-dropdown{
        float:right
    }
</style>