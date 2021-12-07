<template>

</template>

<script>
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
  name: 'Tags',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const isActive = (path) => {
      return path === route.fullPath
    }
    const store = useStore()
    const tagsList = computed(() => store.state.tagsList)
    const showTags = computed(() => tagsList.value.length > 0)

    // 关闭单个标签
    const closeTag = (index) => {
      const delItem = tagsList.value[index]
      store.commit('delTagsItem', {index})
      const item = tagsList.value[index] ? tagsList.value[index] : tagsList.value[index - 1]
      if (item) {
        delItem.path === route.fullPath && router.push(item.path)
      } else {
        router.push('/')
      }
    }

    //设置标签
    const setTags = (route) => {
      const isExist = tagsList.value.some((item) => {
        return item.path === route.fullPath
      })
      if (isExist) {
        if (tagsList.value.length >= 8) {
          store.commit('delTagsItem', {index: 0})
        }
        store.commit('setTagsItem', {
          name: route.name,
          title: route.meta.title,
          path: route.fullPath
        })
      }
    }
    setTags(route)

    onBeforeRouteUpdate((to) => {
      setTags(to)
    })

    // 关闭全部标签
    const closeAll = () => {
      store.commit('clearTags')
      router.push('/')
    }

    // 关闭其他标签
    const closeOther = () => {
      const curItem = tagsList.value.filter((item) => {
        return item.path === route.fullPath
      })
      store.commit('closeTagsOther', curItem)
    }

    const handleTags = (command) => {
      command === 'other' ? closeOther() : closeAll()
    }

    return {isActive, tagsList, showTags, closeTag, handleTags}
  }
}
</script>

<style scoped>

</style>
