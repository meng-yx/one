// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './utils/http'
// 引入插件
import ElementUI from 'element-ui';
import store from "./store"
// 引入插件
import 'element-ui/lib/theme-chalk/index.css';
// 安装插件
Vue.use(ElementUI);
// 引入样式重置
import "./assets/css/reset.css"
Vue.prototype.$http = http
Vue.config.productionTip = false

//引入qs
import qs from 'qs';
//添加到原型
Vue.prototype.$qs = qs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
