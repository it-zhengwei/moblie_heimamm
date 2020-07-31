<template>
  <div class="shareFace">
    <navBar title="我分享的面经"></navBar>
    <van-field v-model="value" placeholder="请输入关键字">
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

<style></style>
