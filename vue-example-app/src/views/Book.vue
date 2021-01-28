<template>
  <div>
    <!-- 轮播图 -->
    <div class="carousel">
      <!-- 轮播图的组件 -->
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in imgList" :key="item">
          <img :src="'https://images.weserv.nl/?url=' + item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="tab-list">
      <!-- 选项卡 -->
      <!-- :stretch="true"：标签页自动抻开  -->
      <el-tabs v-model="activeName" :stretch="true" @tab-click="changeList">
        <!-- 它这里label标签用于显示你要点击的那个位置的文字 -->
        <el-tab-pane label="虚构类" name="book_fiction"></el-tab-pane>
        <el-tab-pane label="非虚构类" name="book_nonfiction"></el-tab-pane>
      </el-tabs>
      <!-- 展示书单的内容 -->
      <ul>
        <li class="book-item" v-for="book in bookList" :key="book.id">
          <!-- 图片区 -->
          <div class="img-box">
            <img
              :src="'https://images.weserv.nl/?url=' + book.cover.url"
              alt=""
            />
          </div>
          <!-- 内容区 -->
          <div class="content">
            <h3>{{ book.title }}</h3>
            <p>{{ book.info }}</p>
            <!-- 评分组件 -->
            <!-- 默认值最大是5，自己的数据有8点多的，除2折个半 -->
            <el-rate
              :value="book.rating.value / 2"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* 需要一个书单 */
      bookList: [],
      /* 轮播图需要图片 */
      imgList: [],
      /* 默认选中虚构类 */
      activeName: "book_fiction",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios
        .get(
          "https://bird.ioliu.cn/v2?url=https://m.douban.com/rexxar/api/v2/subject_collection/" +
            this.activeName +
            "/items?start=0&count=8"
        )
        .then((res) => {
          this.bookList = res.data.subject_collection_items;
          /* 
          想要拿到的img其实已经在拿bookList时已经拿到
          因此可以让bookList里面的每一项都返回图片
          作为数组赋值给imgList
          */
          this.imgList = this.bookList.map((item) => {
            return item.cover.url;
          });
        });
    },
    /* 点击label切换bookList里面的内容 */
    changeList() {
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-carousel__item {
  img {
    width: 100%;
  }
}
.book-item {
  display: flex;
  border-bottom: 1px dashed cadetblue;
  .img-box {
    flex: 3;
    img {
      width: 100%;
    }
  }
  .content {
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    padding: 0.5rem;
    h3 {
      font-weight: bold;
    }
  }
}
</style>