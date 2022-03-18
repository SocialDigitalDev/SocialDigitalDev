import Actions from './actions';
// import FilterMobile from './filterMobile';
import InfinityScroll from './infinityScroll';

const Methods = {
    init() {
        Actions.init();
        // FilterMobile.init();
        InfinityScroll.init();
    }
};

export default {
  init: Methods.init
};
