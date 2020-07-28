<template>
  <div class="profile">
    <div class="navBar">
      <navBar @onClickLeft="onClickLeft">
        <template #title>
          <h3 class="title">我的资料</h3>
        </template>
      </navBar>
    </div>
    <div class="top">
      <cell title="头像">
        <template #default>
          <img src="@/assets/01.jpg" alt="" />
        </template>
      </cell>
    </div>
    <div class="middle">
      <cell title="昵称">
        <template #default>
          <span>续命咖啡</span>
        </template>
      </cell>
      <cell title="性别">
        <template #default>
          <span>男</span>
        </template>
      </cell>
      <cell title="地区">
        <template #default>
          <span>北京</span>
        </template>
      </cell>
      <cell title="个人简介" class="last">
        <template #default>
          <span class="individual">主任有点懒,什么都没有写</span>
        </template>
      </cell>
    </div>
    <van-button class="btn" text="退出登录" size="large"></van-button>
  </div>
</template>

<script>
// 导入cell单元格组件
import cell from './cell.vue'
export default {
  // 注册
  components: {
    cell
  },
  methods: {
    // 顶部返回按钮触发的事件
    onClickLeft () {}
  }
}
</script>

<style lang="less">
.profile {
  padding: 0 15px;
  .navBar {
    margin: 0 -15px;
    margin-bottom: 18px;
    padding: 0 15px;
    h3 {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 400;
      color: #222222;
    }
  }
  .top {
    border-radius: 8px;
    margin-bottom: 10px;
    overflow: hidden;
    .van-cell {
      height: 60px;
      display: flex;
      align-items: center;
    }
    img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
    }
  }
  .middle {
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 15px;
    .last {
      .van-cell {
        .van-cell__value {
          flex: 2;
        }
      }
    }
    .van-cell {
      height: 55px;
      display: flex;
      align-items: center;
    }
    .cell {
      font-size: 25px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;

      color: #181a39;

      span {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;

        color: #5b5d75;
      }
    }
  }
  .btn {
    background: #ffffff;
    border-radius: 8px;

    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;

    color: #e40137;
  }
}
</style>
