import router from './router'
import { getToken } from '@/utils/cookieToken'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = [
  'login'
]

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    /* 重新生成一次token，对token进行延时 */
    store.dispatch('Authorization').then(() => {
      /* has token */
      if (to.name === 'login') {
        next({ name: 'home' })
        NProgress.done()
      }
      next()
    }).catch(error => {
      console.log(error)
    })
  } else {
    /* no token */
    if (whiteList.indexOf(to.name) !== -1) { // 白名单内路由直接进入
      next()
    } else {
      next({ name: 'login' }) // 其他全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
