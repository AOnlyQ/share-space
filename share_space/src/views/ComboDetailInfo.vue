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
    </div>
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
}
</style>
<script>
import AppNavBar from "@/components/AppNavBar.vue";
import { GetComboInfo } from "@/request/api";
export default {
  components: { AppNavBar },
  data() {
    return {
      comboInfo: {},
    };
  },
  created() {
    GetComboInfo({ id: this.$route.query.id }).then((res) => {
      // console.log(res);
      if (res.status === 200) this.comboInfo = res.data;
    });
  },
  methods: {},
};
</script>
