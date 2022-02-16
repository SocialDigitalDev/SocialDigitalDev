<template>
  <div>
    <div class="selector__colors">
      <div class="colors">
        <p class="color-title">
          Cor
          <span>{{ selectedColor }}</span>
        </p>
        <ul class="list__color">
          <li
            class="color-items"
            v-for="(color, index) in colors"
            :key="index"
            :class="{ active: color.name === selectedColor }"
            @click.stop.prevent="filterSkusByColor(color.name)"
          >
            <Button :class="color.name" class="btn-color">
              {{ color.name }}
            </Button>
          </li>
        </ul>
      </div>
    </div>

    <div class="selector__sizes" v-if="selectedColor">
      <div class="sizes">
        <p class="sizes-title">
          Tamanho
          <span>{{ this.selectedSize }}</span>
        </p>

        <ul class="list__sizes">
          <li
            v-for="size in skuOptions"
            :key="size.skuId"
            @click.stop.prevent="handlSizesSelected(size.sizes)"
            :id="rewrite('size' + size.sizes)"
          >
            <input
              type="radio"
              :name="rewrite(size.name)"
              :id="size.skuId"
              class="field__size"
            />

            <label
              :for="size.sizes"
              class="label__field"
              :class="{
                selected: size.sizes === selectedSize,
                '--disabled': !size.stock,
              }"
              :disabled="!size.stock"
            >
              {{ size.sizes }}
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import buildImage from "../../utils/buildImage";

export default {
  mixins: [buildImage],
  data() {
    return {
      selectedColor: null,
      selectedSize: null,
      skuOptions: [],
    };
  },
  computed: {
    ...mapGetters({
      skus: "GET_SKUS",
      colors: "GET_PRODUCT_COLORS",
      current: "GET_CURRENT_SKUS",
    }),
  },

  created() {},

  watch: {
    colors() {
      if (this.colors) {
        this.filterSkusByColor(this.colors[0].name);
      }
    },
  },

  methods: {
    filterSkusByColor(color) {
      this.selectedColor = color;

      const sortedBy = {
        PP: 0,
        P: 1,
        M: 2,
        G: 3,
        GG: 4,
        G1: 5,
        G2: 6,
        G3: 7,
        G4: 8,
      };

      const skuOptions = this.skus.filter((sku) => {
        if (sku.colors.Color) {
          return sku.colors.Color[0] === color;
        } else {
          return false;
        }
      });
      if (isNaN(+skuOptions[0].sizes.substr(-2).trim())) {
        skuOptions.forEach((item) => {
          console.log(item.sizes.substr(-2).trim());
        });
        this.skuOptions = skuOptions.sort(
          (a, b) =>
            sortedBy[a.sizes.substr(-2).trim()] -
            sortedBy[b.sizes.substr(-2).trim()]
        );
      } else {
        this.skuOptions = skuOptions.sort((a, b) =>
          a.sizes
            .substr(-2)
            .trim()
            .localeCompare(b.sizes.substr(-2).trim(), undefined, {
              numeric: true,
              sensitivity: "base",
            })
        );
      }

      this.selectedSize = this.skuOptions[0].sizes;
      this.$store.commit("SET_IMAGEMS", this.skuOptions[0].images);
    },
    getThumb(color) {
      const skuOptions = this.skus.filter((sku) => sku.colors === color);

      return skuOptions[0].thumb;
    },
    handlSizesSelected(size) {
      this.selectedSize = size;
      this.$store.commit("SET_SIZE", this.selectedSize);

      const skuOptions = this.skuOptions.filter(
        (sku) => sku.colors.Color[0] == this.selectedColor && sku.sizes == size
      );

      this.$store.commit("SET_CURRENT_SKUS", {
        skuId: skuOptions[0].skuId,
        stock: skuOptions[0].stock,
        bestPrice: skuOptions[0].bestPrice,
        listPrice: skuOptions[0].listPrice,
        thumb: skuOptions[0].thumb,
        sizes: skuOptions[0].sizes,
        seller: skuOptions[0].seller,
        quantity: skuOptions[0].quantity,
        colors: skuOptions[0].colors,
        images: skuOptions[0].images,
      });
    },
    rewrite(str) {
      if (!str) return;

      return str
        .toLowerCase()
        .trim()
        .replace(/[áàãâä]/g, "a")
        .replace(/[éèẽêë]/g, "e")
        .replace(/[íìĩîï]/g, "i")
        .replace(/[óòõôö]/g, "o")
        .replace(/[úùũûü]/g, "u")
        .replace(/ç/g, "c")
        .replace(/(\ |_)+/, " ")
        .replace(/(^-+|-+$)/, "")
        .replace(/[ ]/g, "-");
    },
  },
};
</script>

