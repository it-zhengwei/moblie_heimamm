<template>
  <div class="setNickname">
    <div class="navBar">
      <navBar
        :title="title"
        :right="isEdit ? '' : '保存'"
        @onClickLeft="onClickLeft"
        @onClickRight="onClickRight"
      ></navBar>
    </div>

    <van-cell-group v-if="key !== 'avatar'">
      <van-field
        class="inp"
        v-model="value"
        size="large"
        :center="true"
      ></van-field>
    </van-cell-group>
    <div class="uploader" v-else>
      <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1" />
    </div>
  </div>
</template>

<script>
// 导入api
import { editUserInfo, upload } from '@/api/userInfo.js'
// 导入map辅助函数
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 标题
      title: '',
      value: '',
      // 字段
      key: '',
      // 上传的图片，预览的图片
      fileList: [{ url: '', status: '', message: '' }],
      // id
      avatarId: '',
      // 声明一个对象保存响应的字段对应的标题  然后判断相应字段对应的标题渲染到导航栏
      obj: {
        avatar: '修改头像',
        nickname: '修改昵称',
        intro: '修改个人简介',
        position: '修改职位名'
      }
    }
  },
  created () {
    // 接收路由传的字段
    this.key = this.$route.query.key

    this.title = this.obj[this.key]

    if (this.key === 'avatar') {
      this.fileList[0].url = this.userInfo[this.key]
    }
    // 使用mapState辅助函数来获取相应字段对应的内容 渲染到页面上
    this.value = this.userInfo[this.key]
  },
  // 计算属性
  computed: {
    ...mapState(['userInfo']),
    isEdit () {
      return this.value === this.userInfo[this.key]
    }
  },
  methods: {
    ...mapMutations(['SETONEUSERINFO']),
    // 顶部返回按钮触发的事件
    onClickLeft () {
      // 返回上一页
      this.$router.go(-1)
    },
    // 点击保存触发的事件
    onClickRight () {
      // 判断是否修改了数据
      if (this.value === this.userInfo[this.key]) {
        return
      }
      // 声明一个空对象  用来动态的添加相应的字段和修改的内容
      const nullObj = {}

      nullObj[this.key] = this.value

      // 提示加载
      this.$toast.loading({
        message: '修改中...',
        ducation: 0
      })
      // 发送修改请求
      editUserInfo(nullObj).then(res => {
        if (this.key === 'avatar') {
          res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
          this.SETONEUSERINFO({ name: this.key, value: res.data.avatar })
        } else {
          // 更新vuex
          this.SETONEUSERINFO({ name: this.key, value: this.value })
        }

        // 跳转到上一页
        this.$router.go(-1)
        // 提示用户
        this.$toast.success('修改成功')
      })
    },
    // 文件上传功能
    afterRead (file) {
      this.fileList[0].status = 'uploading'
      this.fileList[0].message = '上传中...'
      // 创建formData对象
      const data = new FormData()
      // 添加参数
      data.append('files', file.file)
      // 发送请求
      upload(data).then(res => {
        this.fileList[0].status = 'done'

        this.value = res.data[0].id
      })
    }
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
  .uploader {
    text-align: center;
  }
}
</style>
