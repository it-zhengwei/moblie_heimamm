<template>
  <div class="cell">
    <van-cell :title="title" :value="value" @click="click">
      <template #icon>
        <i class="iconfont" :class="icon"></i>
      </template>
      <template #right-icon>
        <i class="iconfont iconicon_more"></i>
      </template>
      <template #default>
        <slot name="default"></slot>
      </template>
      <!-- <template #title>
        <slot name="title"></slot>
      </template> -->
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'cell',
  props: ['title', 'value', 'icon'],
  methods: {
    click () {
      this.$emit('click')
    }
  }
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
