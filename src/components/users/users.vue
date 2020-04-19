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
          <el-input @clear = "loadUserList()"
            clearable placeholder="请输入内容"
                    v-model="query"
                    class="inputSearch">
            <el-button
              @click="searchUser()"
              slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success" @click="showAddUserDia()">添加用户</el-button>
        </el-col>
      </el-row>
      <!--3.表格-->
      <el-table height="400px"
        :data="userlist"
        style="width: 100%">
        <el-table-column
          type="index"
          label="#"
          width="60">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="80">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
        <el-table-column
          label="创建时间">
          <!--如果单元格的内容显示的不是字符串，需要给显示的内容添加template-->
          <!--
           template内容使用数据 设置slot-scope属性
           该属性的值是要用的数据create_time的数据源来自于suerlist
          -->
          <!--
          slot-scope的值userlist其实就是el-table绑定的数据都是userlist
          userlist.row->数组中的每个对象
          -->
          <template slot-scope="userlist">
            {{userlist.row.create_time | fmtdate}}
          </template>
        </el-table-column>

        <el-table-column
          label="用户状态">
          <template slot-scope="scope">
            <el-switch
              @change="changeMgState(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-button  size="mini"
                plain type="primary"
                icon="el-icon-edit"
                circle @click="showEditUserDia(scope.row)"></el-button>
              <el-button size="mini"
                plain type="danger"
                icon="el-icon-delete"
                circle @click="showDeleUserMsgBox(scope.row.id)"></el-button>
              <el-button size="mini"
                plain type="success"
                icon="el-icon-check"
                @click="showSerYserRoleDia(scope.row)"
                circle></el-button>
            </el-row>
          </template>

        </el-table-column>
      </el-table>
      <!--4.翻页-->
      <!--
      24
      pagenum=3
      pagesize=2
      1,2/3,4
      数据
      -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

   <!-- 添加用户的对话框-->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="100px">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密 码" label-width="100px">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="100px">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="100px">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑用户对话框-->
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="100px">
            <el-input disabled v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="100px">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="100px">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="editUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!--分配角色的对话框 -->
      <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="100px">
           {{currUsername}}
          </el-form-item>
          <el-form-item label="角色" label-width="100px">
            <!--如果select的绑定的数据的值 和 option 的 value一样 就会显示该optinon的value值-->
            {{currRoleId}}
            <el-select v-model="currRoleId" >
              <el-option label="请选择"  :value="-1"></el-option>
             <el-option :label="item.roleName" :value="item.id"
             v-for="(item, i) in roles" :key="i"
             ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
          <el-button type="primary" @click="setRole()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      // 表格的数据
      userlist: [],
      // 分页相关的数据
      total: -1,
      pagenum: 1,
      pagesize: 2,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      // 添加用户的表单数据
      dialogFormVisibleEdit: false,
      dialogFormVisibleRol: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 分配角色
      currRoleId: -1,
      currUserId: '',
      currUsername: '',
      // 保存所有的角色属性
      roles: []
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 分配角色 - 发送请求
    async setRole () {
      this.dialogFormVisibleRol = false
      // users/:id/role
      // :id 要修改的用户的 ID值
      // 请求体中 rid 修改的新值角色id
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.currRoleId
      })
      console.log(res)
    },
    // 分配角色 - 打开对话框
    async showSerYserRoleDia (user) {
      this.currUsername = user.username
      // 给该属性赋值
      this.currUserId = user.id
      // 获取所有的角色
      const res1 = await this.$http.get(`roles`)
      this.roles = res1.data.data
      // users/:id
      // 获取当前角色的ID rid
      const res = await this.$http.get(`users/${user.id}`)
      // console.log(res)
      this.currRoleId = res.data.data.rid
      this.dialogFormVisibleRol = true
    },
    // 修改状态
    async  changeMgState (user) {
      // 发送请求
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      console.log(res)
    },
    // 编辑用户 - 发送请求
    async editUser () {
      // users/:id
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      console.log(res)
      this.dialogFormVisibleEdit = false
      // 更新视图
      this.getUserList()
    },
    // 编辑用户 - 显示对话框
    showEditUserDia (user) {
      console.log(user)
      // 获取用户数据
      this.form = user
      this.dialogFormVisibleEdit = true
    },
    // 删除用户 - 打开消息盒子
    showDeleUserMsgBox (userId) {
      this.$confirm('删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送请求: id ----> 用户id
        // 1.data中找userId
        // 2.把userId以showDeleUserMsgBox参数形式传递进来
        const res = await this.$http.delete(`users/${userId}`)
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          this.pagenum = 1
          // 更新视图
          this.getUserList()
          // 提示
          this.$message({
            type: 'success',
            message: msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加用户  -> 发送请求
    async addUser () {
      this.dialogFormVisibleAdd = false
      const res = await this.$http.post('users', this.form)
      console.log(res)
      const {meta: {status, msg}, data} = res.data
      if (status === 201) {
        // 1.提示成功
        this.$message.success(msg)
        // 2.关闭对话框
        // 3.更新视图
        this.getUserList()
        // 4.清空对话框
        this.form = {}
        // for (const key in this.form) {
        //   if (this.form.hasOwnProperty(key)) {
        //     this.form[key] = ''
        //   }
        // }
      } else {
        this.$message.warning(msg)
      }
    },
    // 添加用户 -> 显示对话框
    showAddUserDia () {
      this.form = {}
      this.dialogFormVisibleAdd = true
    },
    // 清空搜索框，重新获取数据
    loadUserList () {
      this.getUserList()
    },
    // 搜索用户
    searchUser () {
      // 按照input绑定的query
      this.getUserList()
    },
    // 分页相关的方法
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      // this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    },

    // 获取用户列表的请求
    async getUserList () {
      // query查询参数可以为空
      // pagenum当前页码不能为空
      // pagesize每页显示条数不能为空
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log('++++')
      console.log(res)
      const {meta: {status, msg}, data: {users, total}} = res.data
      if (status === 200) {
        // 1.给表格数据赋值
        this.userlist = users
        console.log('----')
        console.log(res.data)
        // 2.给total赋值
        this.total = total
        // 3.提示
        // this.$message.success(msg)
      } else {
        // 提示
        // this.$message.warning(msg)
      }
    }
  }
}
</script>

<style>
  .inputSearch {
    width: 400px;
  }
  .searchRow {
    margin-top: 28px;
  }
</style>
