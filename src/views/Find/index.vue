<template>
  <div class="find">
    <navBar title="发现"></navBar>
    <cell class="cell" title="面试技巧">
      <template #default>
        <span>查看更多</span>
      </template>
    </cell>
    <div class="content" v-for="(item, index) in items" :key="index">
      <div class="left">
        <p class="text">从面试者到面试官，我总结了提升成功率的5大关键要素</p>
        <ul>
          <li><span>6小时前</span></li>
          <li>
            <i class="iconfont iconicon_liulanliang"></i><span>8377</span>
          </li>
          <li>
            <i class="iconfont iconbtn_dianzan_big_nor"></i><span>773</span>
          </li>
        </ul>
      </div>
      <div class="right">
        <img class="phone" src="@/assets/01.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'find',
  data () {
    return {
      items: [0, 1, 2, 3, 4, 5, 6]
    }
  }
}
</script>

<style lang="less">
.find {
  .cell {
    .van-cell__title {
      margin-left: -10px;

      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;

      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
    }
  }
  .content {
    background-color: #fff;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    .left {
      flex: 2;
      .text {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        margin: 0;
        margin-bottom: 8px;
        color: #181a39;
        line-height: 23px;
        letter-spacing: 0px;
      }
      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;

        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;

        color: #b4b4bd;
        line-height: 17px;
        letter-spacing: 0px;
        .iconfont {
          margin-right: 8px;
        }
      }
    }
    .right {
      flex: 1;
      margin-left: 10px;
      .phone {
        width: 113px;
        height: 75px;
        border-radius: 8px;
      }
    }
  }
}
</style>
