<template>
  <div class="interview-search-container">
    <!-- 顶部 -->
    <van-sticky>
      <div class="top-box">
        <navBar title="面经分享搜索" @onClickLeft="onClickLeft"></navBar>
        <van-search
          shape="round"
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        >
          <template #left-icon>
            <i class="iconfont iconicon_search"></i>
          </template>
        </van-search>
      </div>
    </van-sticky>

    <!-- 搜索选项 -->
    <div v-if="searchList === ''" class="option-box">
      <!-- 热搜区域 -->
      <div class="section">
        <div class="title">大家都在搜索</div>
        <ul class="tags">
          <li
            class="tag"
            v-for="(item, index) in hotList"
            @click="hotSearch(item)"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- 历史记录区域 -->
      <div class="section">
        <div class="title">
          历史记录 <span @click="clearHistory">清空</span>
        </div>
        <div class="tags">
          <span
            class="tag"
            v-for="(item, index) in history"
            @click="hotSearch(item)"
            :key="index"
            >{{ item }}</span
          >
        </div>
      </div>
    </div>
    <!-- 搜索信息展示 -->

    <face
      class="face"
      v-else-if="searchList.length > 0"
      v-for="(item, index) in searchList"
      :item="item"
      :key="index"
    ></face>

    <span v-else class="text">没有数据</span>
  </div>
</template>

<script>
// 导入历史记录的工具方法
import { saveHistory, getHistory, removeHistory } from '@/utils/historyLocal.js'
// 导入api
import { technicTopSearch, share } from '@/api/find.js'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      value: '',
      // 热搜
      hotList: [],
      // 历史搜索记录
      history: getHistory(),
      // 搜索信息
      searchList: ''
    }
  },
  methods: {
    // 导航返回按钮
    onClickLeft () {
      this.$router.go(-1)
    },
    // 搜索功能
    search () {
      share({ q: this.value }).then(res => {
        if (res.data.list.length > 0) {
          res.data.list.forEach(v => {
            // 把与搜索相同的内容设置标签
            v.title = v.title.replace(
              this.value,
              '<span>' + this.value + '</span>'
            )
            v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
          })
        }

        this.searchList = res.data.list
      })
    },
    // 点击搜索
    hotSearch (data) {
      // 输入框的名字为当前项的值
      this.value = data
      // 搜索功能
      this.search()
    },
    // 清空历史记录
    clearHistory () {
      // 清除缓存的历史记录
      removeHistory()
      // 历史记录为空
      this.history = []
    },
    // 搜索确定功能
    onSearch () {
      const index = this.history.indexOf(this.value)
      // 判断数组是否重复了
      if (index !== -1) {
        // 存在
        this.history.splice(index, 1)
      }
      // 把搜索记录追加到数组
      this.history.push(this.value)
      // 判断是否超过五个了
      if (this.history.length > 5) {
        // 删除前面的一个数组
        this.history.shift()
      }
      saveHistory(this.history)
      // 搜索功能
      this.search()
    },
    // 取消搜索功能
    onCancel () {
      this.searchList = ''
    }
  },
  created () {
    technicTopSearch().then(res => {
      this.hotList = res.data
    })
  }
}
</script>

<style lang="less">
.interview-search-container {
  background-color: #fff;
  height: 100vh;

  .top-box {
    padding-bottom: 11px;
    background: @white-color;
    position: relative;
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: 0 solid #ebedf0;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      border-bottom-width: 0.02667rem;
    }
    .van-hairline--bottom::after {
      border-bottom-width: 0;
    }
    .van-search__content {
      background: #f7f4f5;
      font-size: 14px;
      color: #b3b3b3;
      .iconfont {
        font-size: 19px;
        color: #b3b3b3;
      }
    }
  }
  // 搜索选项
  .option-box {
    padding: 15px;

    .section {
      margin-bottom: 27px;
      .title {
        font-size: 18px;
        font-weight: 500;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 12px;
          color: #545671;
        }
      }
      .tags {
        margin-top: 18px;
        display: flex;
        .tag {
          margin-right: 10px;
          margin-bottom: 11px;
          padding: 6px;
          border-radius: 4px;
          font-size: 12px;
          color: @subdominant-font-color;
          background-color: #eceaea;
        }
      }
    }
  }
  .face {
    margin-bottom: 50px;
  }
  .result-box {
    padding: 15px;
  }
}
</style>
