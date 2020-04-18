<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{leve1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{leve2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'my-bread',
  data () {
    return {
    }
  },
  // props 值字符串数组
  // props 中的值的用法和data数据用法一样
  // props 中的数据的值 来源于使用数组时 传的值
  // props 中的数据也是该组件的属性 <cjild-a :msg="abc">
  props: ['leve1', 'leve2']
}
</script>

<style >

</style>
