<template>
  <el-card>
    <!--1.面包屑-->
    <my-bread leve1="权限管理" leve2="权限列表"></my-bread>
    <!--2.表格-->

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      rightlist: []
    }
  },
  created () {
    this.getRightlist()
  },
  methods: {
    async getRightlist () {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`rights/list`)
      console.log(res)
      this.rightlist = res.data.tdata
    }
  }
}
</script>

<style>

</style>
