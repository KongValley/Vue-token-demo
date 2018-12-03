<template>
  <div>
    <input type="text" v-model="username">
    <input type="password" v-model="password">
    <input type="button" value="登录" @click="handleLogin()">
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login_page',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['Login']),
    handleLogin () {
      const params = {
        username: this.username,
        password: this.password
      }
      this.Login(params).then(() => {
        this.$notify.success({
          title: '登录成功',
          message: '欢迎光临'
        })
        this.$router.push({ name: 'home' })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
