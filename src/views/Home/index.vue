<template>
  <div>欢迎页</div>
</template>

<script>
import { testAPI } from '@/api/user.js'
export default {
  name: 'home_page',
  data () {
    return {

    }
  },
  mounted () {
    testAPI().then((response) => {
      console.log(response)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
