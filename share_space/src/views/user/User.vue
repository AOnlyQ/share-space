<template>
  <div>
    <van-sticky>
      <van-nav-bar title="个人中心" />
    </van-sticky>
    <van-row class="row-one">
      <van-col span="6">
        <img :src="avatarSrc" alt="" />
      </van-col>
      <van-col span="11" class="username">{{ userInfo.username }}</van-col>
      <van-col span="7">
        <!-- @click="editInfoFormVisible = true" -->
        <van-icon name="edit" @click="$router.push('/user_info')" />
      </van-col>
    </van-row>
    <van-row class="row-two">
      <van-col span="21"> 亲爱的会员 </van-col>
      <van-col span="3">
        <van-icon name="revoke" @click="logout" />
        <div style="margin-top: 0.04rem; font-size: 0.12rem">退出</div>
      </van-col>
    </van-row>
    <van-grid :column-num="3" square style="margin: 0.1rem 0">
      <van-grid-item @click="$router.push('/my_combos')">
        <img
          src="@/assets/icon-img/time.png"
          alt=""
          style="height: 50%; margin-bottom: 0.06rem"
        />
        剩余套餐
      </van-grid-item>
      <!-- <van-grid-item>
        <img
          src="@/assets/icon-img/coupons.png"
          alt=""
          style="height: 50%; margin-bottom: 0.06rem"
        />
        团购验券
      </van-grid-item> -->
      <van-grid-item icon="photo-o" @click="$router.push('/my_record')">
        <img
          src="@/assets/icon-img/records.png"
          alt=""
          style="height: 50%; margin-bottom: 0.06rem"
        />
        学习记录
      </van-grid-item>
      <van-grid-item>
        <img
          src="@/assets/icon-img/ranking.png"
          alt=""
          style="height: 50%; margin-bottom: 0.06rem"
        />
        学时排行
      </van-grid-item>
    </van-grid>
    <div>
      <van-cell
        title="我的预约"
        icon="todo-list-o"
        is-link
        @click="$router.push('/my_reserve')"
      />
      <van-cell
        title="我的订单"
        icon="notes-o"
        is-link
        style="margin-bottom: 0.1rem"
        @click="$router.push('/my_order')"
      />
      <van-cell
        title="学习公约"
        icon="completed"
        is-link
        @click="$router.push('/learning_rules')"
      />
      <van-cell
        title="联系客服"
        icon="friends-o"
        is-link
        @click="$router.push('/contact_us')"
      />
      <van-cell
        title="系统设置"
        icon="setting-o"
        is-link
        @click="$router.push('/system_setting')"
      />
    </div>
  </div>
</template>

<script>
import { GetUserInfo } from "@/request/api";
export default {
  data() {
    return {
      avatarSrc: require("@/assets/avatar.jpg"),
      userInfo: {},

      // 修改个人信息弹出框是否显示
      editInfoFormVisible: false,
      passwordType: "password",
      editUserForm: {},
    };
  },
  created() {
    // this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    // this.editUserForm = this.userInfo;
    this.getUserInfo();
  },
  methods: {
    // 退出登录
    logout() {
      window.localStorage.clear();
      this.$router.push("/login");
    },
    getUserInfo() {
      // console.log("this.$store.state.userInfo", this.$store.state.userInfo);

      GetUserInfo({ id: this.$store.state.userInfo._id }).then((res) => {
        console.log(res);
        this.userInfo = res.data;
        // 深拷贝
        this.editUserForm = JSON.parse(JSON.stringify(this.userInfo));
      });
    },
    switchPasswordType() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
  },
};
</script>
<style lang="stylus" scoped>
.van-row {
  padding: 0.2rem 6%;
  background: #fff;
  color: #000;

  .van-col {
    img {
      width: 0.7rem;
      border-radius: 50%;
      display: block;
    }

    .van-icon {
      font-size: 0.2rem;
    }
  }

  .username {
    font-size: 0.22rem;
  }
}

.row-one {
  line-height: 0.7rem;
}

// 个人信息修改弹出层
.van-popup {
  width: 80%;
  padding: 0.3rem 0.1rem 0;
  border-radius: 0.1rem;

  .title {
    text-align: center;
    line-height: 0.2rem;
    font-size: 0.2rem;
    margin-bottom: 0.2rem;
  }

  .van-button {
    margin: 0 0.2rem;
  }
}
</style>
