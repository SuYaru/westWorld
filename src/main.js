import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
Vue.use(require('vue-moment'));

Vue.use(iView);
Vue.config.productionTip = false

// axios 在任何一次请求时都会触发
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  //console.log(store.state.token);
  if(store.state.token){
      config.headers.Authorization=`Bearer ${store.state.token}`;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
