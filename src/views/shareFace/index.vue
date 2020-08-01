<template>
  <div class="shareFace">
    <navBar title="我分享的面经"></navBar>
    <van-field
      center
      class="inp"
      v-model="value"
      size="large"
      placeholder="请输入关键字"
    >
      <template #left-icon>
        <i class="iconfont iconicon_search"></i>
      </template>
    </van-field>
  </div>
</template>

<script>
export default {
  name: 'shareFace',
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style lang="less">
.shareFace {
  .inp {
    height: 34px;
    background: #f7f4f5;
    border-radius: 17px;

    .van-field__control {
      text-align: center;
    }
  }
}
</style>
