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
      <cell title="头像" @click="setNickname('avatar')">
        <template #default>
          <img :src="userInfo.avatar" alt="" />
        </template>
      </cell>
    </div>
    <div class="middle">
      <cell title="昵称" @click="setNickname('nickname')">
        <template #default>
          <span>{{ userInfo.nickname }}</span>
        </template>
      </cell>
      <cell title="性别" @click="showGender = true">
        <template #default>
          <span>{{ GETGENDER }}</span>
        </template>
      </cell>
      <cell title="地区" @click="showCity = true">
        <template #default>
          <span>{{ getCity }}</span>
        </template>
      </cell>
      <cell title="个人简介" class="last" @click="setNickname('intro')">
        <template #default>
          <span class="individual">{{ userInfo.intro }}</span>
        </template>
      </cell>
    </div>
    <van-button
      class="btn"
      text="退出登录"
      size="large"
      @click="logout"
    ></van-button>

    <!-- 性别弹出框 -->
    <van-popup v-model="showGender" position="bottom" @closed="onCancel">
      <van-picker
        title="修改性别"
        show-toolbar
        :columns="genderColumns"
        @confirm="onConfirm"
        @cancel="onCancel"
        :default-index="userInfo.gender"
        ref="genderPicker"
      />
    </van-popup>

    <!-- 省市区弹出框 -->
    <van-popup v-model="showCity" position="bottom" @closed="cityCancel">
      <van-area
        :value="userInfo.area"
        ref="area"
        title="修改省市"
        :area-list="cityList"
        :columns-num="2"
        :columns-placeholder="['请选择', '请选择']"
        @confirm="cityConfirm"
        @cancel="cityCancel"
      />
    </van-popup>
  </div>
</template>

<script>
// 导入api
import { editUserInfo } from '@/api/userInfo.js'
// 导入removeToken
import { removeToken } from '@/utils/local.js'
// 导入map辅助函数
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 控制性别弹出框是否显示
      showGender: false,
      // 控制城市弹出框是否显示
      showCity: false,
      // 性别数组
      genderColumns: ['未知', '男', '女']
    }
  },
  // 计算属性
  computed: {
    // 展开state的userInfo内容
    ...mapState(['userInfo', 'cityList']),
    // 展开getters里的性别  city
    ...mapGetters(['GETGENDER', 'getCity'])
  },
  methods: {
    ...mapMutations(['SETUSERINFO', 'SETLOGINSTATUS', 'SETONEUSERINFO']),
    // 跳转到setNickname修改页面
    setNickname (key) {
      this.$router.push('/setNickname?key=' + key)
    },
    // 城市确认功能
    cityConfirm (data) {
      this.$toast.loading({
        message: '修改中...',
        ducation: 0
      })
      editUserInfo({ area: data[1].code }).then(() => {
        // 提示用户
        this.$toast.success('修改成功')
        // 关闭弹框
        this.showCity = false
        // 更新vuex数据
        this.SETONEUSERINFO({ name: 'area', value: data[1].code })
      })
    },
    // 城市取消功能
    cityCancel () {
      // 关闭弹出框
      this.showCity = false
      // 重置
      this.$refs.area.reset(this.userInfo.area)
    },
    // 性别确认功能
    onConfirm (value, index) {
      // 加载提示
      this.$toast.loading({
        message: '修改中...',
        ducation: 0
      })
      // 更新远程仓库的数据
      editUserInfo({ gender: index }).then(() => {
        // 更新vuex的gender数据
        this.SETONEUSERINFO({ name: 'gender', value: index })
        // 提示用户
        this.$toast.success('修改成功')
        // 关闭弹框
        this.showGender = false
      })
    },
    // 性别取消功能
    onCancel () {
      // 重置
      this.$refs.genderPicker.setColumnIndex(0, this.userInfo.gender)
      // 关闭弹框
      this.showGender = false
    },
    // 顶部返回按钮触发的事件
    onClickLeft () {
      // 返回我的页面
      this.$router.push('/my')
    },
    // 退出登录
    logout () {
      // 提示用户
      this.$dialog
        .confirm({
          title: '提示',
          message: '你确定退出吗!!'
        })
        .then(() => {
          // 删除token
          removeToken()
          // 清空用户信息
          this.SETUSERINFO('')
          // 改变登录状态
          this.SETLOGINSTATUS(false)
          this.$toast.success('退出成功')
          // 跳转到发现页
          this.$router.push('/find')
        })
        .catch(() => {})
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
