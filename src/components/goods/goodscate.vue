<template>
  <el-card>
    <!--面包屑-->
    <my-bread leve1="商品管理" leve2="商品分类"></my-bread>
    <!--搜索框-->
    <el-row >
      <el-col :span="24" class="searchArea">
        <el-button type="success" @click="searchArea()">添加分类</el-button>
      </el-col>
    </el-row>
    <!--添加分类对话框-->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <!--级联-->
        <el-form-item label="分类" label-width="120px">
          {{selectedOptions}}
          <el-cascader
          expand-trigger="hover"
          v-model="selectedOptions"
          :props="defaultProp"
          :options="caslist"
          clearable></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addCate()">确 定</el-button>
      </div>
    </el-dialog>
    <!--表格-->
    <el-table height="400px" :data="list" style="width: 100%;" >

<!--      <el-table-column label="分类名称" prop="cat_name">-->

<!--      </el-table-column>-->
      <el-tree-grid prop="cat_name" label="分类名称"
           treeKey="cat_id" parentKey="cat_pid"
                    levelKey="cat_level" childKey="children">

      </el-tree-grid>

      <el-table-column label="级别">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level===0">一级</span>
          <span v-if="scope.row.cat_level===1">二级</span>
          <span v-if="scope.row.cat_level===2">三级</span>
        </template>
      </el-table-column>

      <el-table-column label="是否有效">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_deleted===false">有效</span>
          <span v-else-if="scope.row.cat_deleted===true">无效</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit"
          circle size="mini" plain @click="showEditdia(scope.row)"
          ></el-button>
          <el-button type="danger" icon="el-icon-delete"
                     circle size="mini" plain @click="showDelefirm(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 编辑用户对话框-->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="名称" label-width="100px">
          <el-input  v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editGoodsAtn()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>

// 引入'element-tree-grid'
import ElTreeGrid from 'element-tree-grid'
export default {
  components: {
    ElTreeGrid
  },
  data () {
    return {
      list: [],
      pagenum: 1,
      pagesize: 5,
      total: 1,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      form: {
        cat_pid: -1,
        cat_name: '',
        cat_level: -1
      },
      formLbelWidtg: '140',
      // 级联选择器
      caslist: [],
      // 级联选择的数据
      selectedOptions: [],
      defaultProp: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        str: {}
      }
    }
  },
  created () {
    this.getGoodsCate()
  },
  methods: {
    // 删除用户 - 打开消息盒子 categories/:id
    showDelefirm (userId) {
      this.$confirm('删除商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`categories/${userId.cat_id}`)
        console.log(res)
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          this.pagenum = 1
          // 更新视图
          this.getGoodsCate()
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
    // 添加分类 - 发送请求
    async addCate () {
      if (this.selectedOptions.length === 0) {
        this.form.cat_pid = 0
        this.form.cat_level = 0
      } else if (this.selectedOptions.length === 1) {
        this.form.cat_pid = this.selectedOptions[0]
        this.form.cat_level = 1
      } else if (this.selectedOptions.length === 2) {
        this.form.cat_pid = this.selectedOptions[1]
        this.form.cat_level = 2
      }
      const res = await this.$http.post(`categories`, this.form)
      this.getGoodsCate()
      this.form = {}
      this.dialogFormVisibleAdd = false
    },
    // 添加分类 - 显示对话框
    async searchArea () {
      // 获取二级分类
      const res = await this.$http.get(`categories?type=2`)
      this.caslist = res.data.data
      this.dialogFormVisibleAdd = true
    },
    // 获取所有分类
    async getGoodsCate () {
      const res = await this.$http.get(
        `categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      )
      console.log(res)
      this.list = res.data.data.result
      console.log('-----')

      this.total = res.data.data.total
    },
    // 分页相关的方法
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getGoodsCate()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getGoodsCate()
    },
    // 编辑商品 - 发送请求
    async editGoodsAtn () {
      const res = await this.$http.put(`categories/${this.form.cat_id}`, this.form)
      console.log(res)
      this.dialogFormVisibleEdit = false
      this.getGoodsCate()
    },
    // 编辑商品 - 打开消息框
    showEditdia (user) {
      this.form = user
      this.dialogFormVisibleEdit = true
    }
  }
}
</script>

<style>
 .searchArea {
   margin-top: 28px;
 }
</style>
