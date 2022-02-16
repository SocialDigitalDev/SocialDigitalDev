<template>
  <div>
    <div class="dropdown__inner">
      <div class="shell flex row">
        <div class="dropdown__side between flex col">
          <h3>Categorias:</h3>

          <div class="dropdown__list flex row">
            <ul class="flex col">
              <li v-for="items in children" :key="items.id" :id="items.id">
                <a :href="items.url">{{ items.name }}</a>
              </li>
            </ul>
          </div>

          <a :href="parentUrl" class="dropdown__more">
            Ver tudo <i class="ico ico-arrow-dark"></i>
          </a>
        </div>
        <div class="dropdown__side img">
          <a :href="parentUrl">
            <img
              :src="'/arquivos/dep-' + rewrite(imageDepartment) + '.jpg'"
              :alt="rewrite(imageDepartment)"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- /.dropdown -->
</template>

<script>
export default {
  props: ["children", "parentUrl", "imageDepartment"],
  methods: {
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

<style lang="scss" scoped>
.dropdown {
  background-color: transparent;

  @media (min-width: 768px) {
    position: relative;
    z-index: 99999;
  }
}

.dropdown__inner {
  width: 100%;
  background-color: $color-creme;
  padding: 30px 0;
  cursor: initial;
  pointer-events: auto;
  opacity: 0;
  max-height: 330px;
  transition: 0.4s;

  @extend %dropdown-complete;
  top: 150px;

  .shell {
    justify-content: space-between;
  }

  .dropdown__side {
    &.between {
      justify-content: space-around;
    }

    h3 {
      @extend %nexa-12px-bold;
      color: $color-brown-light;
      text-transform: uppercase;
      cursor: default;
    }

    .dropdown__list {
      margin: 20px 0;

      ul {
        margin-right: 40px;

        li {
          margin-bottom: 5px;

          a {
            @extend %nexa-14px-brownDark;
            display: inline-block;
            padding: 5px 0;
          }

          &:hover {
            a {
              text-decoration: underline;
            }
          }
        }

        @media (min-width: 768px) {
          flex-flow: column wrap;
          align-items: self-start;
          justify-content: initial;
          max-height: 190px;
          width: 350px;
          min-height: 160px;
        }
      }
    }

    .dropdown__more {
      @extend %nexa-14px-brownDark-bold;
      display: inline-block;
      margin-top: 10px;
      padding-bottom: 2px;
      display: block;
      width: 87px;

      &:hover {
        border-bottom: 1px solid $color-brown-dark;
      }

      .ico-arrow-dark {
        transform: rotate(-90deg);
        position: relative;
        top: -1px;
        margin-left: 5px;
      }
    }
  }
}

@media (max-width: 767px) {
  .content {
    overflow-y: auto;
    padding-top: 50px;

    .dropdown {
      &.active {
        .dropdown__inner {
          opacity: 1;
          position: initial;
          max-height: initial;

          .dropdown__side {
            &.img {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
