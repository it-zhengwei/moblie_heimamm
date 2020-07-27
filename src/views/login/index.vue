<template>
  <div class="login">
    <div class="top">
      <navBar @onClickLeft="onClickLeft"> </navBar>
    </div>
    <h1 class="title">您好,请登录</h1>
    <div class="form">
      <van-form @submit="submit" ref="form">
        <van-field
          v-model="phone"
          name="phone"
          type="tel"
          placeholder="请输入手机号"
          :rules="[
            {
              pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
              required: true,
              message: '请填写手机号'
            }
          ]"
        >
          <template #left-icon> <i class="iconfont iconbianzu1"></i></template
        ></van-field>
        <van-field
          v-model="code"
          type="digit"
          name="code"
          placeholder="请输入验证码"
          :rules="[
            {
              required: true,
              message: '请填写验证码'
            }
          ]"
        >
          <template #left-icon>
            <i class="iconfont iconyanzhengma"></i
          ></template>
          <template #button>
            <span class="code" @click="getCode">{{ btnText }}</span>
          </template>
        </van-field>
        <p class="xieyi">
          登录即同意<span>《用户使用协议》</span>和<span>《隐私协议》</span>
        </p>
        <van-button class="btn" native-type="submit">确定</van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
// 导入设置token方法
import { setToken } from '@/utils/local.js'
// 导入接口
import { getCode, login } from '@/api/login.js'
export default {
  name: 'login',
  data () {
    return {
      phone: '', // 用户名
      code: '', // 密码
      btnText: '获取验证码', // 按钮文本
      delay: 0 // 时间
    }
  },
  methods: {
    // 全部验证成功执行的函数
    submit () {
      // 登录请求
      login({ mobile: this.phone, code: this.code }).then(res => {
        // window.console.log(res)
        setToken(res.data.jwt)
        // 给响应的数据的图片地址拼接基地址
        res.data.user.avatar = process.env.VUE_APP_URL + res.data.user.avatar
        // 把响应的用户信息保存到vuex
        this.$store.commit('setUserInfo', res.data.user)
        this.$router.push('/my')
        // 提示用户
        this.$toast.success('登录成功')
      })
    },
    // 获取验证码
    getCode () {
      // 判断是否在倒计时
      if (this.delay !== 0) {
        return
      }
      // 验证手机号是否正确
      this.$refs.form
        .validate('phone')
        .then(() => {
          // 加载提示
          this.$toast.loading({
            message: '获取验证码中...',
            ducation: 0
          })
          // 设置倒计时
          this.delay = 60
          // 设置按钮文本
          this.btnText = `${this.delay}S后重新获取`
          const timeID = setInterval(() => {
            this.delay--
            this.btnText = `${this.delay}S后重新获取`

            if (this.delay === 0) {
              this.btnText = '获取验证码'
              // 清空定时器
              clearInterval(timeID)
            }
          }, 1000)
          getCode({ mobile: this.phone })
            .then(res => {
              // 获取成功提示用户
              this.$toast.success(res.data)
            })
            .catch(err => {
              window.console.log(err)
            })
        })
        .catch(err => {
          window.console.log(err)
        })
    },
    // 导航栏左边的箭头功能
    onClickLeft () {
      window.console.log('哈哈')
    }
  }
}
</script>

<style lang="less">
.login {
  background-color: #fff;
  padding: 15px;
  .top {
    height: 44px;
  }
  .title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    margin: 50px 0 61px 0;
    color: #222222;
  }
  .form {
    .code {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;

      color: #00b8d4;
    }
    .iconfont {
      font-size: 16px;
      margin-right: 21px;
    }
    .btn {
      width: 100%;
      height: 44px;
      border-radius: 22px;
      background-color: @main-color;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;

      color: #ffffff;
    }
    .xieyi {
      margin-top: 28px;
      margin-bottom: 44px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #181a39;
      span {
        color: #00b8d4;
      }
    }
  }
}
</style>
