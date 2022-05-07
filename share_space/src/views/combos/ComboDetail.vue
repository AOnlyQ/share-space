<template>
  <div>
    <AppNavBar title="套餐详情" />
    <div class="combo-container">
      <div class="title border-bottom-dashed-two">
        <div class="column-center-relative">
          <div class="title-top">
            <div class="left">{{ comboInfo.name }}</div>
            <div class="right">
              <span style="color: #fd8925">{{
                comboInfo.price | RMBformat
              }}</span>
              元
            </div>
          </div>
          <div class="title-bottom">
            {{ comboInfo.origin_price | RMBformat }}元
          </div>
        </div>
      </div>

      <div class="text-center combo-des-nav">套餐说明</div>
      <div class="combo-des-container border-bottom-dashed-one">
        <div class="combo-des-item">
          <div class="left">
            <van-icon
              name="refund-o"
              size="30"
              color="#fff"
              class="column-center-relative"
            />
          </div>
          <div class="right">
            <div>计费方式</div>
            <div>{{ comboInfo.chargeMethod }}</div>
          </div>
        </div>
        <div class="combo-des-item">
          <div class="left">
            <van-icon
              name="balance-list-o"
              size="30"
              color="#fff"
              class="column-center-relative"
            />
          </div>
          <div class="right">
            <div>可消费数量</div>
            <div>{{ comboInfo.consumableNum }}</div>
          </div>
        </div>
        <div class="combo-des-item">
          <div class="left">
            <van-icon
              name="notes-o"
              size="30"
              color="#fff"
              class="column-center-relative"
            />
          </div>
          <div class="right">
            <div>有效期</div>
            <div>{{ comboInfo.validPeriod }}</div>
          </div>
        </div>
        <div class="combo-des-item">
          <div class="left">
            <van-icon
              name="underway-o"
              size="30"
              color="#fff"
              class="column-center-relative"
            />
          </div>
          <div class="right">
            <div>使用时间</div>
            <div>07:00至23:59</div>
          </div>
        </div>
      </div>
      <div class="text-center combo-des-nav">使用限制</div>
      <div class="limit-desc">
        不可用日期
        <ul style="list-style-type: square; margin: 0.08rem 0.1rem">
          <li>无</li>
        </ul>
      </div>
      <div class="limit-desc">
        可用场馆和区域
        <ul style="list-style-type: square; margin: 0.08rem 0.1rem">
          <li>逸间自习室所有自习室间</li>
        </ul>
      </div>
      <div class="text-center combo-des-nav">更多详情</div>
      <div style="font-size: 0.15rem; margin: 0.15rem 0; line-height: 0.18rem">
        {{ comboInfo.details }}
      </div>

      <div class="purchase-container">
        <!-- 一次可买多份功能暂未实现 -->
        <!-- <van-stepper v-model="purchaseNum" /> -->
        <van-button
          icon="shopping-cart"
          color="#FD8925"
          size="small"
          round
          @click="payPopupShow = true"
        >
          下单购买
        </van-button>
      </div>
    </div>
    <!-- 购买支付弹出框 -->
    <van-popup
      v-model="payPopupShow"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div>逸间自习室</div>
      <div class="price">
        {{ (purchaseNum * comboInfo.price) | RMBformat }}.00
      </div>
      <van-button type="primary" @click="handlePay">确认支付</van-button>
    </van-popup>
  </div>
</template>
<style lang="stylus" scoped>
.van-nav-bar {
  background: $bgColor;

  /* /deep/ 就是把data-v-hash值选择器写到类名的前面 */
  /deep/ .van-nav-bar__title, /deep/ .van-icon {
    color: #fff;
  }
}

.combo-container {
  margin: 0.15rem;
  padding: 0 0.15rem;
  background: #fff;
  height: 7.5rem;
  border-radius: 0.05rem;

  .title {
    height: 1.2rem;

    // border-bottom: 1.5px dashed $bgColor;
    .title-top {
      display: flex;
      justify-content: space-between;

      .left, .right span {
        font-size: 0.25rem;
      }
    }

    .title-bottom {
      color: #B2B2B2;
      text-decoration: line-through;
      float: right;
      margin-top: 0.1rem;
    }
  }

  .combo-des-nav {
    font-size: 0.16rem;
    background-color: #f4d04b;
    height: 0.26rem;
    line-height: 0.26rem;
    border-radius: 0.1rem 0.1rem 0 0;
    margin: 10px 0;
  }

  .combo-des-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .combo-des-item {
      border: 0.03rem solid #f4d04b;
      height: 0.8rem;
      width: 47%;
      margin-bottom: 0.1rem;
      display: flex;

      .left {
        flex: 0.3;
        background-color: #4D4D4D;
      }

      .right {
        flex: 0.7;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;

        div:nth-child(odd) {
          font-size: 0.12rem;
          color: #B2B2B2;
          margin-bottom: 0.04rem;
        }
      }
    }
  }

  .limit-desc {
    border: 0.03rem solid #f4d04b;
    padding: 0.08rem 0.1rem;
    margin-bottom: 0.1rem;
  }

  .purchase-container {
    position: fixed;
    bottom: 0.2rem;
    right: 0.4rem;
    display: flex;

    .van-stepper {
      margin-right: 0.1rem;
    }
  }
}

// 购买支付弹出框
.van-popup {
  box-sizing: border-box;
  border-radius: 0.1rem 0.1rem 0 0;
  padding: 0.3rem 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .price {
    font-size: 0.35rem;
    font-weight: 500;
  }
}
</style>
<script>
import { GetComboInfo, AddOrder } from "@/request/api";
import AppNavBar from "@/components/AppNavBar.vue";
export default {
  components: { AppNavBar },
  data() {
    return {
      comboInfo: {},
      // 购买数量
      purchaseNum: 1,
      // 支付弹出框
      payPopupShow: false,
    };
  },
  created() {
    GetComboInfo({ id: this.$route.query.id }).then((res) => {
      // console.log(res);
      if (res.status === 200) this.comboInfo = res.data;
    });
  },
  methods: {
    // 支付
    handlePay() {
      // 确认支付后，新增一条订单，新增成功后，提示支付成功，然后关闭弹出框
      AddOrder({
        userId: this.$store.state.userInfo._id,
        combosInfo: this.comboInfo,
      }).then((res) => {
        console.log(res);
        if ((res.status === 200) | 204) {
          this.$toast.success("支付成功");
          setTimeout(() => {
            this.payPopupShow = false;
          }, 1000);
        }
      });
    },
  },
};
</script>
