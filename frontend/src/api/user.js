import request from '@/utils/request'

export function logon(username, password) {
  return request({
    url: '/user/logon',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
