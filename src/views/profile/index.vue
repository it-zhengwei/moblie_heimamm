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
          <img :src="userInfo.avatar" alt="" />
        </template>
      </cell>
    </div>
    <div class="middle">
      <cell title="昵称">
        <template #default>
          <span>{{ userInfo.nickname }}</span>
        </template>
      </cell>
      <cell title="性别">
        <template #default>
          <span>{{ GETGENDER }}</span>
        </template>
      </cell>
      <cell title="地区">
        <template #default>
          <span>{{ getCity }}</span>
        </template>
      </cell>
      <cell title="个人简介" class="last">
        <template #default>
          <span class="individual">{{ userInfo.intro }}</span>
        </template>
      </cell>
    </div>
    <van-button class="btn" text="退出登录" size="large"></van-button>
  </div>
</template>

<script>
// 导入map辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  // 计算属性
  computed: {
    // 展开state的userInfo内容
    ...mapState(['userInfo']),
    // 展开getters里的性别  city
    ...mapGetters(['GETGENDER', 'getCity'])
  },
  methods: {
    // 顶部返回按钮触发的事件
    onClickLeft () {
      // 返回我的页面
      this.$router.push('/my')
    }
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
