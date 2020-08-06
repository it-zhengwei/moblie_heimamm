<template>
  <div class="experience-detail-container">
    <!-- 导航栏 -->
    <navBar @onClickLeft="onClickLeft"></navBar>
    <!-- 骨架屏 -->
    <van-skeleton v-if="detailsList === ''" title avatar :row="20" />
    <template v-else>
      <!-- 顶部 -->
      <div class="top-box" v-if="detailsList !== ''">
        <div class="title">
          {{ detailsList.title }}
        </div>
        <div class="info-box">
          <img :src="detailsList.author.avatar" alt="" />
          <div class="name-box">
            <span class="name">{{ detailsList.author.nickname }}</span>
            <span class="time">{{ detailsList.created_at | formatTime }}</span>
          </div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="experience-content" v-html="detailsList.content">
        <img src="@/assets/01.jpg" alt="" />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto enim id
        deleniti, sint, repudiandae obcaecati voluptatibus pariatur
        exercitationem odit est a illum et aperiam voluptas quo? Debitis quis
        ratione magni consequatur eos sit rerum at, corrupti est ullam soluta ad
        eveniet reiciendis. Dolores libero, suscipit id pariatur facilis omnis
        earum? Quo enim reprehenderit mollitia dolor dicta placeat, asperiores
        hic laboriosam. Beatae molestias officiis suscipit fugit in libero quae,
        sapiente voluptatum vel voluptatem sint atque nisi ab, repellendus
        officia temporibus commodi ipsam error rem tenetur magni sit cum
        blanditiis. Beatae, ullam assumenda debitis sint minima quasi!
        Dignissimos sapiente ut doloribus! Eveniet molestias itaque dolorem
        minima ratione maiores sint nostrum quidem, cumque non magni, eius amet
        sunt obcaecati eaque ea dolorum. Cumque vitae explicabo nemo omnis
        voluptas asperiores rem molestiae assumenda architecto sapiente, rerum
        excepturi quia veritatis tenetur magnam reiciendis deserunt natus ab
        modi? Illo molestiae sint iste asperiores nemo recusandae, dolorem et ea
        saepe sit cum deleniti, consectetur, iure nostrum quis sed rerum quos
        voluptates quibusdam! Ducimus ab commodi dolorum esse nisi, dignissimos
        in consequatur sunt tempore, eveniet ex facere quis placeat deleniti
        iure. Nostrum, exercitationem sequi commodi qui, consequuntur nihil quo
        praesentium, saepe omnis laboriosam ducimus molestiae aliquam voluptatem
        ut nulla accusamus soluta porro! Deserunt sed porro optio explicabo
        impedit exercitationem magnam iusto rerum inventore odio cumque
        praesentium quae modi nihil ut deleniti, totam dolores fugit vitae sint
        obcaecati asperiores officia quisquam. Quas, ipsa? Assumenda, hic. Est
        perspiciatis blanditiis quaerat ut ea, eos quisquam error a autem omnis
        dolores fugit hic! Amet impedit laborum voluptatum modi fuga labore
        repudiandae, at dolorem laudantium placeat, optio expedita qui quaerat
        dolores ullam debitis deserunt, consequatur nisi sunt necessitatibus rem
        maiores. Quibusdam facilis dolores vel eum odit eaque quos quisquam ab
        autem error blanditiis, voluptatum cumque vitae tempore quam ipsa
        reiciendis beatae aspernatur esse sequi alias! Doloribus deserunt,
        reprehenderit consequatur rem nostrum veritatis repellat recusandae
        aliquam asperiores dolorem numquam ducimus reiciendis, dolor eligendi
        blanditiis magni voluptatum inventore at, id quibusdam porro neque. Eum
        eos mollitia eligendi delectus tenetur. Eveniet provident nisi quia
        voluptatibus soluta repellat, distinctio labore, fugit minima voluptatum
        earum neque aspernatur dicta molestiae odit aperiam! Eaque harum
        accusamus, perspiciatis voluptatem quas iusto ipsum! Laboriosam quas
        aperiam ipsum, at rem aliquam vel optio aut odio pariatur sit
        voluptatibus recusandae praesentium neque
      </div>
    </template>
    <!-- 评论 -->
    <div class="comment-box">
      <!-- 顶部评论 -->
      <div class="title">
        评论 <span class="num">{{ total }}</span>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 每一项 -->
        <div class="comment" v-for="(item, index) in commentList" :key="index">
          <!-- 姓名 点赞区域 -->
          <div class="info-box">
            <img :src="item.author.avatar" alt="" />
            <div class="name-box" @click="popUp(item)">
              <span class="name">{{ item.author.nickname }}</span>
              <span class="time">{{ item.created_at | formatTime }}</span>
            </div>
            <div class="zan-box">
              <span>{{ item.star }}</span>
              <i
                class="iconfont iconbtn_dianzan_small_nor"
                :class="{
                  comment: userInfo && userInfo.starComments.includes(item.id)
                }"
                @click="commentsStar(item)"
              ></i>
            </div>
          </div>
          <!-- 评论内容 -->
          <div class="content-box">
            <div class="content">{{ item.content }}</div>
            <div class="reply-box" v-if="item.children_comments.length > 0">
              <div
                class="reply"
                v-for="(it, index) in item.children_comments"
                :key="index"
              >
                <span class="name">{{ it.author }}:</span>
                {{ it.content }}
              </div>
            </div>
          </div>

          <van-sticky>
            <!-- 底部盒子 -->
            <div class="bottom-box">
              <div class="input" @click="popUp()">我来补充两句</div>
              <div class="shoucang">
                <i
                  class="iconfont iconbtn_shoucang_nor"
                  :class="{ collect: collect }"
                  @click="shoucang"
                ></i>
                {{ collectNum }}
              </div>
              <div class="star">
                <i
                  class="iconfont iconbtn_dianzan_small_nor"
                  :class="{ active: praise }"
                  @click="star"
                ></i>
                {{ detailsList.star }}
              </div>
              <div class="share" @click="fenxiang">
                <i class="iconfont iconbtn_share"></i>
                {{ detailsList.collect }}
              </div>
            </div>
          </van-sticky>
          <!-- 底部回复弹出层 -->
          <van-popup
            :overlay-style="{ 'background-color': 'transparent' }"
            class="input-pop"
            v-model="show"
            position="bottom"
            :style="{ height: '24%' }"
          >
            <van-field
              autosize
              type="textarea"
              autofocus
              v-model="value"
              :placeholder="placeText"
              rows="4"
            />
            <span @click="submit">发送</span>
          </van-popup>
          <!-- 分享弹出层 -->
          <van-popup v-model="showShare" @click-overlay="imgUrl = ''">
            <div v-if="!imgUrl" class="share-box" ref="xxxx">
              <div class="text">
                长按图片下载并分享
              </div>
              <div class="share-content-box">
                <div class="title">
                  {{ detailsList.title }}
                </div>
                <div class="user-box">
                  <img :src="detailsList && detailsList.author.avatar" alt="" />
                  <span>{{ detailsList && detailsList.author.nickname }}</span>
                </div>
                <div class="content" v-html="detailsList.content"></div>
                <img class="logo" src="@/assets/img_share_logo.png" alt="" />
                <img class="code" :src="src" alt="" />
                <div class="direction">长按识别二维码查看原文</div>
              </div>
            </div>
            <img v-else class="imgger" :src="imgUrl" alt="" />
          </van-popup>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import QRCode from 'qrcode'
