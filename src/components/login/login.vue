<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button
        @click.prevent="handleLogin()"
        class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  }, // 登录请求
  methods: {
    async handleLogin () {
      const res = await this.$http.post('login', this.formdata)
      // 登录成功
      const {data, meta: {msg, status}} = res.data
      console.log(res)
      if (status === 200) {
        // 0 保存token
        localStorage.setItem('token', data.token)
        // 1.跳转home
        this.$router.push({ name: 'home' })
        // 2.提示成功
        this.$message.success(msg)
      } else {
        // 不成功
        // 1.提示消息
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style>
 .login-wrap {
   height: 100%;
   background-color: #324152;
   /*弹性盒布局*/
   display: flex;
   justify-content: center;
   align-content: center;
 }
  .login-wrap .login-form {
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
    height: 400px;
    margin-top:50px;
  }
  .login-wrap .login-btn {
    width: 100%;
  }
</style>
