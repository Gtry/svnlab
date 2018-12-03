import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import common from './modules/common'
import errorLog from './modules/errorLog'
// import permission from './modules/permission'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    common,
    errorLog,
    // permission,
    user
  },
  getters
})

export default store
