<template>
  <div class="shareFace">
    <navBar class="navBar" title="我分享的面经"></navBar>
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
    <face :shareList="shareList"></face>
  </div>
</template>

<script>
import { share } from '@/api/find.js'
export default {
  name: 'shareFace',
  data () {
    return {
      value: '',
      shareList: []
    }
  },
  created () {
    // 获取面经列表
    share().then(res => {
      res.data.list.forEach(v => {
        v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
      })
      this.shareList = res.data.list
    })
  }
}
</script>

<style lang="less">
.shareFace {
  padding: 0 15px;
  .navBar {
    margin: 0 -15px;
    padding: 0 15px;
  }
  .inp {
    height: 34px;
    background: #f7f4f5;
    border-radius: 17px;

    .van-field__control {
      text-align: center;
    }
    .iconicon_search {
      text-align: center;
    }
  }
}
</style>
