// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import MyHttpServer from  '@/plugins/http'

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'

import router from './router'

// 使用插件
Vue.use(ElementUI);
 Vue.use(MyHttpServer)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
