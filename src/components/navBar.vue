<template>
  <van-nav-bar
    class="navBar"
    :title="title"
    :right-text="right"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <!-- 定义了插槽会覆盖属性定义的内容 -->
    <!-- 使用插槽定义左侧内容 -->
    <template #left>
      <i class="iconfont iconbtn_nav_back"></i>
    </template>
    <!-- 使用插槽定义右侧内容 -->
    <template #right>
      <slot name="right"></slot>
    </template>
    <!-- 使用插槽定义标题内容 -->
    <template #title>
      <slot name="title"></slot>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'navBar',
  props: ['title', 'right'],
  methods: {
    onClickLeft () {
      this.$emit('onClickLeft')
    },
    onClickRight () {
      this.$emit('onClickRight')
    }
  }
}
</script>

<style lang="less">
.navBar {
  .iconbtn_nav_back {
    font-size: 44px;
  }
  .van-nav-bar__left {
    padding: 0;
  }
}
</style>
