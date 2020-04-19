<template>
  <el-card class="box-card">
    <my-bread leve1="商品管理" leve2="商品列表"></my-bread>

<!--      搜索框-->
    <el-row class="searchArea">
      <el-col>
        <el-input @clear = "loadGoods()"
          clearable placeholder="请输入内容"
                  v-model="query"
                  class="inputArea">
          <el-button
            @click="handleSearch()"
            slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="$router.push({name:'goodsadd'})">添加商品</el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <el-table height="400px" border stripe v-loading
              :data="list"
              style="width: 100%">
      <!--序号-->
      <el-table-column
        label="#"
        type="index">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格(元)"
        width="150">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
      width="100">
      </el-table-column>
      <el-table-column
        label="创建日期" width="150">
        <template slot-scope="scope">
          {{scope.row.add_time | fmtdate}}
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
                        circle @click="showEditGoods(scope.row)"></el-button>
            <el-button size="mini"
                       plain type="danger"
                       icon="el-icon-delete"
                       circle @click="showDeleGoods(scope.row.goods_id)"></el-button>
          </el-row>
        </template>

      </el-table-column>
    </el-table>

    <!--分页组件-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 编辑商品-->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisibleGoodsEdit">
      <el-form :model="form">
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="form.goods_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" label-width="100px">
          <el-input v-model="form.goods_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" label-width="100px">
          <el-input v-model="form.goods_weight" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleGoodsEdit = false">取 消</el-button>
        <el-button type="primary" @click="editGoods()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      query: '',
      pagenum: 1,
      pagesize: 10,
      total: -1,
      dialogFormVisibleGoodsEdit: false,
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: ''
      }
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 清空搜索框
    loadGoods () {
      this.getGoodsList()
    },
    // 搜索商品
    handleSearch () {
      this.getGoodsList()
    },
    // 编辑商品 - 发送请求
    async editGoods () {
      const res = await this.$http.put(`goods/${this.form.goods_id}`, this.form)
      this.dialogFormVisibleGoodsEdit = false
      // 更新视图
      this.getGoodsList()
    },
    // 编辑商品 - 打开消息盒子
    showEditGoods (goods) {
      this.dialogFormVisibleGoodsEdit = true
      this.form = goods
    },
    // 删除用户 - 打开消息盒子
    showDeleGoods (goodsId) {
      this.$confirm('删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(goodsId)
        const res = await this.$http.delete(`goods/${goodsId}`)
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          this.pagenum = 1
          // 更新视图
          this.getGoodsList()
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
    // 分页相关的方法
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      // this.pagenum = 1
      this.getGoodsList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getGoodsList()
    },
    // 获取用户列表的请求
    async getGoodsList () {
    // goods
      const res = await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log('----')
      console.log(res)
      const {meta: {status, msg}, data: {goods, total}} = res.data
      if (status === 200) {
        // 1.给表格数据赋值
        this.list = goods
        console.log('----')
        console.log(this.list)
        // 2.给total赋值
        this.total = total
        // 3.提示
        this.$message.success(msg)
      } else {
        // 提示
        // this.$message.warning(msg)
      }
    }
  }
}
</script>

<style>
 .searchArea {
   margin-top: 28px;
 }
 .inputArea {
   width: 400px;
 }
</style>
