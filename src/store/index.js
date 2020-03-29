import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notifications: []
    // notifications: JSON.parse('[{"id":1,"user_id":"1111222233334444","slat":"9.367328","slong":"47.420340","lat":"9.368750","long":"47.421247","threat":1,"timestamp":1585408305,"received":true},{"id":2,"user_id":"1111222233334444","slat":"9.369163","slong":"47.421073","lat":"9.369507","long":"47.421192","threat":1,"timestamp":1585408320,"received":true},{"id":3,"user_id":"1111222233334444","slat":"9.371084","slong":"47.421952","lat":"9.370631","long":"47.421649","threat":1,"timestamp":1585408335,"received":true},{"id":4,"user_id":"1111222233334444","slat":"9.369163","slong":"47.421073","lat":"9.371393","long":"47.423144","threat":2,"timestamp":1585408320,"received":true},{"id":5,"user_id":"1111222233334444","slat":"9.371084","slong":"47.421952","lat":"9.370470","long":"47.422338","threat":2,"timestamp":1585408335,"received":true},{"id":6,"user_id":"1111222233334444","slat":"9.370416","slong":"47.422168","lat":"9.370867","long":"47.421765","threat":2,"timestamp":1585408350,"received":true}]')
  },
  mutations: {
    setNotifications(state, value) {
      state.notifications = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
