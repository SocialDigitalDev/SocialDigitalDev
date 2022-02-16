<template>
  <div>
    <a class="product__back" :href="categoryProd">Voltar</a>

    <div class="product__infos">
      <h1 class="product__name">
        {{ name }}
      </h1>
      <AddToWishlist :productId="productId" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddToWishlist from "../../components/wishlist/AddToWishlist.vue";

export default {
  computed: {
    ...mapGetters({
      name: "GET_NAME",
      code: "GET_PRODUCT_CODE",
      productId: "GET_PRODUCT_ID",
      categoryProd: "GET_PRODUCT_CATEGORY",
    }),
  },
  components: {
    AddToWishlist,
  },
};
</script>

<style lang="scss">
.product__infos {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: 20px;

  .addToWishlist {
    position: static;
  }

  .product__name {
    font: normal normal bold 24px/28px "Nexa";
    letter-spacing: 0.48px;
    color: #3d2b1c;
    text-align: start;

    @media (max-width: 767px) {
      text-align: center;
      font-size: 22px;
    }
  }
}

.product__back {
  font-size: 12px;
  color: #3d2b1c;
  margin-bottom: 25px;
  display: none;

  &::before {
    content: "";
    background-image: url(~@assets/arrow-down.svg);
    width: 16px;
    height: 7px;
    display: inline-block;
    background-size: contain;
    background-repeat: no-repeat;
    transform: rotate(90deg);
    margin: 5px 6px 0 0;
  }

  @media (max-width: 767px) {
    display: block;
  }
}
</style>
