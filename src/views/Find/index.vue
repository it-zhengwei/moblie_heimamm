<template>
  <van-pull-refresh
    success-text="刷新成功"
    v-model="isLoading"
    @refresh="onRefresh"
  >
    <div class="find">
      <navBar title="发现" :showBar="false"></navBar>
      <cell class="cell" title="面试技巧">
        <template #default>
          <span>查看更多</span>
        </template>
      </cell>
      <!-- 面试技巧 -->
      <div class="content" v-for="(item, index) in technicList" :key="index">
        <div class="left">
          <p class="text">
            {{ item.title }}
          </p>
          <ul>
            <li class="leftText">
              <span>{{ item.created_at | formatTime }}</span>
            </li>
            <li>
              <i class="iconfont iconicon_liulanliang"></i
              ><span>{{ item.read }}</span>
            </li>
            <li>
              <i class="iconfont iconbtn_dianzan_big_nor"></i
              ><span>{{ item.star }}</span>
            </li>
          </ul>
        </div>
        <div class="right" v-if="item.cover !== baseURL + 'null'">
          <img class="phone" :src="item.cover" alt="" />
        </div>
      </div>

      <!-- 市场数据 -->
      <div class="cityList">
        <cell title="市场数据">
          <template #default>
            查看更多
          </template>
        </cell>
        <div class="tagList">
          <div class="tag">{{ cityList.city }}</div>
          <div class="tag">{{ cityList.position }}</div>
        </div>
        <div class="data" v-for="(item, index) in some" :key="index">
          <div class="year">{{ item.year.split('工')[0] }}</div>
          <div class="nprogradient">
            <div
              class="red"
              :style="{
                width:
                  ((item.salary / cityList.topSalary) * 100).toFixed(1) + '%'
              }"
            >
              ￥{{ item.salary }}
            </div>
          </div>
          <div class="num">
            <div class="item" v-if="item.percent">
              <i
                class="iconfont iconicon_xiajiang"
                :class="{ iconicon_shangsheng: item.percent > 0 }"
              ></i>
              {{ item.percent }}%
            </div>
          </div>
        </div>
        <div class="more" @click="isShow">
          展开更多<i
            class="iconfont iconicon_zhankai"
            :class="{ aaa: isMore }"
          ></i>
        </div>
      </div>

      <!-- 面经分享 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="share">
          <cell title="面经分享">
            <template #default>
              查看更多
            </template>
          </cell>
          <div class="Data" v-for="(item, index) in shareList" :key="index">
            <h3>{{ item.title.split('-')[1] }}</h3>
            <p>
              {{ item.content.split('-')[1] }}
            </p>
            <ul class="bottom">
              <li>
                <img :src="item.author.avatar" alt="" />{{
                  item.author.nickname
                }}
              </li>
              <li>{{ item.created_at | formatTime }}</li>
              <li>
                <i class="iconfont iconicon_pinglunliang"></i>{{ item.read }}
              </li>
              <li>
                <i class="iconfont iconbtn_dianzan_small_nor"></i
                >{{ item.star }}
              </li>
            </ul>
          </div>
        </div>
      </van-list>
    </div>
  </van-pull-refresh>
</template>

<script>
// 导入moment
import moment from 'moment'
// 导入api
import { technic, cityData, share } from '@/api/find.js'
export default {
  name: 'find',
  data () {
    return {
      technicList: [],
      baseURL: process.env.VUE_APP_URL,
      // 市场数据
      cityList: [],
      // 是否展开更多
      isMore: false,
      // 截取的数据
      some: [],
      // 面经列表
      shareList: [],
      // 是否加载
      isLoading: false,
      // 控制下拉刷新是否加载
      loading: false,
      // 是否加载完毕
      finished: false
    }
  },
  methods: {
    // 下拉刷新执行的回调函数
    onLoad () {},
    // 下拉刷新执行的回调函数
    onRefresh () {
      this.getData()
      this.isMore = false
      this.isLoading = false
    },
    getData () {
      // 获取面试技巧数据
      technic().then(res => {
        res.data.list.forEach(v => {
          v.cover = process.env.VUE_APP_URL + v.cover
        })
        this.technicList = res.data.list
      })
      // 获取市场数据
      cityData().then(res => {
        this.cityList = res.data
        this.some = this.cityList.yearSalary.reverse().slice(0, 3)
      })

      // 获取面经列表
      share({ limit: 3 }).then(res => {
        res.data.list.forEach(v => {
          v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
        })
        this.shareList = res.data.list
      })
    },
    // 展开更多的事件
    isShow () {
      this.isMore = !this.isMore
      if (this.isMore) {
        this.some = this.cityList.yearSalary
      } else {
        this.some = this.cityList.yearSalary.slice(0, 3)
      }
    }
  },
  created () {
    this.getData()
  },
  // 过滤器
  filters: {
    formatTime (time) {
      return moment(time).format('YYYY年MM月DD日')
    }
  }
}
</script>

<style lang="less" scope>
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
      flex: 1;
      .text {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        margin: 0;
        margin-bottom: 8px;
        color: #181a39;
        line-height: 23px;
        letter-spacing: 0px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
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
        .iconbtn_dianzan_big_nor {
          margin-left: 21px;
        }
        .leftText {
          flex: 1;
        }
        .iconfont {
          margin-right: 8px;
        }
      }
    }
    .right {
      margin-left: 10px;
      .phone {
        display: block;
        width: 113px;
        height: 75px;
        border-radius: 8px;
      }
    }
  }
  .cityList {
    margin-bottom: 10px;
    margin-top: 10px;
    background-color: #fff;
    .tagList {
      display: flex;
      margin-top: 20px;
      .tag {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #545671;
        padding: 0 5px;
        height: 24px;
        line-height: 24px;
        background-color: @minor-font-color;
        border-radius: 4px;
        margin-left: 10px;
      }
    }
    .data {
      display: flex;
      align-items: center;
      margin-top: 20px;
      padding: 0 15px;
      .year {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #545671;
        line-height: 20px;
        letter-spacing: 0px;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;

        color: #545671;
      }
      .nprogradient {
        flex: 1;
        background-color: @minor-font-color;
        border-radius: 4px;
        height: 12px;
        overflow: hidden;
        margin: 0 15px;
        .red {
          font-size: 11px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: right;
          color: #ffffff;
          line-height: 15px;
          letter-spacing: 0px;
          height: 100%;
          border-radius: 4px;
          background-color: @main-color;
        }
      }
      .num {
        width: 50px;
        .item {
          display: flex;
          align-items: center;
          font-size: 14px;
          .iconfont {
            font-size: 15px;
            margin-right: 5px;
          }
          .iconicon_xiajiang {
            color: @main-color;
          }
          .iconicon_shangsheng {
            color: @success-color;
          }
        }
      }
    }
    .more {
      padding: 25px 0 19px;
      font-size: 14px;
      display: flex;
      color: #545671;
      justify-content: center;

      i {
        font-size: 14px;
      }
      .aaa {
        transform: rotate(180deg);
      }
    }
  }

  .share {
    margin-bottom: 60px;
    background-color: #fff;
    .van-cell__title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;

      color: #222222;
    }
    .Data {
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
      .bottom {
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
  }
}
</style>