// 导入map辅助函数
import { mapState, mapMutations } from 'vuex'
// 导入api
import {
  sharedetails,
  comments,
  setComments,
  articlesStar,
  articlesCollect,
  articleCommentsStar
} from '@/api/find.js'
export default {
  data () {
    return {
      imgUrl: '',
      show: false,
      showShare: false,
      value: '',
      // 详情数据
      detailsList: '',

      // 评论数据
      commentList: [],
      start: 0,
      limit: 3,
      total: 0,
      // 提示
      placeText: '',
      loading: false,
      finished: false,
      // 把item提升
      isItem: '',
      // 收藏数
      collectNum: 0,
      Id: 0,
      src: ''
    }
  },
  // 计算属性
  computed: {
    ...mapState(['userInfo']),

    // 点赞
    praise () {
      // 判断用户是否登录
      if (this.userInfo) {
        if (this.userInfo.starArticles.includes(+this.$route.params.id)) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    // 收藏
    collect () {
      // 判断用户是否登录
      if (this.userInfo) {
        if (this.userInfo.collectArticles.includes(+this.$route.params.id)) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations(['SETONEUSERINFO']),
    // 分享
    async fenxiang () {
      this.showShare = true
      window.scrollTo(0, 0)
      await this.$login()

      this.$nextTick(async () => {
        const canvas = await html2canvas(this.$refs.xxxx[0], {
          useCORS: true,
          backgroundColor: null
        })

        const imgUrl = canvas.toDataURL()

        this.imgUrl = imgUrl
      })
    },
    // 评论点赞
    async commentsStar (data) {
      this.Id = data
      await this.$login()

      const res = await articleCommentsStar({ id: data.id })

      // data.star = res.data.num
      // 修改vuex里的点赞数组
      this.SETONEUSERINFO({ name: 'starComments', value: res.data.list })
    },
    // 收藏功能
    async shoucang () {
      // 需要登录
      await this.$login()
      this.$toast.loading({ decution: 0, message: '收藏中..' })
      const res = await articlesCollect({ id: +this.$route.params.id })
      this.collectNum = res.data.num
      // 修改vuex里的点赞数组
      this.SETONEUSERINFO({ name: 'collectArticles', value: res.data.list })
      if (this.collect) {
        this.$toast.success('收藏成功')
      } else {
        this.$toast.success('取消收藏')
      }
    },
    // 点赞功能
    async star () {
      // 需要登录
      await this.$login()
      this.$toast.loading({ decution: 0, message: '点赞中..' })
      const res = await articlesStar({ article: +this.$route.params.id })
      this.detailsList.star = res.data.num
      // 修改vuex里的点赞数组
      this.SETONEUSERINFO({ name: 'starArticles', value: res.data.list })
      if (this.praise) {
        this.$toast.success('点赞成功')
      } else {
        this.$toast.success('取消点赞')
      }
    },
    // 提交功能
    async submit () {
      await this.$login()

      const data = {
        content: this.value
      }
      // 判断是写评论还是回复评论
      if (this.isItem) {
        data.parent = this.isItem.id
        const res = await setComments(data)
        this.isItem.children_comments.push(res.data)
      } else {
        data.article = this.$route.params.id
        const setCom = await setComments(data)
        setCom.data.author.avatar =
          process.env.VUE_APP_URL + setCom.data.author.avatar
        this.commentList.unshift(setCom.data)
      }

      // 提示用户
      this.$toast.success('发布成功')
      // 关闭弹窗
      this.show = false
      // 清空输入框
      this.value = ''
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    popUp (data) {
      this.isItem = data
      // 判断是否有数据
      if (data) {
        this.placeText = '回复:' + data.author.nickname
      } else {
        this.placeText = '我来补充两句'
      }
      this.show = true
    },
    async onLoad () {
      // 面经评论
      const res = await comments({
        id: this.$route.params.id,
        start: this.start,
        limit: this.limit
      })
      res.data.list.forEach(v => {
        if (v.author.avatar) {
          v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
        }
      })
      this.total = res.data.total
      this.commentList.push(...res.data.list)

      this.start += this.limit
      this.loading = false
      if (this.commentList.length >= res.data.total) {
        this.finished = true
      }
    }
  },
  async mounted () {
    const url = await QRCode.toDataURL(window.location.href)
    this.src = url
  },
  async created () {
    // 面经详情
    const res = await sharedetails(this.$route.params.id)
    if (res.data.author.avatar) {
      res.data.author.avatar = process.env.VUE_APP_URL + res.data.author.avatar
    }
    this.detailsList = res.data
  }
}
</script>

<style lang="less">
.experience-detail-container {
  background-color: @white-color;
  .van-nav-bar__left {
    padding-left: 0;
  }
  .iconbtn_nav_back {
    font-size: 44px;
  }
  .top-box {
    background-color: @white-color;
    padding: 15px;
    .title {
      font-size: 18px;
      font-weight: 500;
    }
  }
  .info-box {
    margin-top: 15px;
    display: flex;
    align-items: center;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 9px;
    }
    .name-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .name {
        font-size: 12px;
        font-weight: 600;
        color: @subdominant-font-color;
      }
      .time {
        font-size: 12px;
        color: @minor-font-color;
      }
    }
    .zan-box {
      span {
        color: @minor-font-color;
        font-size: 12px;
      }
      .iconfont {
        color: @minor-font-color;
        font-size: 24px;
      }
      .comment {
        color: green !important;
      }
    }
  }
  .experience-content {
    padding: 15px;
    font-size: 16px;
    color: @main-font-color;
    background-color: @white-color;
    img {
      width: 100%;
      display: block;
    }
  }
  .comment-box {
    margin-top: 10px;
    background-color: @white-color;
    padding: 26px 15px;
    .title {
      font-size: 18px;
      font-weight: 500;
      position: relative;
      span {
        color: @minor-font-color;
        font-size: 12px;
        position: absolute;
        left: 40px;
        top: -5px;
      }
    }
    .content-box {
      padding-left: 44px;
      .content {
        margin-top: 11px;
        font-size: 16px;
        color: @main-font-color;
        line-height: 27px;
      }
      .reply-box {
        margin-top: 5px;
        padding-top: 5px;
        padding-left: 15px;
        padding-bottom: 12px;
        background: @border-color;
        .reply {
          font-size: 14px;
          color: @subdominant-font-color;
          word-break: break-all;
          &:not(:first-child) {
            margin-top: 15px;
          }
          .name {
            font-weight: 500;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .bottom-box {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 85px;
    display: flex;
    box-sizing: border-box;
    padding: 10px 15px 0;
    background-color: @white-color;
    width: 100%;
    justify-content: space-between;
    .input {
      height: 34px;
      background: @border-color;
      border-radius: 4px;
      flex: 1;
      font-size: 14px;
      margin-top: 10px;
      color: @subdominant-font-color;
      margin-right: 24px;
      line-height: 34px;
      padding-left: 6px;
    }
    div:not(.input) {
      font-size: 12px;
      color: @subdominant-font-color;
      i {
        display: block;
        font-size: 28px;
      }
    }
    .shoucang {
      margin-right: 24px;
      .collect {
        color: yellow;
      }
    }
    .star {
      margin-right: 24px;
      .active {
        color: red;
      }
    }
  }
  .input-pop {
    padding: 25px 15px 0;
    overflow: hidden;
    // 弹出层
    .van-cell::after {
      border-bottom: none;
    }
    .van-field {
      height: 99px;
      width: 100%;
      background: @border-color;
      border-radius: 4px;
    }
    span {
      font-size: 16px;
      color: @subdominant-font-color;
      float: right;
      margin-top: 11px;
    }
  }
  .imgger {
    width: 311px;
    height: 553px;
  }
  // 底部弹出层
  .share-box {
    width: 311px;
    height: 553px;
    background-size: 100% 100%;
    background-position-x: 0;
    background-position-y: 0;
    padding: 0 15px 15px;
    background-image: url('../../assets/img_share_bj.png');
    display: flex;
    flex-direction: column;
    .text {
      text-align: center;
      font-size: 12px;
      color: @white-color;
      padding: 15px;
    }
    .share-content-box {
      flex: 1;
      background-color: @white-color;
      border-radius: 10px;
      padding: 0 15px;
      .title {
        font-size: 16px;
        margin-top: 20px;
      }
      .user-box {
        margin-top: 15px;
        display: flex;
        align-items: center;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin-right: 5px;
        }
        span {
          font-size: 12px;
        }
      }
      .content {
        font-size: 16px;
        margin-top: 20px;
        height: 165px;
        overflow: hidden;
        position: relative;
        &::after {
          content: '';
          width: 100%;
          bottom: 0;
          left: 0;
          height: 25px;
          background-color: @white-color;
          opacity: 0.9;
          position: absolute;
        }
      }
      .logo {
        width: 150px;
        display: block;
        margin: 20px auto;
      }
      .code {
        margin: 0 auto;
        display: block;
        width: 80px;
      }
      .direction {
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
        color: @minor-font-color;
      }
    }
  }
}
</style>
