import Vue from "vue";
import Notifications from "vue-notification";
import { store } from "./store";
import HeaderStore from "./components/Header/Index.vue";
import FooterStore from "./components/Footer.vue";
import Instagram from "./components/Instagram.vue";
import Newsletter from "./components/Newsletter.vue";
import Shelf from "./components/Shelf.vue";

import VueTheMask from 'vue-the-mask';


import Category from "./pages/category/Index.vue";
import Product from "./pages/product/Index.vue";
import Contact from "./pages/form/Contact.vue";
import Wishlist from "./pages/wishlist/Index.vue";

Vue.use(Notifications);
Vue.use(VueTheMask);

new Vue({
  store,
  components: {
    HeaderStore,
    FooterStore,
    Shelf,
    Contact,
    Category,
    Product,
    Wishlist,
    Instagram,
    Newsletter,
  },
}).$mount("#app");
