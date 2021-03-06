import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './http'
import Global from './global';

Vue.use(ElementUI);
Vue.use(Global);
Vue.use(echarts);
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
