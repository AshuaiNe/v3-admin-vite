<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"
import { ElNotification } from "element-plus"
// 将 Element Plus 的语言设置为中文
import zhCn from "element-plus/es/locale/lang/zh-cn"

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()

/** 作者小心思 */
const notification = ElNotification({
  title: "Hello",
  type: "success",
  dangerouslyUseHTMLString: true,
  message: "Hello World！！！",
  duration: 0,
  position: "bottom-right"
})

/** 延迟关闭通知 */
setTimeout(() => {
  notification.close()
}, 5000)
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
