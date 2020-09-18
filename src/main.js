import Vue from 'vue';
import Element from 'element-ui';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
// 引入mock
import '@/mock';

Vue.use(Element);
Vue.prototype.axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
