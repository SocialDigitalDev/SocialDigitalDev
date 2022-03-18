import Impressions from "../../../../common/js/modules/datalayer/impressions";
import ProductClick from "../../../../common/js/modules/datalayer/productClick";
import Minicart from "../../../../common/js/modules/geral/minicart";
import Newsletter from "../../../../common/js/modules/geral/newsletter";
import PromoBar from "../../../../common/js/modules/geral/promobar";
import Menu from "./menu";
import Footer from "./footer";

const Methods = {
    init() {
        Menu.init();
        Minicart.init();
        Footer.init();
        Newsletter.init();
        Impressions.init();
		ProductClick.init();
        PromoBar.init();
    }
};

export default {
    init: Methods.init
};