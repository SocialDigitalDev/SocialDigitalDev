<template>
  <div class="gallery">
    <div class="main">
      <Carousel
        v-if="isMobile"
        :per-page="1"
        :navigationEnabled="true"
        :paginationEnabled="pagination"
      >
        <Slide
          class="image__main mob"
          v-for="(image, index) in images"
          :key="index"
        >
          <img :src="buildImage(image.tag, '360', '484')" :alt="productName" />
        </Slide>
      </Carousel>

      <div
        v-else
        class="image__main"
        v-for="(image, index) in images"
        :key="index"
      >
        <img :src="buildImage(image.tag, '378', '504')" :alt="productName" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import buildImage from "../../utils/buildImage";

export default {
  mixins: [buildImage],
  data() {
    return {
      isMobile: screen.width <= 767,
    };
  },
  computed: {
    ...mapGetters({
      images: "GET_IMAGEMS",
      productName: "GET_NAME",
      currentImage: "GET_PRODUCT_CURRENT_IMAGE",
      current: "GET_CURRENT_SKUS",
    }),
  },
  components: {
    Slide,
    Carousel,
  },
  methods: {
    changeMainImage(index) {
      this.$refs.carousel.goTo(index);
    },
    buildImage(image, width, height) {
      if (!image || !width || !height) {
        return false;
      }

      image = image
        .replace(/~/g, "")
        .replace(/#width#/g, width)
        .replace(/#height#/g, height);

      const regex = /<img.*?src="(.*?)"/.exec(image)[1];

      return `https://tfcqav.vteximg.com.br/${regex}`;
    },
  },
};
</script>

<style lang="scss">
.gallery {
  columns: 2;

  @media (max-width: 767px) {
    columns: 1;
    .VueCarousel-navigation-button {
      font-size: 0;
    }
  }

  .main {
    @media (min-width: 768px) {
      // display: flex;
      align-items: center;
      justify-content: space-between;

      .image__main {
        width: 378px;

        img {
          margin-bottom: 24px;
        }
      }
    }
  }

  .thumbs {
    display: flex;
    justify-content: center;
    margin: 25px 0;

    .thumb {
      width: 82px;
      border: 1px solid #efefef;
      padding: 10px;
      margin-right: 15px;

      &:last-child {
        margin-right: 0;
      }
    }
    @media (max-width: 767px) {
      display: none;
    }
  }
  @media (max-width: 767px) {
    margin-bottom: 30px;
  }
}
</style>
