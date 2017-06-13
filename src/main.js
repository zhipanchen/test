import Vue from 'vue'
//import Vuex from 'vuex'
//import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import router from './routes/index.js'
import App from './App.vue'
import iView from 'iview'
import  './assets/css/iview.css'

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(iView);

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    console.log(response.body);
    try {
      if (response.body[0].code == "-888") {
        //this.$Message.error('操作失败，您可能不具有相应权限！',3);
        if (sessionStorage.getItem("userType") == "1") {
          //setTimeout("location.href ='#/login/main/studentHome'", 4000);
          location.href ='#/login/main/studentHome';
        } else {
          //setTimeout("location.href ='#/login/main/eduAdminHome'", 4000);
          location.href ='#/login/main/eduAdminHome';
        }
      } else if (response.body[0].code == "-666") {
        //this.$Message.error('操作失败，请先登录！',3);
        //setTimeout("location.href ='#/login'", 4000);
        sessionStorage.removeItem("userType");
        sessionStorage.removeItem("lastClickRole");
        sessionStorage.removeItem("userInfo");
        location.href ='#/login';
      }
    }catch (e){}
    return response;
  });
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});



