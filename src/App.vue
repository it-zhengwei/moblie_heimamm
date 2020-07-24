<template>
  <div>
    <router-view></router-view>
    <van-tabbar
      v-model="active"
      active-color="#e40137"
      inactive-color="#000"
      route
      placeholder
      class="tabbar"
    >
      <van-tabbar-item to="/company">
        <span>公司</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_gs_nor"> </i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/question">
        <span>刷题</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_st_nor"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/find">
        <span>发现</span>
        <template #icon>
          <i class="iconfont iconicon_liulanliang"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_wode_nor"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less">
.tabbar {
  .iconfont {
    font-size: 28px;
  }
}
</style>
