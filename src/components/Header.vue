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
        <!--用户头像-->
        <div class="user-avatar">
          <img src="../assets/img/img.jpg"/>
        </div>
        <!--用户名下拉菜单-->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <a href="https://github.com/swordman-sm/elm-backend" target="_blank">
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}

.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}

.header .logo {
  float: left;
  padding-right: 50px;
}

.header-right {
  float: right;
  padding-right: 50px;
}

.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}

.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}

.btn-bell .el-icon-bell {
  color: #fff;
}

.user-name {
  margin-left: 10px;
}

.user-avatar {
  margin-left: 20px;
}

.user-avatar img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
