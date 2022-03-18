import Impressions from "../../../../common/js/modules/datalayer/impressions";
import ProductClick from "../../../../common/js/modules/datalayer/productClick";
import Minicart from "../../../../common/js/modules/geral/minicart";
import Newsletter from "../../../../common/js/modules/geral/newsletter";
import PromoBar from "../../../../common/js/modules/geral/promobar";
import Menu from "./menu";
// import Login from "./login"

const Methods = {
  init() {
    Minicart.init();
    Newsletter.init();
    Menu.init();
    Impressions.init();
		ProductClick.init();
    PromoBar.init();
    // Login.init();
  }
};

export default {
  init: Methods.init
};
