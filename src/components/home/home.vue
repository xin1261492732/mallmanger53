<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">
          <img src="../../assets/logo.png" alt="无法显示图片">
        </div></el-col>
        <el-col :span="18" class="middle">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="2"><div class="grid-content bg-purple">
          <a href="#" class="loginout" @click.prevent="handleSignout()">退出</a>
        </div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!--侧边栏导航-->
        <!--开启路由模式-->
        <el-menu
          :router="true"
        :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <!--<template slot="title">分组一</template>-->
            <el-menu-item index="users">
                  <i class="el-icon-menu"></i>
                  <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
         <!---->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限列表</span>
            </template>
            <el-menu-item index="role">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="rights">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <!---->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品列表</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <!---->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <!---->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // newVue之前自动触发
  beforeCreate () {
    // 获取token
    const token = localStorage.getItem('token')
    if (!token) {
      // token 没有 -> 登录
      this.$router.push({name: 'login'})
    }
    // if token 有 -> 继续渲染组件
  },
  methods: {
    // 退出按钮
    handleSignout () {
      // 1.清除token
      localStorage.removeItem('token')
      // 2.提示
      this.$message.success('退出成功')
      // 3.来到login组件
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style>
 .container{
  height: 100%;
  overflow: hidden;
 }
  .header{
    background-color: #b3c0d1;
  }
  .aside{
    background-color: #b3dce6;
  }
  .main{
    background-color: #e9eef3;
  }
  /*头部样式*/
  .middle{
    text-align: center;
  }
  .loginout{
    line-height: 60px;
    text-decoration: none;
  }
</style>
