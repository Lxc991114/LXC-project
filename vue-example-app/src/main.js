import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* 引入样式重置文件和rem计算文件 */
/* 因为只是引入文件，并不需要把文件当成变量去处理
  所以不需要起名字，也不需要写from*/
import './assets/css/reset.css'
import './assets/js/rem.js'
/* 引入第三方库 */
import axios from 'axios'
import VueAxios from 'vue-axios'
/* 引入组件库 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
