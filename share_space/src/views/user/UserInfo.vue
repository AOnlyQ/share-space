<template>
  <div style="height: 8.12rem; background: #fff">
    <AppNavBar title="我的资料" />
    <div>
      <van-cell center title="头像">
        <template #right-icon>
          <img :src="avatarSrc" alt="" class="avatar-img" />
        </template>
      </van-cell>
      <van-cell title="用户名" :value="userInfo.username" is-link />
      <van-cell
        title="性别"
        :value="userInfo.gender === 'male' ? '男' : '女'"
        is-link
      />
      <van-cell title="年龄" :value="userInfo.age" is-link />

      <van-cell
        title="地区"
        :value="userInfo.location.name"
        is-link
        @click="vanAreaVisible = true"
      />

      <van-cell title="兴趣" :value="userInfo.hobbies.join(' ')" is-link />
      <van-cell title="个性签名" :value="userInfo.personal_signature" is-link />
      <!-- <van-cell title="个人简介" is-link arrow-direction="down" /> -->
      <div class="submit-btn" @click="save">保存</div>
    </div>
    <van-area
      :area-list="areaList"
      :value="areaCode"
      v-if="vanAreaVisible"
      @confirm="confirmArea"
      @cancel="cancelArea"
    />
  </div>
</template>
<script>
import AppNavBar from "@/components/AppNavBar";
import { GetUserInfo, EditUserInfo } from "@/request/api.js";
import { areaList } from "@vant/area-data";
export default {
  components: { AppNavBar },
  data() {
    return {
      areaList,
      vanAreaVisible: false,
      avatarSrc: require("@/assets/avatar.jpg"),
      userInfo: {
        username: "test",
        avatar_url: " ",
        gender: "未知",
        age: 22,
        location: "未设置",
        hobbies: ["未设置"],
        personal_signature: "未设置",
      },
      areaCode: "",
    };
  },
  created() {
    console.log("userInfo", this.$store.state.userInfo);
    GetUserInfo({ id: this.$store.state.userInfo._id }).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        this.userInfo = res.data;
        this.areaCode = this.userInfo.location.code;
      }
    });
  },
  methods: {
    confirmArea(values) {
      // console.log(val);
      this.userInfo.location.code = values[2].code;
      this.userInfo.location.name = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.areaCode = values[2].code;
      this.vanAreaVisible = false;
    },
    cancelArea() {
      this.areaCode = this.userInfo.location.code;
      this.vanAreaVisible = false;
    },
    save() {
      // console.log("this.userInfo", this.userInfo);

      EditUserInfo(this.userInfo).then((res) => {
        // console.log(res)
        if (res.status === 200) {
          this.$toast.success("修改成功");
          // 用户信息修改了，将sessionStorage中的也进行修改
          window.sessionStorage.setItem(
            "userInfo",
            JSON.stringify(this.userInfo)
          );
          this.$store.commit("setUserInfo", this.userInfo);
        }
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.avatar-img {
  width: 0.6rem;
  border-radius: 50%;
  display: block;
}

.submit-btn {
  position: fixed;
  bottom: 0;
  height: 0.46rem;
  line-height: 0.46rem;
  text-align: center;
  background: #fff;
  width: 100%;
  color: $bgColor;
  font-size: 0.17rem;
  border-top: 1px solid #F4F4F4;
}

.van-area {
  background: #ffe;
  bottom: 0;
  position: absolute;
  /* box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 20%); */
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
