import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue,IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue,IconsPlugin).use(VueAxios, axios)
Vue.mixin({
  methods:{
    makeToast(variant) {
      
      this.$bvToast.toast(this.toastMessage, {
        title: `Variant ${variant || 'default'}`,
        variant: variant,
        solid: true
      })
    }
  }
  
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
