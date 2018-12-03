import axios from 'axios'
import { baseURL } from '@/config'
import store from '@/store'
import { getToken } from '@/utils/cookieToken'
import { Notification, MessageBox } from 'element-ui'

class HttpRequest {
  // 如果new的时候不填url，默认为baseURL
  constructor (baseUrl = baseURL) {
    this.baseURL = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseURL,
      headers: {
      }
    }
    return config
  }

  interceptors (instance, url) {
    instance.interceptors.request.use(config => {
      /*
      *  拦截器配置
      *  你也可以在这里配置loading
      */
      /* 队列中没有请求的时候，取消loading */
      if (!Object.keys(this.queue).length) {

      }
      /* 所有请求压入队列 */
      this.queue[url] = true
      if (store.getters.token) {
        config.headers['Authorization'] = getToken()
      }
      console.log(config)
      return config
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {
      console.log(res)
      /* 有返回或返回失败，从队列里删除url */
      delete this.queue[url]
      const { code, mes } = res.data
      if (code !== 200) {
        if (code === 401) {
          MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('FedLogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
        } else if (code === 402) {
          Notification({
            title: '异常错误',
            message: mes,
            type: 'error'
          })
        }
        return Promise.reject(new Error('error'))
      }
      return res
    }, error => {
      /* 有返回或返回失败，从队列里删除url */
      delete this.queue[url]
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    /*
    *  如果后面options的属性名和this.getInsideConfig()返回的对象属性名有重复
    *  后面会覆盖前面
    */
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
