<template>
  <!-- 
    给footer设置js动态操纵style属性操纵背景颜色的属性
    属性的值是一个变量，因此需要写在data中
   -->
  <!--   <footer :style=" {backgroundColor:curColor} ">
 后需更改就不这样拿背景颜色了-->
  <!-- 引入store后可以直接通过curMenu.bgColor拿到颜色 -->
  <footer :style="{ backgroundColor: curMenu.bgColor }">
    <!-- 
      因为每个div里面的结构都一致，所以可以用v-for循环循环出来 
      记得在这写一个key，key里面的值最好是唯一的
    -->
    <!-- 给div安装点击事件，点击不同的div触发切换不同颜色的方法 -->
    <!-- 点击事件的时候，把menu.color作为实参传给switchMenu方法的形参color -->
    <!--     <div
      v-for="menu in menuList"
      :key="menu.path"
      @click="switchMenu(menu.bgColor)"
    >
    引入store不再关心的只是颜色
 -->
    <!-- 路径和名字都不应该被写死了，是每一个menu的名字和路径 -->
    <!-- 点击事件传进来方法的实参menu -->
    <div v-for="menu in menuList" :key="menu.path" @click="switchMenu(menu)">
      <router-link :to="menu.path">{{ menu.name }}</router-link>
    </div>
  </footer>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["curMenu"]),
  },
  data() {
    return {
      // curColor:'pink',后续的更改中store有初始状态就不需要自己有了
      /* 这个是当前页面颜色的初始值，自己设的与剧集一致 */
      /* 循环出来的div里面的内容用数组接着 */
      /* 
         存储每一个routerlink的信息(路径、内容、背景颜色）
         背景颜色是bgColor与backgroundColor都可以
         只要与点击触发的方法中一致即可
      */
      menuList: [
        { path: "/", name: "剧集", bgColor: "pink" },
        { path: "/music", name: "音乐", bgColor: "yellow" },
        { path: "/book", name: "书籍", bgColor: "green" },
        { path: "/chat", name: "聊天", bgColor: "orange" },
      ],
    };
  },
  methods: {
    ...mapMutations(["setCurmenu"]),
    switchMenu(menu) {
      /* 
       更改颜色的时候相当于触发setCurmenu方法去修改
      ...mapMutations(["setCurmenu"])相当于methods里面有了setCurmenu方法
      用的时候直接调用一下就行
      调用的时候也需要传一个参数
       */
      /* 形参menu等着接收点击事件传来的menu实参 */
      this.setCurmenu(menu);

      /* 让当前页面的颜色是点击相应routerlink传过来的背景颜色 */
      /*this.curColor = color;
      引入store后不这么修改了
      switchMenu(color)也不用了*/
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: space-around;
  height: 1rem;
  background-color: aqua;
  line-height: 1rem;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>



