import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toastMessage: '',
    errMessage: '',
    customers: Object
  },
  mutations: {
    changeMessage(state,payload){
      state.toastMessage = payload
    },
    changeErrMessage(state,payload){
      state.errMessage = payload
    },
    updateCustomer(state,payload){
      state.customers = payload
    },
    makeToast(state,variant) {
      this.$bvToast.toast(state.toastMessage, {
        title: `Variant ${variant || 'default'}`,
        variant: variant,
        solid: true
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
