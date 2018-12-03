import { getToken, setToken, removeToken } from '@/utils/cookieToken'
import { loginAPI, authAPI } from '@/api/user'
const user = {
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    Login ({ commit }, params) {
      return new Promise((resolve, reject) => {
        loginAPI(params).then(response => {
          const { token } = response.data.data
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Authorization ({ commit }) {
      return new Promise((resolve, reject) => {
        authAPI().then(response => {
          const { token } = response.data.data
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
