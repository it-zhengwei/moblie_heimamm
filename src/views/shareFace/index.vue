<template>
  <div class="shareFace">
    <van-sticky>
      <div class="bg">
        <navBar
          class="navBar"
          title="我分享的面经"
          @onClickLeft="onClickLeft"
        ></navBar>
        <van-field
          @click-input="findSearch"
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
    </van-sticky>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <face v-for="(item, index) in shareList" :key="index" :item="item"></face>
    </van-list>
  </div>
</template>

<script>
import { share } from '@/api/find.js'
export default {
  name: 'shareFace',
  data () {
    return {
      loading: false,
      finished: false,
      value: '',
      shareList: [],
      star: 0,
      limit: 5
    }
  },
  methods: {
    // 点击输入框就跳转到搜索页
    findSearch (e) {
      this.$router.push('/findSearch')
    },
    // 触底加载触发的方法
    onLoad () {
      // 获取面经列表
      share({ star: this.star, limit: this.limit }).then(res => {
        res.data.list.forEach(v => {
          v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
        })
        this.shareList.push(...res.data.list)
        this.star += this.limit
        this.loading = false
        if (this.shareList.length >= res.data.total) {
          this.finished = true
        }
      })
    },
    // 返回按钮
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.shareFace {
  padding: 0 15px;

  .navBar {
    margin: 0 -15px;
    padding: 0 15px;
  }
  .inp {
    height: 34px;
    background-color: #f7f4f5;
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
