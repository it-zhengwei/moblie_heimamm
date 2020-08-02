<template>
  <div class="company">
    <div class="top">
      <h1>公司</h1>
      <van-search
        shape="round"
        input-align="center"
        @search="onSearch"
        @cancel="onCancel"
        class="search"
        v-model="value"
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'company',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    // 点击键盘搜索或者回车触发
    onSearch () {},
    // 点击键盘的取消触发
    onCancel () {}
  }
}
</script>

<style lang="less">
.company {
  padding: 0 15px;
  height: 100vh;
  background-color: #fff;
  .top {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    h1 {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;

      color: #222222;
    }
    .search {
      height: 34px;
      flex: 1;
    }
  }
  .swipe {
    .my-swipe {
      .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 127px;
        text-align: center;
        background-color: #39a9ed;
      }
    }
  }
}
</style>
