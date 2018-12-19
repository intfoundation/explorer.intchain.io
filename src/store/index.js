import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {

}

const mutations = {

}

const actions = {
  async getbloL({commit}){
    try{
      const res = await axios.get('/block/blockDetail', {
        params: {
          id: 31802
        }
      })
      if (res) {
        console.log('--store--', res)
        commit('saveAdminInfo', res.data);
      }else{
        throw new Error(res)
      }
    }catch(err){
      console.log('')
    }
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
