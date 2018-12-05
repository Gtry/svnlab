import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userInfo: {
      username: 'guster',
      roles: '',
      truename: '',
      sex: 'male',
      email: 'xxx@dahuatech.com',
      introduction: '',
      avatar: ''
    }
    // userInfo: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, loginForm) {
      // 判断如果为游客，则返回游客登陆
      if (loginForm.username === 'guster') {
        return new Promise((resolve) => {
          var gusterToken = 'gusterToken'
          const userInfo = {
            username: 'guster',
            roles: 'guster',
            truename: 'guster',
            sex: 'male',
            email: 'xxx@dahuatech.com',
            introduction: 'guster account, issue',
            avatar: ''
          }
          setToken(gusterToken)
          commit('SET_TOKEN', gusterToken)
          commit('SET_USERINFO', userInfo)
          resolve()
        })
      } else {
        // 域账号密码登陆
        return new Promise((resolve, reject) => {
          login(loginForm.username, loginForm.password).then(response => {
            const data = response.data
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            commit('SET_USERINFO', data.userInfo)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      }
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getUserInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
