<template>
  <div>
    <van-nav-bar
      title="密码设置"
      right-text="确定"
      left-arrow
      @click-left="backClick"
      @click-right="confirmClick"
    />
    <div>
      <van-field
        v-model="password"
        type="password"
        label="原密码"
        name="pattern"
        required
        placeholder="请输入原密码"
      />
      <van-field
        v-model="newPassword"
        label="新密码"
        name="pattern"
        type="password"
        required
        placeholder="请输入新密码"
        :rules="[
          {
            pattern,
            message: '请填写6-15位字符串,需包含大小写字母数字特殊符号',
          },
        ]"
      />
      <van-field
        v-model="newConfirmPassword"
        label="确认密码"
        required
        name="pattern"
        type="password"
        placeholder="请输入新密码"
        :rules="[
          {
            validator,
            message: '请填写6-15位字符串,需包含大小写字母数字特殊符号',
          },
        ]"
      />
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.van-nav-bar {
  background: $bgColor;

  /deep/ .van-nav-bar__title, /deep/ .van-icon, /deep/ .van-nav-bar__text {
    color: #fff;
  }
}
</style>
<script>
import { EditUserInfo } from "@/request/api";
export default {
  data() {
    return {
      pattern:
        /^.*(?=.{6,15})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
      password: "",
      newPassword: "",
      newConfirmPassword: "",
    };
  },
  methods: {
    backClick() {
      this.$router.go(-1);
    },
    confirmClick() {
      if (!this.password || !this.newPassword || !this.newConfirmPassword) {
        this.$toast.fail("请填写密码");
      } else if (this.password !== this.$store.state.userInfo.password) {
        this.$toast.fail("原密码错误!");
      } else if (this.newPassword !== this.newConfirmPassword) {
        this.$toast.fail("两次输入的密码不一致!");
      } else {
        EditUserInfo({
          _id: this.$store.state.userInfo._id,
          password: this.newPassword,
        }).then((res) => {
          // console.log(res);
          if (res.status === 200) this.$toast.success("修改成功");

          setTimeout(() => {
            window.sessionStorage.setItem("userInfo", JSON.stringify(res.data));
            // 将store中的数据更新
            this.$store.commit("setUserInfo", res.data);
            // 清空表单
            this.password = "";
            this.newPassword = "";
            this.newConfirmPassword = "";
          }, 2000);
        });
      }
    },
    // 函数校验密码
    validator(val) {
      // 密码正则为6-15位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
      return /^.*(?=.{6,15})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(
        val
      );
    },
  },
};
</script>
