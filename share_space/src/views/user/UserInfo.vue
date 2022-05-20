<template>
  <div style="height: 8.12rem; background: #fff">
    <AppNavBar title="我的资料" />
    <div>
      <van-cell center title="头像">
        <template #right-icon>
          <img :src="avatarSrc" alt="" class="avatar-img" />
        </template>
      </van-cell>
      <!-- namePopupVisible = true -->
      <van-cell
        title="用户名"
        :value="userInfo.username"
        is-link
        @click="$router.push({ path: '/input_edit_page' })"
      />
      <van-cell
        title="性别"
        :value="userInfo.gender === 'male' ? '男' : '女'"
        is-link
        @click="genderPopupVisible = true"
      />
      <van-cell
        title="生日"
        :value="userInfo.birthday"
        is-link
        @click="birthdayClick"
      />
      <van-cell
        title="地区"
        :value="userInfo.location.name"
        is-link
        @click="areaPopupVisible = true"
      />

      <van-cell title="备考方向" :value="userInfo.hobbies.join(' ')" is-link />
      <van-cell title="个性签名" :value="userInfo.personal_signature" is-link />
      <!-- <van-cell title="个人简介" is-link arrow-direction="down" /> -->
      <div class="submit-btn" @click="save">保存</div>
    </div>
    <!-- 性别选择 -->
    <van-popup
      v-model="genderPopupVisible"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-picker
        title="选择性别"
        show-toolbar
        ref="genderRef"
        :default-index="userInfo.gender === 'male' ? 0 : 1"
        :columns="genderList"
        @confirm="genderConfirm"
        @cancel="genderCancel"
      />
    </van-popup>
    <!-- 生日选择 -->
    <van-popup
      v-model="birPopupVisible"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-datetime-picker
        v-model="birthdayDate"
        :min-date="birthdayMinDate"
        :max-date="birthdayMaxDate"
        @confirm="birthdayConfirm"
        @cancel="birthdayCancel"
        type="date"
        title="选择年月日"
      />
    </van-popup>
    <!-- 地区选择 -->
    <van-popup
      v-model="areaPopupVisible"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-area
        v-if="areaPopupVisible"
        :area-list="areaList"
        :value="areaCode"
        @confirm="confirmArea"
        @cancel="cancelArea"
      />
    </van-popup>
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
      areaPopupVisible: false,
      avatarSrc: require("@/assets/avatar.jpg"),
      userInfo: {
        username: "test",
        avatar_url: " ",
        gender: "",
        birthday: "",
        location: "未设置",
        hobbies: ["未设置"],
        personal_signature: "未设置",
      },
      areaCode: "",
      namePopupVisible: true,
      genderList: ["男", "女"],
      genderPopupVisible: false,
      birPopupVisible: false,
      birthdayMinDate: new Date(1950, 1, 1),
      birthdayMaxDate: new Date(),
      birthdayDate: new Date(),
    };
  },
  created() {
    // console.log("userInfo", this.$store.state.userInfo);
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
      this.areaPopupVisible = false;
    },
    cancelArea() {
      this.areaCode = this.userInfo.location.code;
      this.areaPopupVisible = false;
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
    genderConfirm(value) {
      // console.log(value);
      this.userInfo.gender = value === "男" ? "male" : "female";
      this.genderPopupVisible = false;
    },
    genderCancel() {
      this.genderPopupVisible = false;
    },
    birthdayClick() {
      this.birthdayDate = new Date(this.userInfo.birthday);
      this.birPopupVisible = true;
    },
    birthdayConfirm() {
      // console.log(this.birthdayDate);
      this.userInfo.birthday = this.birthdayDate.MyFormat("yyyy-MM-dd");
      console.log("this.userInfo.birthday ", this.userInfo.birthday);
      this.birPopupVisible = false;
    },
    birthdayCancel() {
      this.birPopupVisible = false;
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

.name-popup {
  padding: 0 0.2rem;

  .van-cell.van-field {
    background: #F3F3F3;
    border-radius: 0.3rem;
    width: 80%;
    margin: 0.2rem 0;
  }
}
</style>
