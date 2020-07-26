<template>
  <div class="login">
    <div class="top">组件</div>
    <h1 class="title">您好,请登录</h1>
    <div class="form">
      <van-form>
        <van-field v-model="username" name="用户名" placeholder="请输入手机号">
          <template #left-icon> <i class="iconfont iconbianzu1"></i></template
        ></van-field>
        <van-field
          v-model="password"
          type="password"
          name="密码"
          placeholder="请输入验证码"
        >
          <template #left-icon>
            <i class="iconfont iconyanzhengma"></i
          ></template>
          <template #button>
            <van-button color="#00B8D4" size="small" plain
              >获取验证码</van-button
            >
          </template>
        </van-field>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '', // 用户名
      password: '' // 密码
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
  }
}
</style>