<style lang="scss">
.sizes-title {
  font-family: "Nexa", sans-serif;
  font-size: 16px;
  font-weight: 300;

  span {
    padding-left: 20px;
    font-size: 12px;
  }
}
.selector__sizes {
  display: flex;
  flex-wrap: wrap;

  /* Mobile */
  @media (max-width: 767px) {
    justify-content: center;
  }

  .sizes {
    width: 100%;
    margin-top: 30px;

    p {
      color: #333333;
      margin-bottom: 15px;
    }

    h4 {
      color: #1d1f1f;
      font-size: 12px;
      line-height: 16px;
      margin-bottom: 15px;
    }

    .list__sizes {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 100%;
      position: relative;

      /* Mobile */
      @media (max-width: 767px) {
        justify-content: flex-start;
        margin-bottom: 10px;
      }

      li {
        margin: 0 10px 16px 0;

        .field__size {
          opacity: 0;
          position: absolute;
          z-index: -1;
        }

        .label__field {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          height: 32px;
          padding: 2px 6px;
          border-radius: 8px;
          transition: all 0.4s;
          border: 1px solid rgba(205, 205, 200, 0.5);
          overflow: hidden;
          font-family: "Nexa", sans-serif;
          font-weight: 300;
          font-size: 12px;

          &:hover {
            border-color: #cecdc8;
          }

          &.selected {
            border: 1px solid #3d2b1c;
          }
        }
      }

      .selected {
        border: 1px solid black;
        color: black;
        border-radius: 50%;

        .label__field {
          opacity: 0.58;
        }
      }

      .--disabled {
        color: #898a8a !important;
        border: 1px solid #f5f5f5;
        border-radius: 50px;
        position: relative;

        &::before {
          content: "";
          width: 34px;
          height: 1px;
          background-color: #e0e0e0;
          transform: rotate(135deg);
          position: absolute;
          left: 0;
          bottom: 0;
          top: 0;
          margin: auto;
        }
      }
    }
  }
}

.selector__colors {
  padding-top: 10px;
  .color-title {
    font-family: "Nexa", sans-serif;
    font-size: 16px;
    font-weight: 300;
    margin: 10px 0;

    span {
      padding-left: 20px;
      font-size: 12px;
    }
  }
  .selector__colors {
    display: flex;
    flex-wrap: wrap;

    /* Mobile */
    @media (max-width: 767px) {
      justify-content: center;
    }

    .colors {
      width: 100%;
      padding-top: 15px;

      p {
        color: #333333;
        margin-bottom: 15px;
      }

      h4 {
        color: #1d1f1f;
        font-size: 12px;
        line-height: 16px;
        margin-bottom: 15px;
      }
    }
  }
}
.list__color {
  display: flex;
  flex-direction: row;

  .color-items {
    padding-right: 10px;
    position: relative;

    &.active {
      .btn-color {
        box-shadow: 0 0 0 2px #3d2b1c, inset 0 0 0 2px #fff;
      }
    }

    /* Mobile */
    @media (max-width: 767px) {
      justify-content: flex-start;
      margin-bottom: 10px;
    }

    .selected {
      border: 1px solid black;
      color: black;
      border-radius: 50%;
      transition: ease-in-out 0.2s;
    }
  }
}
</style>
