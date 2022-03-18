import Actions from './actions';
import InfinityScroll from './infinityScroll';

const Methods = {
  init() {
    Actions.init();
    InfinityScroll.init();
  }
};

export default {
  init: Methods.init
};
