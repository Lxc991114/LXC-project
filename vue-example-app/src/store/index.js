import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* 
    想要告诉header的其实就两个东西，一个是名字，一个是背景颜色
    应该有一个对象去告诉header，当前显示的是哪一个menu
    */
    curMenu: {
      /* 先有一个默认情况下的curMenu */
      name: '剧集',
      bgColor: 'pink'
    }
  },
  mutations: {
    /* 
    curMenu不是一尘不变的，我需要更改我的curMenu的背景颜色和名字
    更改curMenu的方法写在mutations中
    */
    /* 
    这个方法的作用就是改背景颜色和名字
    我要改哪个等我点击的时候才能知道，是点击事件告诉我的
    所以这个方法需要传参数！！！！！！！！！！！！！！！！！！
    第一个参数必须是state，第二个形参menu接收的是点击事件传过来的menu
    */
    setCurmenu(state,menu) {
       state.curMenu=menu
    }

  },
  actions: {
  },
  modules: {
  }
})
