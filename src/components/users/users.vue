<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
     <!--面包屑-->
      <!--/首页/ 活动管理/活动列表-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!--2.搜索-->
      <el-row class="searchRow">
        <el-col>
          <el-input placeholder="请输入内容"
                    v-model="query"
                    class="inputSearch">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success">添加用户</el-button>
        </el-col>
      </el-row>
      <!--3.表格-->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="#"
          width="60">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="80">
        </el-table-column>
        <el-table-column
          prop="address"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="address"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="address"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="用户状态">
        </el-table-column>
      </el-table>
      <!--4.翻页-->
    </div>
  </el-card>
</template>

<script>
  export default {
    data(){
      return{
        query:'',
        pagenum:1,
        pagesize:2,
        // 表格的数据
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }]
      }
    },
    created(){
     this.getUserList()
    },
    methods:{
      // 获取用户列表的请求
     async getUserList(){
       // query	查询参数	可以为空
       // pagenum	当前页码	不能为空
       // pagesize	每页显示条数	不能为空
       const AUTH_TOKEN = localStorage.getItem('token')
       this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
       const res = await  this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)

      }
    }
  }
</script>

<style>
 .box-card {
   height: 100%;
 }
  .inputSearch {
    width: 400px;
  }
  .searchRow {
    margin-top: 28px;
  }
</style>
