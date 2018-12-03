import axios from './index'

export const loginAPI = params => axios.request({
  url: '/login',
  method: 'POST',
  data: params
})

export const authAPI = () => axios.request({
  url: '/auth',
  method: 'POST'
})

export const testAPI = () => axios.request({
  url: '/test',
  method: 'POST'
})
