import Vue from 'vue'
import App from './App.vue'
import store from './store'

// 导入 ant-design-vue 组件库
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

// 安装组件库
Vue.use(Antd)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
