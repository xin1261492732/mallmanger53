## Vue-项目-重点

### 重点
1.src/
2.bulid/ webpack相关代码
3.congif/ 本地服务器配置
4. .eslintignore eslist排除文件
5. .eslinttr eslint配置文件

###  准备-代码规范-自定义指令-lintfix
1.结尾有;
2.必须用全等
3.不允许出现一个以上的空行
4.不允许出现未使用的变量

>在package.json中scripts自定义指令：指令很长
>npm run 自定义(dev)
>npm run lintfix(自动修正全部的(但是多余的变量不会修正)js代码)
>自动打开浏览器 dev:'xxxx --open'
>关闭代码规范 41行注释

### 文档分析
>element-ui 
>使用与vue项目-PC端项目
>在main.js引入 
>安装  npm install element-ui -dev
>使用  Vue.use(ElementUI);
>DDFE

### 版本控制
1.git init -> .git
2.git status
3.git addgit add . 
4.git commit -m "zhushi"
5.在代码托管平台(fitnub) 新建远程仓库
6.git remote add origin
6.git push -u origin master(只会再push 直接 git push)

### 分析---登录
>新建一个分支  专门写登录功能
>git branch
>git checkout -b dev-login
>新建组件+配置路由
>注意：commit没完成一个小功能就commit一次
>push操作master去完成

### 引入表单组件
>el-form
1.引入
2.调整标签(h2+el-button)
>label-position="top"

### 登录-样式调整
>height:100%
>注意：div#app height:100%

### axios 插件
>axios不是vue插件  
>转化为插件
// 插件模块
import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = function (Vue) {

  // 4. 添加实例方法
  Vue.prototype.$http = axios
}
>在main.js中导入插件

export default MyHttpServer

### 发送登录请求
>login.vue  methods handleLongin()
1.methods(){
         this.$http.post('login',this.formdata)
           .then((res)=>{
             const {data ,meta:{msg,status}} = res.data)}

### 登录-登录成功 进入 home 组件
>登录成功 => 来到home组件
1.js编程式导航this.$router.push({name:'home'})
2.app.vue router-view
3.新建home组件
4.路由配置

### 异步 -> 同步
async handleLogin() {
       const res = await this.$http.post('login', this.formdata)
            //登录成功
            const {data, meta: {msg, status}} = res.data
             if(status === 200) {
               // 1.跳转home
               this.$router.push({name:'home'})
               // 2.提示成功
               this.$message.success(msg)
             }
             else {
               // 不成功
               // 1.提示消息
               this.$message.warning(msg)
             }
      }
    }
    
 ### 登录 保存token值
> 目的：如果用户没登录->url直接来带home组件
> 在登录成功时，保存正确用户的token
localStorage.setItem('token',data.token)

### 样式头部调整
>loyout布局
>行 el-row
>列 el-col
> 注意 ： 24 栏


### 首页——侧边——导航组件-文档
>el-meun
1.router 开启路由模式 true index值==path值
2.unique-opened是否值保持一个子菜单的展开

### 首页——侧边——引入导航组件
>调整el-menu
>index不能一样

### 首页-进入首页的权限验证
 // newVue之前自动触发
    beforeCreate() {
      //获取token
      const token = localStorage.getItem('token')
      if(!token) {
        // token 没有 -> 登录
        this.$router.push({name:'login'})
      }
      //if token 有 -> 继续渲染组件
    }

### 首页-头部-退出
// 退出按钮
      handleSignout(){
        // 1.清除token
        localStorage.removeItem('token')
        // 2.提示
        this.$message.success('退出成功')
        //3.来到login组件
        this.$router.push({name:'login'})
      }
    }

### 首页-合并分支-新建用户分支
1.切到master
2. git merge  dev-login 合并分支
3.push
4.新建 dev-users

### 用户管理-用户列表-新建组件-路由配置
1.home.vue开启路由模式
2.home.vue => router-view
3.新建users.vue
4.定义users路由

### 用户管理-用户列表-面包屑和搜索框
1. el-card 卡片 小容器
2. 面包屑
3. el-row>el-col>el-inout+el-button
4. 调整样式

