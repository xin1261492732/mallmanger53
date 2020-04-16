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

