<template>
  <div class="header">
    <!--  折叠按钮  -->
    <div class="collapse-btn" @click="collapseChange">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">监控系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!--消息中心-->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/tabs">
              <i class="btn-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useStore from 'vuex/dist/vuex.mjs'
import {computed, onMounted} from 'vue'
import {useRouter} from 'vue-router'

export default {
  name: 'Header',
  setup () {
    const username = localStorage.getItem('ms_username')
    const message = 2

    const store = useStore()
    const collapse = computed(() => store.state.collapse)

    // 侧边栏折叠
    const collapseChange = () => {
      store.commit('handleCollapse', !collapse.value)
    }

    // 加载完毕就执行的
    onMounted(() => {
      if (document.body.clientWidth < 1500) {
        collapseChange()
      }
    })

    // 用户名下拉菜单选择事件
    const router = useRouter()
    const handleCommand = (command) => {
      if (command == 'loginout') {
        localStorage.removeItem('ms_username')
        router.push('/login')
      }
      if (command == 'user') {
        router.push('/user')
      }
    }

    return {
      username,
      message,
      collapse,
      collapseChange,
      handleCommand
    }
  }
}
</script>

<style scoped>
.header {

}
</style>
