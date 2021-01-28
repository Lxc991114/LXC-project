<template>
  <header :style="{ backgroundColor: curMenu.bgColor }">
    <!-- 给主页一个单击事件，点击单击事件触发回到主页的方法 -->
    <span @click="goHome">《 首页</span>
    <!-- 标题不应该写死，应该是一个变量 -->
    {{ curMenu.name }}
  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["curMenu"]),
  },
  methods: {
    ...mapMutations(["setCurmenu"]),
    goHome() {
      /* 
            如果只是push主页的路径
            只有主页的链接和内容回到主页
            状态没有回到主页
      */
      this.$router.push("/");
      /*
            要改curMenu就需要调用serCurmenu方法
            这个方法要传一个对象作为参数
            因为要定位到主页，主页的curMenu是写死的
            所以直接放进括号里作为参数即可
      */
      this.setCurmenu({
        name: "剧集",
        bgColor: "pink",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  /* 定位后宽度由内容撑开 */
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  span {
    position: absolute;
    left: 0;
  }
}
</style>
