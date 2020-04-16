<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {}
</script>

<style>
 .container{
  height: 100%;
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
</style>
