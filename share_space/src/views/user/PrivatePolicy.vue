<template>
  <!-- 用户注册协议页面 -->
  <div>
    <van-sticky>
      <van-nav-bar title="隐私政策" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="help-main">
      <h3>隐私政策</h3>
      <p>
        欢迎您使用逸间!我们非常重视用户的隐私和
        个人信息保护。您在使用我们的产品与/或服务时,我们可能会收集和使用您的相关信息。我们希望通过《隐私政策》(“本隐私政策”)向您说明。
      </p>
      <p>
        在您使用我们的产品与/或服务时我们如何收集、使用、保存、共享和转移这些信息，以及我们为您提供的访问、更新、删除和保护这些信息的方式。
      </p>
      <p>
        1、为给您提供更好的服务以及随着业务的发展，本隐私政策也会随之更新。但未经您明确同意，我们不会削减您依据本隐私政策所应享有的权利。
      </p>
      <p>2、我们还会将本隐私政策的旧版本存档，供您查阅。</p>
      <p>
        3、为了您能及时接收到通知，建议您在联系方式更新时及时通知我们。如您在本政策更新生效后继续使用我们的服务，即代表您已充分阅读、理解并接受更新后的政策并愿意受更新后的政策约束。我们鼓励您在每次使用我们服务时都查阅本政策。您可以通过“我的-隐私政策”中查看本政策。
      </p>
    </div>
  </div>
</template>
<style lang="stylus" scoped></style>
<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="stylus" scoped>
.van-nav-bar {
  background: $bgColor;
  /deep/ .van-nav-bar__title, /deep/ .van-icon {
    color: #fff;
  }
}

.help-main {
  font-size: 12px;
  color: #454545;
  padding: 14px 14px 0;
  line-height: 18px;
  font-weight: bold;

  h3 {
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  p {
    margin: .05rem 0;

  }
}
</style>
