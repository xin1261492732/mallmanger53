<template>
  <el-card>
    <my-bread leve1="订单管理" leve2="订单列表"></my-bread>
    <el-table height="450px" :data="list" style="width: 100%">
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="150"></el-table-column>
      <el-table-column prop="order_price" label="订单价格"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_pay==='0'">已付款</el-tag>
          <el-tag v-else-if="scope.row.order_pay==='1'">未付款付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="100">
      </el-table-column>

      <el-table-column
        label="下单时间" width="90">
        <template slot-scope="scope">
          {{scope.row.create_time | fmtdate}}
        </template>
      </el-table-column>

      <el-table-column width="180" label="操作">
        <template slot-scope="scope">
            <el-button  size="mini"
                        plain type="primary"
                        icon="el-icon-edit"
                        circle @click="showEditUserDia(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改订单地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="省市区" label-width="120px">
          <el-cascader expand-trigger="hover"
          clearable :options="catlist" v-model="selectedOptions">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import catlist from '../../assets/address.js'
export default {
  data () {
    return {
      list: [],
      dialogFormVisible: false,
      form: {
        address: ''
      },
      catlist: [],
      selectedOptions: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await this.$http.get(`orders?pagenum=1&pagesize=10`)
      this.list = res.data.data.goods
      console.log(this.list)
    },
    showEditUserDia () {
      this.catlist = catlist
      this.dialogFormVisible = true
    }
  }
}
</script>

<style>

</style>
