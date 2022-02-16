<template>
  <div class="instagram__component">
    <div class="title__instagram">
      <p>
        siga-nos
        <a
          href="https://www.instagram.com/secretsloungeofficial/"
          target="_blank"
          >@secretsloungeofficial</a
        >
      </p>
    </div>

    <div class="instafeed">
      <div class="photos" id="instafeed">
        <!-- <a
          :href="photo.link"
          target="_blank"
          :style="{ 'background-image': 'url(' + photo.image + ')' }"
        >
          <i class="ico__like"></i>
        </a> -->
      </div>
      <!-- /.photo -->
    </div>

    <!-- /.photos -->
  </div>
</template>

<script>
export default {
  mounted() {
    this.fetchInsta();
  },
  props: ["token"],

  methods: {
    fetchInsta() {
      var feed = new Instafeed({
        accessToken: this.token,
        limit: 4,
      });
      feed.run();
    },
  },
};
</script>

<style lang="scss">
.main__instagram {
  &.shell {
    margin-bottom: 80px;

    @media (max-width: 767px) {
      margin-bottom: 20px;
      margin-top: 20px;
    }
  }

  .title__instagram {
    display: block;

    @media (max-width: 767px) {
      padding: 0 20px;
    }

    p {
      font: normal normal 300 12px/19px "Nexa";
      letter-spacing: 3.6px;
      color: #3d2b1c;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 30px;

      a {
        text-decoration: none;
        color: #3d2b1c;
        &:hover,
        &:visited {
          color: #3d2b1c;
        }
      }
    }
  }

  .instafeed {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 767px) {
      flex-wrap: wrap;
      display: inline-block;

      a {
        width: 100%;
        margin-bottom: 15px;

        @media (max-width: 767px) {
          width: 44%;
        }

        @media (min-width: 320px) {
          width: 42%;
        }
      }
    }
  }

  .photos {
    margin: 40px 0;
    display: flex;
    width: 100%;
    height: 290px;

    /* Mobile */
    @media (max-width: 767px) {
      display: inline-block;
      width: 100%;
      height: auto;
    }

    a {
      position: relative;
      margin: 0 20px;
      display: flex;
      width: 100%;

      @media (max-width: 767px) {
        margin: 0 10px;
        display: inline-block;
        width: 44%;
      }

      @media (max-width: 320px) {
        width: 42%;
      }

      &::after {
        content: "";
        width: 100%;
        height: 95%;
        background: rgba(0, 0, 0, 0.349);
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        transition: 0.4s;
      }
      &:hover {
        &::after {
          opacity: 1;
          transition: 0.4s;
        }
      }
    }

    img {
      width: 100%;
      padding-bottom: 15px;
      height: auto;

      @media (max-width: 767px) {
        height: 200px;
      }

      @media (max-width: 320px) {
        height: 160px;
      }
    }
  }
}
</style>
