<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :key="item.icon"
      :class="{ docker__item: true, 'docker__item--active': index === 0 }"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Docker",
  setup() {
    const dockerList = [
      { icon: "&#xe603;", text: "首页", to: { name: "Home" } },
      { icon: "&#xe6df;", text: "购物车", to: { name: "CartList" } },
      { icon: "&#xe65c;", text: "订单", to: { name: "Home" } },
      { icon: "&#xe610;", text: "我的", to: { name: "Home" } }
    ];

    return { dockerList };
  }
};
</script>

<style lang="scss">
@import "../../style/variables.scss";
.docker {
  display: flex; // WHY flex布局
  box-sizing: border-box;
  position: absolute;
  padding: 0 18px;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 1px solid $content-bgColor;
  color: $content-fontColor;
  &__item {
    flex: 1; // WHY
    text-align: center;
    a {
      color: $content-fontColor;
      text-decoration: none;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }

    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    font-size: 20px; // 浏览器最小显示12px，要显示10px需要做一个缩放
    transform: scale(0.5, 0.5);
    transform-origin: center top; // 以顶部中心位置缩放，确保顶部位置不变
  }
}
</style>
