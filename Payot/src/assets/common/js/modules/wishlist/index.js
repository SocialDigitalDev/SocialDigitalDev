import Actions from './action';
import VerifyUser from './verifyUser';

const Methods = {
    init() {
        Actions.init();
        VerifyUser.init();
    }
};

export default {
  init: Methods.init
};
