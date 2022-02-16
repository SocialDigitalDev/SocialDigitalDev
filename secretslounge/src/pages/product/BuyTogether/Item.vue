<template>
  <div>
    <div class="combo__item">
      <div class="product__image">
        <a :href="data.link">
          <img
            :src="
              buildImage(data.skuOptions[currentSkuIndex].image, '393', '600')
            "
            :alt="data.name"
          />
        </a>
      </div>
      <div class="product__content">
        <h3 class="product__name">{{ data.name }}</h3>

        <div class="product__price">
          <h5
            v-if="
              data.skuOptions[currentSkuIndex].listPrice >
                data.skuOptions[currentSkuIndex].bestPrice
            "
            class="price__list"
          >
            {{
              formatMoney(
                data.skuOptions[currentSkuIndex].listPrice,
                2,
                ",",
                ".",
                "R$"
              )
            }}
          </h5>

          <h5 class="price__best">
            {{
              formatMoney(
                data.skuOptions[currentSkuIndex].bestPrice,
                2,
                ",",
                ".",
                "R$"
              )
            }}
          </h5>
        </div>
        <div class="product__options">
          <select
            name="colors"
            id="colors"
            class="select-default"
            @change="filterSkusByColor()"
            v-model="currentColor"
          >
            <option value="">Cor</option>
            <option
              v-for="(color, index) in data.colors"
              :key="index"
              :value="color.name"
            >
              {{ color.name }}
            </option>
          </select>
          <select
            name="sizes"
            id="sizes"
            class="select-default"
            v-if="sizes.length > 0"
            v-model="currentSku"
          >
            <option value="">Tamanho</option>
            <option
              v-for="(sizeOption, index) in sizes"
              :key="index"
              :value="sizeOption.skuId"
            >
              {{ sizeOption.size[0] }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatMoney from "../../../utils/formatMoney";
import buildImage from "../../../utils/buildImage";

export default {
  props: ["data"],
  mixins: [formatMoney, buildImage],
  data() {
    return {
      currentSku: "",
      currentSkuIndex: 0,
      currentColor: "",
      currentSize: "",
      sizes: [],
    };
  },
  watch: {
    currentSku() {
      this.setCurrentSku(this.currentSku);
    },
  },
  methods: {
    filterSkusByColor() {
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

      let skuOptions = this.data.skuOptions.filter((sku) => {
        return sku.color[0] === this.currentColor;
      });

      if (isNaN(+skuOptions[0].size[0].substr(-2).trim())) {
        skuOptions.forEach((item) => {
          console.log(item.size[0].substr(-2).trim());
        });
        skuOptions = skuOptions.sort(
          (a, b) =>
            sortedBy[a.size[0].substr(-2).trim()] -
            sortedBy[b.size[0].substr(-2).trim()]
        );
      } else {
        skuOptions = skuOptions.sort((a, b) =>
          a.size[0]
            .substr(-2)
            .trim()
            .localeCompare(b.size[0].substr(-2).trim(), undefined, {
              numeric: true,
              sensitivity: "base",
            })
        );
      }

      this.currentSkuIndex = skuOptions[0].index;
      this.sizes = skuOptions;
    },
    setCurrentSku(skuId) {
      this.currentSku = skuId;
      this.$emit("onSelectSku", this.currentSku);
    },
  },
};
</script>

<style lang="scss">
.combo__item {
  margin: 0 20px;

  @media (max-width: 767px) {
    display: flex;
  }

  .product__image {
    margin-bottom: 10px;
    position: relative;

    @media (max-width: 767px) {
      display: flex;
      width: 70%;

      img {
        height: 159px;
      }
    }

    .product__link {
      position: relative;
      display: block;

      .img__hover {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        transition: 0.4s;
      }
    }

    .product__like {
      position: absolute;
      right: 10px;
    }

    .product__clusters {
      position: absolute;
      top: 14px;
      left: 14px;

      .cluster {
        background: #956a64;
        font: normal normal 300 10px/15px "Nexa";
        letter-spacing: 0.4px;
        color: #ffffff;
        width: 46px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        text-transform: capitalize;
        margin-bottom: 8px;
        padding-top: 3px;
      }
    }
  }

  .product__content {
    .product__name {
      font: normal normal 300 12px/16px "Nexa";
      letter-spacing: 1.2px;
      color: #3d2b1c;
      text-transform: uppercase;
      overflow: hidden;
      text-align: center;
      padding: 0 10px;
      margin-top: 20px;
      height: 40px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;

      @media (max-width: 767px) {
        height: auto;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }

    .product__price {
      height: 18px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 15px 0 12px 0;

      .price__list {
        text-decoration: line-through;
        font: normal normal 100 10px/14px "Nexa";
        letter-spacing: 0.4px;
        color: #3d2b1c;
        opacity: 0.48;
        margin-right: 10px;
      }

      .price__best {
        font: normal normal normal 12px/16px "Nexa";
        letter-spacing: 0.48px;
        color: #3d2b1c;
        margin-bottom: 10px;
      }
    }

    .product__options {
      display: flex;
      justify-content: center;

      @media (max-width: 767px) {
        display: block;
      }

      .select-default {
        padding: 10px;
        margin: 16px 15px;
        display: block;
        width: 100%;
        border-radius: 20px;
        border: 1px solid #3d2b1c;
        background: #ffffff;
        background: url("~@assets/icon-arrow-down.png") no-repeat 93% center;
        font-family: "Nexa";
        font-weight: 300;
        font-size: 14px;
        appearance: none;
      }
    }

    .btn__bay {
      width: 100%;
      margin: 25px auto 0;
      background: #3f3948;
      transition: background 0.3s, color 0.3s;

      &:hover {
        background: #eee809;
        color: #3f3948;
        transition: background 0.3s, color 0.3s;
      }
    }

    .payments {
      text-align: center;
      font: normal normal 300 10px/14px "Nexa";
      letter-spacing: 0.8px;
      color: #3d2b1c;
    }
  }
  &:hover {
    .product__image {
      .product__link {
        .img__hover {
          opacity: 1;
          transition: 0.4s;
        }
      }
    }
  }
}
</style>
