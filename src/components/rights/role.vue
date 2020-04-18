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
              <!--传角色id 和 权限id-->
              <el-tag @close="deleRight(scope.row, item1.id)" closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2, i) in item1.children" :key="i">

              <el-col :span="4">
                <el-tag @close="deleRight(scope.row, item2.id)" closable type="success">{{item2.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>

              <el-col :span="20">
                <el-tag @close="deleRight(scope.row, item3.id)" closable v-for="(item3, i) in item2.children" :key="i" type="warning">
                  {{item3.authName}}
                </el-tag>
              </el-col>
            </el-row>
            </el-col>
          </el-row>

          <!--无权限的提示-->
          <span v-if="scope.row.children.length===0">未分配权限</span>
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
                       @click="showSetYserRole(scope.row)"
                       circle></el-button>
        </template>
      </el-table-column>
    </el-table>
     <!--修改权限打的对话框-->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRole">
      <!--
      树形结构
      :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]">
        :default-expanded-keys="arrexpand"
      -->
      <el-tree
        ref="tree"
        :data="treelist"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrcheck"
        :props="defaultProps">
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      rolelist: [],
      // 树形结构的数据
      treelist: [],
      dialogFormVisibleRole: false,
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      // arrexpand: []
      arrcheck: [],
      currRoleId: -1
    }
  },
  created () {
    this.getRolelist()
  },
  methods: {
    // 修改权限 - 发送请求
    async setRoleRight () {
      this.dialogFormVisibleRole = false
      // roles/:roleId/rights
      // roleId当前要修改授权的角色id
      // rids 树形节点中 所有全选和板悬的label的id []
      // 获取全选的id数据arr1 getCheckedKeys()
      // 1.给要操作的dom元素  设置ref
      let arr1 = this.$refs.tree.getCheckedKeys()
      // 2.this.$refs.ref属性值.js方法名() this.$refs.txt.foucs()
      // 获取半选id的数据arr2  getHalfCheckedKeys()
      let arr2 = this.$refs.tree.getHalfCheckedKeys()

      let arr = [...arr1, ...arr2]
      const res = await this.$http.post(`roles/${this.currRoleId}/rights`,
        {rids: arr.join(',')
        })
      // 更新视图
      this.getRolelist()
    },
    // 分配权限 - 打开对话框
    async showSetYserRole (role) {
      // 给currRoleId赋值
      this.currRoleId = role.id
      // 获取树形结构的数据
      const res = await this.$http.get(`rights/tree`)
      // console.log(res)
      this.treelist = res.data.data

      // var arrtemp1 = []
      // this.treelist.forEach(item1 => {
      //   arrtemp1.push(item1.id)
      //   item1.children.forEach(item2 => {
      //     arrtemp1.push(item2.id)
      //     item2.children.forEach(item3 => {
      //       arrtemp1.push(item3.id)
      //     })
      //   })
      // })
      // this.arrexpand = arrtemp1

      // 获取当前角色role 的权限id
      let arrtemp2 = []
      role.children.forEach(item1 => {
        // arrtemp2.push(item1.id)
        item1.children.forEach(item2 => {
          // arrtemp2.push(item2.id)
          item2.children.forEach(item3 => {
            arrtemp2.push(item3.id)
          })
        })
      })
      this.arrcheck = arrtemp2
      this.dialogFormVisibleRole = true
    },
    // 取消权限
    async deleRight (role, rightId) {
      // roles/:roleId/rights/:rightId
      // roleId 当前角色的id
      // rightId 要删除的权限id
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      // console.log(res)
      if (res.status === 200) {
        // 删除成功 返回状态 和剩余权限
        role.children = res.data.data
        this.$message.success(res.data.meta.msg)
      }
    },
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
