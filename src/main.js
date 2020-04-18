// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import MyHttpServer from './plugins/http'
import moment from 'moment'
// MyBread其实是组件选项所在的对象
import MyBread from './components/cuscom/mybread'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'

import router from './router'

// 使用插件
Vue.use(ElementUI)
Vue.use(MyHttpServer)
Vue.config.productionTip = false

Vue.filter('fmtdate', (v) => {
  return moment(v).from('YYYY-MM-DD')
})

Vue.component(MyBread.name, MyBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