### 用户管理-用户列表-引入表格组件
>el-table（data数据源[]） > el-table-column(lobel表头/prop="数据") > 字符串数据
...html
<el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      
###   用户管理-用户列表-请求数据-设置请求头
1. created(){this.getUserList}
2. methods:{getUserList(){发送请求}
3. 接口文档中 除了登录之外的所有请求都需要进行授权->设置请求头
4. 找axios中关于请求头设置代码
 const AUTH_TOKEN = localStorage.getItem('token')
 this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN; 
 5.发送请求
 
 ### 用户管理-用户列表-渲染数据-一般数据
 1.解构赋值 const {meta:{status,msg},data:{users,total}} = res.data
 2. prop = ''
   
### 用户管理-用户列表-渲染列表-日期格式处理
1. main.js 全局过滤器
2.  prop="create_time | fmtdate" 
    如果单元格的内容只能显示文本
3. 需要给该内容外层加容器
       <template slot-scope="userlist">
           {{userlist.row.create_time | fmtdate}}
       </template>
4. 最终写法 
          </el-table-column>
          <el-table-column
            label="创建时间">
            <template slot-scope="userlist">
              {{userlist.row.create_time | fmtdate}}
            </template>
          </el-table-column>
>slot-scope 作用：传值
>slot-scope的值会自动去上一级找最外层标签el-table所绑定的数据userlist
>slot-scope="scope" 此时"scope" === userlist数组
>scope.row是数组的每个对象

### 用户管理-用户列表-渲染数据-用户状态开关
>el-switch  v-model='bool'
<el-table-column
          label="用户状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>

### 用户管理-用户列表-渲染数据-操作
>操作里面不是字符串
1.template容器 slot-scope='scope'
2.el-button
>size="mini" plain

### 用户管理-用户列表-分页组件-文档-引入
>该接口支持翻页 url参数中pagenum pagesize
1.@size-change 每页显示的条数变化时  触发
2.@current-change 当前页面改变时 触发
3.current-page 设置当前是第几页
4.page-sizes 每页多少条的数据数组
5.page-size 设置第一次运行的时候显示多少条
6.total 数据总数

### 用户管理-用户列表-分页组件-配置数据
1.current-page = "pagenum"
2.page-size=2
3.total =" total"

### 用户管理-用户列表-分页组件-分页请求
1. 每页显示条数改变 -> this.pagesize = val -> this.getUserList()
2. 页面改变时 -> this.pagenum = val -> this.getUserList()
> 希望当每页条数改变时 从第一页开始 this.pagenum = 1

### 用户管理-用户列表-搜索用户
1. 给搜索输入框绑定query v-model="query"
2. 点击搜索按钮 发送请求
3. 一键清除 clearable
4. 点击清除按钮 -> 重新获取数据

<el-input @clear = "loadUserList()"
    clearable placeholder="请输入内容"
     v-model="query"
      class="inputSearch">
 <el-button
        @click="searchUser()"
        slot="append" icon="el-icon-search"></el-button>
</el-input>

### 用户管理-用户列表-添加用户-显示对话框
1. 引入对话框 > el-from
2. 点击添加通话的按钮 显示对话框 this.dialogFormVisibleAdd = true
3. 配置对话框

### 用户管理-用户列表-添加用户-发送请求
// 1.提示成功
        this.$message.success(msg)
        // 2.关闭对话框
        // 3.更新视图
        this.getUserList()
        // 4.清空对话框
        this.form = {}
        
### 用户管理-用户列表-删除用户-打开确认框
>this.$congig().then().catch()
1. 点击确认 -> then()
2. 点击取消 -> catch()

### 用户管理-用户列表-删除用户-处理响应
1. 点击确认 -> then() -> detele()

### 用户管理-童虎列表-编辑用户-显示对话框
> 点击操作中的编辑按钮 打开编辑对话框

### 用户管理-用户列表
1. el-table 固定表头 height="300px"

### 用户管理-用户列表-编辑用户-显示编辑数据
1. 点击edit编辑按钮 scope.row
2. 在showEditUserDia()的方法中   this.form = user

### 用户管理-用户列表-编辑用户-发送请求
1. 找到对话框的确定按钮 - > editUser() -> 发送请求
> this.form = user
> id -> this.form.id
> 先点编辑 再点添加 - > 打开添加对话框之前 this.form = {}

### 用户管理-用户列表-用户状态
1. 找到开关 @change = "changeMgState(scope.row)"
2. 发送put请求
>(`users/${user.id}/state/${user.meg_state}`)

### 用户管理-用户列表-分配角色
1. 点击按钮 - > 打开对话框
2. 对话框 有下拉框
3. 修改当前用户的角色
4. 5个角色名来源于请求
> 角色设置不同权限

### 用户管理-用户列表-分配角色-显示对话框
1. 点击操作的按钮 -> 打开对话框
2. 引入对话框 -> 有下拉框
> 下拉框 select 绑定的数据的值option的value值一样 就会显示option
3. 把option分成了两类 请选择（-1） 和 v-for
4. data提供了el-select 的 v-model所绑定的数据

### 用户管理-用户列表-分配角色-显示对话框-下拉框
> el-select 和 el-option
1. 当改变label时 -> 该label显示 -> 改变了value -> el-select v-model
> 自动关联

### 用户管理-用户列表-分配角色-显示当前用户角色
1. 通过请求获取所有角色 roles
2. v-if el-option :label="item.roleName" :value="item.id"
3. 通过请求获取当前用户rid

### 用户管理-用户列表-分配角色-修改用户角色
1. 通过视图操作- 修改了label - value值变化
> 在setRole要使用用户id  在data中声明id
> 再打开对话框时 ID赋值
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

### 合并分支-推送
1. git add.
2. git commit -m "注释"
3. git branch
4. git checkout master
5. git merge dev-users
6. git push

### 权限管理-权限列表-新建组件-路由配置
1. 新建right.vue
2. home.vue 改标识
3. 配置路由

### 权限管理-权限列表-自定义组件面包屑
1. 所有组件都用到了面包屑
2. 二次封装了面包屑组件 leve1 leve2 -> props:[]
3.Vue.component(组件.name , 组件)

### 权限管理-权限列表-获取权限列表数据
>除了登录之外的所有请求 都需要设置头部信息
> type参数 值list或者tree

### 权限管理-权限列表-axios-拦截器统一-设置请求头
> 除了登录之外的所有请求 都需要设置头部信息
> 在请求发起之前 都要添加头部 
> 请求拦截器 confing.header

### 权限管理-权限列表-表格展示
> 引入el-table 绑定数据 rightlist (authName path level)

### 权限管理-权限列表-表格展示-层级展示
>level === '0' 一级
1. template slot-scope="scope"
2. v-if="scope.row.level == 1"

### 权限管理-权限列表-表格展示-固定表头
> 给el-table设置固定高
> overflow:auto

### 权限管理-权限列表-角色列表-新建组件
1. 新建role组件
2. 配置路由

### 权限管理-权限列表-角色列表-面包屑和添加按钮
1. 自定义面包屑
2. 添加按钮

### 权限管理-权限列表-角色列表-获取角色列表
1. 发送请求 const res = await this.$http.get(`roles`)

### 权限管理-权限列表-角色列表-表格展示
>将users中的表格进行复制
1. :data="rolelist"
2. roleName
3. roleDesc
4. 操作

### 权限管理-权限列表-角色列表-表格展示-展开行功能分析
1. type="expand"
2. template > 该角色的权限（三级）
3. 页面布局如果是行列布局问题 - for循环 - v-for嵌套 el-tag

### 权限管理-权限列表-角色列表-表格展示-一级权限
1. 分析数据rolelist  > 每个对象中的cholderen中的authName
2. 布局一行>(列A>(el-tag)+列B(一行el-row)>两列(el-colA>el-tag+el-colB>el-tag)
3. 一级权限展示 v-for 最外层的 el-row scope.row.children

### 权限管理-权限列表-角色列表-表格展示-二级权限
>一级权限的基础上 展示二级权限
<el-row v-for="(item2, i) in scope.row.children" :key="i">
              <el-col :span="4">
                <el-tag type="success">{{item2.authName}}</el-tag>
              </el-col>
              <el-col :span="20"></el-col>
            </el-row>

### 权限管理-权限列表-角色列表-表格展示-三级权限
>二级权限的基础上 展示三级权限
<el-col :span="20">
      <el-tag v-for="(item3, i) in item2.children" :key="i" type="warning">
        {{item3.authName}}
      </el-tag>
    </el-col>
    
### 权限管理-权限列表-角色列表-样式调整
1. el-tag颜色 type="success"
2. closeable
3. <i class="el-icon-arrow-right"></i>

### 权限管理-权限列表-角色列表-无权限
<span v-if="scope.row.children.length===0">未分配权限</span>

### 权限管理-权限列表-角色列表-取消权限
>点击x按钮 取消权限
1. 绑定监听
2. 发送请求
3. await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
4.更新整个视图

### 权限管理-权限列表-角色列表-取消权限-优化
> 删除成功-更新整个视图   只更新自己
> 获取角色  - 更新当前角色children


### 权限管理-权限列表-角色列表-显示对话框
> 点击操作check按钮 打开对话框
1. 提供对话框
2. check按钮 @click="showSetYserRole(scope.row)

### 权限管理-权限列表-角色列表-树形结构
<!--
      树形结构
      data->数据源[]
      show-checkbox ->选择框
      node-key 每个节点的唯一标识 通常是data数据源key的id
      default-expanded-keys 默认展开[要展开的节点id]
      default-checked-keys [要选择的节点id]
      props 配置项{label,chidren}
      label 节点的文字标题  chidren 节点的子节点
      都来自与data绑定的数据源中的该数据key 名 label chidren
      -->

### 权限管理-权限列表-角色列表-树形结构-配置数据
1. data中 treelist
2. 打开对话框 获取树形结构的权限列表数据
> const res = this.$http.get(`rights/tree`)
> this.treelist = res.data.data
> el-tree node-key = "id"
> :props=(label:'authName',children:'children')
> 默认选中 默认展开

### 权限管理-权限列表-角色列表-树形结构-展开所有项
> default-expand-all

### 权限管理-权限列表-角色列表-树形结构-显示角色拥有的权限
> el-tre default-checked-key="[]"
> 获取最底层的id值
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

### 权限管理-权限列表-角色列表-树形结构-分配权限-实现
1. 点击对话框的确定 发送请求
> roleId rid
2. 获取id this.role = role.id
3.1 获取全选的节点id数组 getCheckedKeys()
3.2 获取半选的节点id数组  getHalfCheckedKeys()
4. 为元素添加ref
5. 将全选 和 半选 结合 let arr = [...arr1, ...arr2]
6. const res = await this.$http.post(`roles/${this.currRoleId}/rights`,
           {rids: arr.join(',')
           })
