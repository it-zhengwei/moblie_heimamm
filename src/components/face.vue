<template>
  <div>
    <div class="data" v-for="(item, index) in shareList" :key="index">
      <h3>{{ item.title.split('-')[1] }}</h3>
      <p>
        {{ item.content.split('-')[1] }}
      </p>
      <ul>
        <li>
          <img :src="item.author.avatar" alt="" />{{ item.author.nickname }}
        </li>
        <li>{{ item.created_at | formatTime }}</li>
        <li><i class="iconfont iconicon_pinglunliang"></i>{{ item.read }}</li>
        <li>
          <i class="iconfont iconbtn_dianzan_small_nor"></i>{{ item.star }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'face',
  props: {
    shareList: {
      type: Array
    }
  },
  filters: {
    formatTime (value) {
      return moment(value).format('YYYY年MM月DD日')
    }
  }
}
</script>

<style lang="less">
.data {
  padding: 0 15px;
  h3 {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    margin-top: 30px;
    margin-bottom: 10px;
    color: #181a39;
  }
  p {
    font-size: 13px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    margin-bottom: 20px;
    color: #545671;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  ul {
    display: flex;
    align-items: center;
    li {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      margin-left: 21px;
      color: #545671;
      &:first-child {
        margin: 0;
        flex: 1;
        display: flex;
        align-items: center;
      }
      img {
        height: 22px;
        width: 22px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
</style>
