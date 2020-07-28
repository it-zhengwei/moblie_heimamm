<template>
  <div class="setNickname">
    <div class="navBar">
      <navBar
        title="修改昵称"
        right="保存"
        @onClickLeft="onClickLeft"
        @onClickRight="onClickRight"
      ></navBar>
    </div>

    <van-cell-group>
      <van-field
        class="inp"
        v-model="value"
        size="large"
        :center="true"
      ></van-field>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '续命咖啡'
    }
  },
  methods: {
    // 顶部返回按钮触发的事件
    onClickLeft () {},
    // 点击保存触发的事件
    onClickRight () {}
  }
}
</script>

<style lang="less">
.setNickname {
  padding: 0 15px;
  .navBar {
    margin: 0 -15px;
    margin-bottom: 20px;
    padding: 0 15px;
    .van-ellipsis {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;

      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
    }
    .van-nav-bar__text {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;

      color: #181a39;
      line-height: 20px;
      letter-spacing: 0px;
    }
  }
  .inp {
    height: 34px;
    background: #f7f4f5;
    border-radius: 4px;

    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #181a39;
    line-height: 20px;
    letter-spacing: 0px;
  }
}
</style>
