<template>
  <div class="my">
    <div class="top">
      <div class="header">
        <div class="left">
          <h2>{{ userInfo.nickname }}</h2>
          <p>{{ userInfo.intro }}</p>
        </div>
        <div class="right">
          <img :src="userInfo.avatar" alt="" />
        </div>
      </div>
      <ul>
        <li>
          <h3>{{ userInfo.submitNum }}</h3>
          <p>累计答题</p>
        </li>
        <li>
          <h3>{{ userInfo.collectQuestions.length }}</h3>
          <p>收藏题目</p>
        </li>
        <li>
          <h3>{{ userInfo.errorNum }}</h3>
          <p>我的错题</p>
        </li>
        <li>
          <h3>
            {{ accuracy }}
            <span>%</span>
          </h3>
          <p>正确率</p>
        </li>
      </ul>
      <div class="botton">
        <cell title="我的岗位" icon="iconicon_mine_gangwei">
          <template #default>
            {{ userInfo.position }}
          </template>
        </cell>
      </div>
    </div>
    <div class="data">
      <h3>面试数据</h3>
      <ul>
        <li>
          <span
            >昨日阅读<i>{{ userInfo.shareData.read.yesterday }}</i></span
          >
          <h1>{{ userInfo.shareData.read.total }}</h1>
          <p>阅读总数</p>
        </li>
        <li>
          <span
            >昨日获赞<i>{{ userInfo.shareData.star.yesterday }}</i></span
          >
          <h1>{{ userInfo.shareData.star.total }}</h1>
          <p>获赞总数</p>
        </li>
        <li>
          <span
            >昨日新增<i>{{ userInfo.shareData.comment.yesterday }}</i></span
          >
          <h1>{{ userInfo.shareData.comment.total }}</h1>
          <p>评论总数</p>
        </li>
      </ul>
    </div>
    <div class="cellList">
      <cell title="我的面试分享" icon="iconicon_mine_mianjing">
        <template #default>
          21
        </template></cell
      >
      <cell title="我的消息" icon="iconicon_mine_xiaoxi">
        <template #default>
          {{ userInfo.systemMessages }}
        </template></cell
      >
      <cell title="收藏的题库" icon="iconicon_mine_tikushoucang">
        <template #default>
          {{ userInfo.collectQuestions.length }}
        </template></cell
      >
      <cell title="收藏的企业" icon="iconicon_mine_qiyeshoucang">
        <template #default>
          32
        </template></cell
      >
      <cell title="我的错题" icon="iconicon_mine_cuoti">
        <template #default>
          {{ userInfo.errorQuestions.length }}
        </template></cell
      >
      <cell title="收藏的面试经验" icon="iconbtn_shoucang_sel">
        <template #default>
          {{ userInfo.collectArticles.length }}
        </template></cell
      >
    </div>
  </div>
</template>

<script>
// 导入mapState
import { mapState } from 'vuex'
// 导入cell单元格组件
import cell from './cell.vue'
export default {
  name: 'my',
  // 注册
  components: {
    cell
  },
  // 计算属性
  computed: {
    // 把state里的userInfo展开  userInfo:{}
    ...mapState(['userInfo']),
    // 计算正确率
    accuracy () {
      return ((this.userInfo.submitNum - this.userInfo.errorNum) / 100).toFixed(
        1
      )
    }
  }
}
</script>

<style lang="less">
.my {
  padding: 30px 15px;
  .top {
    position: relative;
    height: 260px;
    background: linear-gradient(45deg, #ce0031, #b8002c);
    margin: -30px -15px;
    padding: 30px 15px;
    margin-bottom: 30px;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      .left {
        h2 {
          font-size: 21px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          color: @white-color;
        }
        p {
          opacity: 0.7;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: @white-color;
        }
      }
      .right {
        width: 50px;
        height: 50px;

        border: 3px solid rgba(255, 255, 255, 0.38);
        border-radius: 50%;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .botton {
      position: absolute;
      bottom: -15px;
      width: 345px;
      border-radius: 8px;
    }
    ul {
      display: flex;
      justify-content: space-around;

      li {
        text-align: center;
        h3 {
          margin: 0;
          margin-top: 30px;
          font-size: 21px;
          font-family: DINAlternate, DINAlternate-Bold;
          font-weight: 700;
          color: @white-color;
        }
        p {
          margin: 0;
          margin-top: 6px;
          opacity: 0.7;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: @white-color;
        }
        &:last-child h3 span {
          margin-left: -5px;
          font-size: 12px;
        }
      }
    }
  }
  .data {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 19px 15px;
    border-radius: 8px;
    h3 {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #181a39;
    }
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        text-align: center;
        span {
          font-size: 10px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #b4b4bd;
          i {
            font-style: normal;
            color: #00b8d4;
          }
        }
        h1 {
          font-size: 21px;
          font-family: DINAlternate, DINAlternate-Bold;
          font-weight: 700;
          color: #181a39;
        }
        p {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #545671;
        }
      }
    }
  }
  .cellList {
    border: 2px solid #fff;
    border-radius: 8px;
    background: #ffffff;
  }
  .van-cell {
    border: 2px solid #fff;
    border-radius: 8px;
    font-size: 15px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
  }
}
</style>
