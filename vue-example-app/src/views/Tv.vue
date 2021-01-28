<template>
  <div>
    <ul>
      <!-- tv.id：循环出来的每个tv的id -->
      <li
        v-for="tv in tvList"
        :key="tv.id"
        class="li-style"
        @click="getDetail(tv.id)"
      >
        <!-- 下面开始用来展示要显示的内容 -->
        <!-- 1.图片：图片宽高问题不方便，因此在外面套一个div处理img -->
        <div class="img-box">
          <!-- 因为src后面是变量，所以前面需要加冒号 -->
          <!-- 上网搜一个图片防盗链接，再用加号连接，即可显示出图片 -->
          <img :src="'https://images.weserv.nl/?url=' + tv.cover.url" alt="" />
        </div>
        <!-- 2.显示内容：(1)标题(2)介绍，在一个div中包裹 -->
        <div class="content">
          <!-- 标题 -->
          <h3>{{ tv.title }}</h3>
          <!-- 介绍 -->
          <p>{{ tv.info }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* 
      数组中的值来自请求数据后返回的res
      因此调用get方法的目的是给tvList[]赋值
      */
      tvList: [],
      start: 0,
      isFinish: true, //默认上次请求结束了
    };
  },
  /* created生命周期 */
  created() {
    /* 使用完JsonBird后在created生命周期中调用该方法，自己的项目可以获得相应数据了 */
    this.getData();
  },
  /* mounted生命周期 */
  mounted() {
    /* 懒加载在页面渲染完之后，所以在mounted周期 */
    this.lazyLoad();
  },
  methods: {
    /* 封装一个方法 */
    getData() {
      if (this.isFinish) {
        //如果结束了允许请求数据
        this.isFinish = false; //对上一次请求没结束的限制
        this.axios
          .get(
            "https://bird.ioliu.cn/v2?url=https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items",
            {
              params: {
                start: this.start,
                count: 10,
              },
            }
          )
          /* 在.then里面通过res拿返回结果 */
          .then((res) => {
            /* tvList数组里面的东西就是rest返回的data下面的subject_collection_items里面的内容 */
            //this.tvList = res.data.subject_collection_items;不使用新的替换旧的
            /* 使用新的旧的拼接 */
            /* 方法1 */
            //this.tvList = this.tvList.concat(res.data.subject_collection_items);
            /* 方法2 */
            this.tvList = [
              ...this.tvList,
              ...res.data.subject_collection_items,
            ];
            this.isFinish = true; //拿到res时，允许下一次请求
          });
      }
    },
    /* 封装一个懒加载的方法 */
    lazyLoad() {
      /* 整个页面的高度 */
      let htmlDom = document.documentElement; //拿到html根元素
      let fullH = 0;
      /* 可视窗口的高度 */
      let viewH = htmlDom.clientHeight;
      /* 滑出可视窗口的高度 */
      let scroH = 0;
      /* 因为整个页面滚动时都需要监听，所以给window绑定事件 */
      window.onscroll = () => {
        /* 随着页面的滚动，获取html根元素的高度以及滚动出页面的高度 */
        fullH = htmlDom.offsetHeight;
        scroH = htmlDom.scrollTop;
        console.log(fullH, scroH, viewH);
        /* 滑到底部后换页 */
        /* 给判定条件设一个误差范围 */
        if (fullH - 10 < scroH + viewH) {
          if (this.start < 40) {
            //控制在50个数据的时候就不发送请求了
            this.start += 10;
            // 请求下一页数据
            this.getData();
          }
        }
      };
    },
    getDetail(id){
      this.$router.push('/tvDetail/'+id)
    }
  },
};
</script>

<style lang="scss" scoped>
.li-style {
  display: flex;
  border-bottom: 1px dashed rgb(167, 163, 163);
  img {
    padding: 0.02rem;
    width: 2.5rem;
    /* 图片上下空一样多了 */
    height: 100%;
  }
  .content {
    padding: 0.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    h3 {
      /* 给h3加粗 */
      font-weight: bold;
    }
  }
}
/* 
参考一下老师的写法，开启一下新思路
.li-style {
  display: flex;
  padding: 0.2rem 0;
  border-bottom: 1px dashed #ccc;
  .img-box {
    flex: 3;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    flex: 5;
    padding: 0.8rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-weight: bold;
    }
  }
}
 */
</style>