<template>
  <div class="cell">
    <van-cell :title="title" :value="value">
      <template #icon>
        <i class="iconfont" :class="icon"></i>
      </template>
      <template #right-icon>
        <i class="iconfont iconicon_more"></i>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: ['title', 'value', 'icon']
}
</script>

<style lang="less">
.cell {
  .iconicon_more {
    margin-left: 9px;
    font-size: 14px;
  }
  i {
    &:first-child {
      padding-right: 13px;
      font-size: 20px;
      font-weight: 400;
    }
  }
}
</style>
