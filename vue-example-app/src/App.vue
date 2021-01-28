<template>
  <div id="app">
    <!-- 注册后使用组件 -->
    <ComHeader> </ComHeader>
    <!-- router-view放在中间，可以保证页面始终在中间切换 -->
    <router-view class="view"/>
    <ComFooter> </ComFooter>
  </div>
</template>

<script>
/* 先写一个script标签，准备处理注册组件等问题 */
/* 注册组件之前要从外面将组件引入 */
/* 引入方法1： */ /* 引入文件层级结构较乱时不太方便 */
import ComHeader from "./components/ComHeader"; /* @是对src文件夹的引用，直接找到src下的文件 */
/* 引入方法2： */ import ComFooter from "@/components/ComFooter";

export default {
  components: {
    /* 在一个页面使用组件的时候引入后需要把组件注册一下 */
    ComHeader,
    ComFooter,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .view{
    margin: 1rem 0;
  }
}
/* a标签颜色是黑色的 */
a {
  font-weight: bold;
  color: #000000;

  &.router-link-exact-active {
    /* 被点击后的颜色 */
    color: #b942af;
  }
}
</style>
