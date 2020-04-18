<template>
  <el-card>
    <!--1.面包屑 -->
    <my-bread leve1="权限管理" leve2="权限列表"></my-bread>

    <el-row class="addrolebtn">
      <el-col>
        <el-button type="info">添加角色</el-button>
      </el-col>
    </el-row>

    <!--2.表格-->
    <el-table :data="rolelist" style="width: 100%">

      <el-table-column type="expand"   width="150">
        <template slot-scope="scope">
          <el-row v-for="(item1, i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag>{{item1.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col :span="4">

                </el-col>
                <el-col :span="20"></el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column type="index"  label="#"  width="150">
      </el-table-column>

      <el-table-column prop="roleName" label="角色名称" width="200">
      </el-table-column>

      <el-table-column prop="roleDesc" label="角色描述" width="200">
      </el-table-column>

      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button  size="mini"
                        plain type="primary"
                        icon="el-icon-edit"
                        circle @click="showEditRole(scope.row)"></el-button>
            <el-button size="mini"
                       plain type="danger"
                       icon="el-icon-delete"
                       circle @click="showDeleRole(scope.row.id)"></el-button>
            <el-button size="mini"
                       plain type="success"
                       icon="el-icon-check"
                       @click="showSerYserRole(scope.row)"
                       circle></el-button>
          </el-row>
        </template>

      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      rolelist: []
    }
  },
  created () {
    this.getRolelist()
  },
  methods: {
    // 删除用户 - 打开消息盒子
    // showDeleRole (userId) {
    //   this.$confirm('删除用户?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(async () => {
    //     // 发送请求: id ----> 用户id roles/:id
    //     // 1.data中找userId
    //     // 2.把userId以showDeleUserMsgBox参数形式传递进来
    //     const res = await this.$http.delete(`roles/${userId}`)
    //     const {meta: {status, msg}} = res.data
    //     if (status === 200) {
    //       this.pagenum = 1
    //       // 更新视图
    //       this.getRolelist()
    //       // 提示
    //       this.$message({
    //         type: 'success',
    //         message: msg
    //       })
    //     }
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    async getRolelist () {
      const res = await this.$http.get(`roles`)
      console.log(res)
      this.rolelist = res.data.data
    }
  }
}
</script>

<style>
 .addrolebtn {
  margin-top: 20px;
 }
</style>
