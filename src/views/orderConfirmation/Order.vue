<template>
  <div class="order">
    <div class="order__price">
      实付金额 <b>￥{{ calculations.price }}</b>
    </div>
    <div class="order__btn" @click="() => handleShowConfirmChange(true)">
      提交订单
    </div>
  </div>
  <div
    class="mask"
    v-show="showConfirm"
    @click="() => handleShowConfirmChange(false)"
  >
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台吗？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="() => handleConfirmOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="() => handleConfirmOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { post } from "../../utils/request";
import { useCommonCartEffect } from "../../effects/cartEffects";

// 和下单相关
const useMakeOrderEffect = (shopId, shopName, productList) => {
  const router = useRouter();
  const store = useStore();
  const handleConfirmOrder = async isCancled => {
    const products = [];
    for (const i in productList.value) {
      const product = productList.value[i];
      products.push({ id: parseInt(product._id, 10), num: product.count });
    }

    try {
      // 下面的post是手动对axios.post做了封装
      const result = await post("/api/order", {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCancled,
        products
      });
      // WHY post语法
      if (result?.errno === 0) {
        store.commit("clearCartData", shopId);
        router.push({ name: "OrderList" }); // 重新做页面的跳转，访问Home页面
      }
    } catch (e) {
      // showToast("请求失败");
      // 提示下单失败
    }
  };
  return { handleConfirmOrder };
};

// 蒙层展示相关
const useShowMaskEffect = () => {
  const showConfirm = ref(false);
  const handleShowConfirmChange = status => {
    showConfirm.value = status;
  };
  return { showConfirm, handleShowConfirmChange };
};

export default {
  name: "Order",
  setup() {
    const route = useRoute();

    const shopId = parseInt(route.params.id, 10);
    const { calculations, shopName, productList } = useCommonCartEffect(shopId);
    const { handleConfirmOrder } = useMakeOrderEffect(
      shopId,
      shopName,
      productList
    );
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect();

    return {
      calculations,
      handleConfirmOrder,
      showConfirm,
      handleShowConfirmChange
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  background: $bgColor;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: $content-fontColor;
  }
  &__btn {
    width: 0.98rem;
    background: #4fb0f9;
    color: $bgColor;
    text-align: center;
    font-size: 0.14rem;
  }
}
.mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: #fff;
    border-radius: 0.04rem;
    text-align: center;
    &__title {
      font-size: 0.18rem;
      color: #333;
      margin: 0.24rem 0 0 0;
      line-height: 0.26rem;
    }
    &__desc {
      margin: 0.08rem 0 0 0;
      font-size: 0.14rem;
      color: #666;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      &--first {
        margin-right: 0.12rem;
        border: 0.01rem solid #4fb0f9;
        color: #4fb0f9;
      }
      &--last {
        margin-left: 0.12rem;
        color: #fff;
        background: #4fb0f9;
      }
    }
  }
}
</style>
