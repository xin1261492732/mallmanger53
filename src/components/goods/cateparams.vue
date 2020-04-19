<template>
  <el-card>
    <my-bread leve1="商品管理" leve2="分类参数"></my-bread>
    <el-alert class="alert" title="只允许为第三级分类设置参数" type="error"></el-alert>
    <!--级联选择器-->
    <el-form class="formcs" label-position="left" label-width="90px" >
    <el-form-item label="商品的分类">
      <!--级联选择器-->
      <el-cascader
        expand-trigger="hover"
        :show-all-levels="false"
        v-model="selectedOptions"
        :props="defaultProp"
        :options="options"
        @change="handleChange" clearable></el-cascader>
    </el-form-item>
    </el-form>

    <el-tabs v-model="active" @tab-click="handleClick" style="height: 300px; overflow: auto">
      <el-tab-pane label="动态参数" name="1">
        <el-button type="danger" @click="canshu()">设置动态参数</el-button>
        <el-table :data="arrDyparams" style="width: 100%">
          <el-table-column type="expand" label="#">
            <template slot-scope="scope">
              <!--el-tag-->
              <el-tag class="tagbox"
                :key="tag"
                v-for="tag in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row,tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>

          <el-table-column
            label="属性名称"
            prop="attr_name">
          </el-table-column>

          <el-table-column
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
                         circle @click="showDeleUserMsgBox(scope.row.attr_id)"></el-button>
            </el-row>
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">
        <el-button type="danger" @click="jingtai()">设置静态参数</el-button>
          <el-table :data="arrStaticparams" style="width: 100%">
            <el-table-column type="index" label="#">
            </el-table-column>

            <el-table-column
              label="属性名称"
              prop="attr_name">
            </el-table-column>

            <el-table-column
              label="属性值"
              prop="attr_vals">
            </el-table-column>

            <el-table-column
              label="操作">
              <template slot-scope="scope">
              <el-row>
                <el-button  size="mini"
                            plain type="primary"
                            icon="el-icon-edit"
                            circle @click="showEditcatDia(scope.row)"></el-button>
                <el-button size="mini"
                           plain type="danger"
                           icon="el-icon-delete"
                           circle @click="showDelecatMsg(scope.row.attr_id)"></el-button>
              </el-row>
              </template>
            </el-table-column>

          </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 动态编辑对话框-->
    <el-dialog title="编辑属性" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="属性名称" label-width="100px">
          <el-input  v-model="form.attr_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 动态添加对话框-->
    <el-dialog title="编辑属性" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="属性名称" label-width="100px">
          <el-input  v-model="form.attr_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="动态数据" label-width="100px">
          <el-input  v-model="form.attr_sel" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editams()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 静态编辑对话框-->
    <el-dialog title="编辑属性" :visible.sync="dialogFormVisibleaa">
      <el-form :model="form2">
        <el-form-item label="属性名称" label-width="100px">
          <el-input  v-model="form2.attr_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性值" label-width="100px">
          <el-input  v-model="form2.attr_vals" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleaa = false">取 消</el-button>
        <el-button type="primary" @click="editjin()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 静态添加对话框-->
    <el-dialog title="编辑属性" :visible.sync="dialogFormVisibletai">
      <el-form :model="form">
        <el-form-item label="属性名称" label-width="100px">
          <el-input  v-model="form2.attr_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="动态数据" label-width="100px">
          <el-input  v-model="form2.attr_vals" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibletai = false">取 消</el-button>
        <el-button type="primary" @click="edittai()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 级联选择器绑定的数据
      options: [],
      selectedOptions: [],
      defaultProp: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      arrDyparams: [],
      active: '1',
      inputVisible: false,
      inputValue: '',
      arrStaticparams: [],
      dialogFormVisibleEdit: false,
      dialogFormVisible: false,
      dialogFormVisibleaa: false,
      dialogFormVisibletai: false,
      form: {
        attr_name: '',
        attr_sel: 'many'
      },
      form2: {
        attr_name: '',
        attr_sel: 'only',
        attr_vals: ''
      }
    }
  },
  created () {
    this.getGoodCate()
  },
  methods: {
    // 静态添加  - 发送请求
    async edittai () {
      let putData = {
        attr_name: this.form2.attr_name,
        attr_vals: this.form2.attr_vals,
        attr_sel: this.form2.attr_sel
      }
      const res = await this.$http.post(`categories/${this.selectedOptions[2]}/attributes`, putData)
      console.log(res)
      // 更新视图
      this.handleClick()
      this.dialogFormVisibletai = false
    },
    //  静态添加
    jingtai () {
      this.dialogFormVisibletai = true
    },
    // 删除静态 - 打开消息盒子
    showDeleUserMsgBox (userId) {
      this.$confirm('删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`categories/${this.selectedOptions[2]}/attributes/${userId}`)
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          // 更新视图
          this.handleChange()
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
    // 静态
    async editjin () {
      let putData = {
        attr_name: this.form2.attr_name,
        attr_sel: 'only',
        attr_vals: this.form2.attr_vals
      }
      const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${this.form2.attr_id}`, putData)
      console.log(this.form2.attr_id)
      console.log(res)
      this.dialogFormVisibleaa = false
      this.handleClick()
    },
    //  静态用户的编辑
    showEditcatDia (user) {
      this.form2 = user
      this.dialogFormVisibleaa = true
    },
    // 删除用户 - 打开消息盒子
    showDelecatMsg (userId) {
      this.$confirm('删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`categories/${this.selectedOptions[2]}/attributes/${userId}`)
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          // 更新视图
          this.handleClick()
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
    // 添加
    async editams () {
      let putData = {
        attr_name: this.form.attr_name,
        attr_sel: this.form.attr_sel
      }
      const res = await this.$http.post(`categories/${this.selectedOptions[2]}/attributes`, putData)
      // console.log(res)
      // 更新视图
      this.handleChange()
      this.dialogFormVisible = false
    },
    // 添加  - 打开对话框
    canshu () {
      if (this.selectedOptions.length === 3) {
        this.dialogFormVisible = true
      }
    },
    // 编辑 -发送请求
    async editUser () {
      let putData = {
        attr_name: this.form.attr_name,
        attr_sel: 'many',
        attr_vals: this.form.attr_vals.join(',')
      }
      const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${this.form.attr_id}`, putData)
      console.log('-------')
      console.log(this.form)
      this.dialogFormVisibleEdit = false
      // 更新视图
      this.handleChange()
    },
    // 编辑对话框
    showEditUserDia (user) {
      // 获取用户数据
      this.form = user
      console.log(this.form)
      this.dialogFormVisibleEdit = true
    },
    // 点击x按钮
    async handleClose (scope, tag) {
      scope.attr_vals.splice(scope.attr_vals.indexOf(tag), 1)
      // 发送请求
      let putData = {
        attr_name: scope.attr_name,
        attr_sel: 'many',
        attr_vals: scope.attr_vals.join(',')
      }
      const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes?sel=many`, putData)
      console.log(res)
    },
    // 点击newTag按钮
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 回车键按钮
    async handleInputConfirm (scope) {
      let inputValue = this.inputValue
      if (inputValue) {
        scope.attr_vals.push(inputValue)
        // 发送请求
        let putData = {
          attr_name: scope.attr_name,
          attr_sel: 'many',
          attr_vals: scope.attr_vals.join(',')
        }
        const res = await this.$http.put(
          `categories/${this.selectedOptions[2]}/attributes/${scope.attr_id}`, putData)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    async handleClick () {
      console.log(this.active)
      console.log(this.active === '2')
      if (this.active === '2') {
        if (this.selectedOptions.length === 3) {
          // 获取数据
          const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
          this.arrStaticparams = res.data.data
          console.log(this.arrStaticparams)
        }
      }
    },
    // 级联选择器
    async handleChange () {
      if (this.selectedOptions.length === 3) {
        // 获取动态数据
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`)
        this.arrDyparams = res.data.data
        this.arrDyparams.forEach(item => {
          item.attr_vals =
            item.attr_vals.length === 0
              ? [] : item.attr_vals = item.attr_vals.trim().split(',')
        })
        console.log(this.arrDyparams)
      }
    },
    // 获取三级分类的信息
    async getGoodCate () {
      const res = await this.$http.get(`categories?type=3`)
      // console.log(res)
      this.options = res.data.data
    }
  }
}
</script>

<style>
 .alert {
   margin-top: 20px;
 }
  .formcs {
    margin-top: 20px;
  }
  .tagbox {
    margin-left: 5px;
  }
</style>
