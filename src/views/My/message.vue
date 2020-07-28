<template>
  <div class="message">
    <div class="navBar">
      <navBar
        @onClickLeft="onClickLeft"
        @onClickRight="onClickRight"
        title="我的消息"
        right="全部已读"
      ></navBar>
    </div>
    <ul class="cellList">
      <li>
        <cell title="您提交的反馈外面已经收到">
          <template #default>
            <i class="iconfont iconicon_xueli"></i>
          </template>
        </cell>
      </li>
      <li>
        <cell title="您提交的反馈外面已经收到">
          <template #default>
            <i class="iconfont iconicon_xueli"></i>
          </template>
        </cell>
      </li>
      <li>
        <cell title="您提交的反馈外面已经收到">
          <template #default>
            <i class="iconfont iconicon_xueli"></i>
          </template>
        </cell>
      </li>
      <li>
        <cell title="您提交的反馈外面已经收到">
          <template #default>
            <i class="iconfont iconicon_xueli"></i>
          </template>
        </cell>
      </li>
    </ul>
  </div>
</template>

<script>
// 导入cell组件
import cell from './cell.vue'
export default {
  // 注册
  components: {
    cell
  },
  methods: {
    // 返回按钮触发的事件
    onClickLeft () {},
    // 点击全部已读触发的事件
    onClickRight () {}
  }
}
</script>

<style lang="less">
.message {
  padding: 0 15px;
  .navBar {
    margin: 0 -15px;
    margin-bottom: 18px;
    padding: 0 15px;
    .van-nav-bar__title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;

      color: #222222;
    }
    .van-nav-bar__text {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;

      color: #181a39;
    }
  }
  .cellList {
    li {
      margin-bottom: 11px;
      border-radius: 8px;
      overflow: hidden;
      .cell {
        .van-cell {
          height: 55px;
          display: flex;
          align-items: center;
          .van-cell__title {
            flex: 2;

            font-size: 15px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;

            color: #181a39;
          }
          .iconfont {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
