const Methods = {
  init() {
    setTimeout(() => {
      Methods.isLogged();
    }, 1000);
  },

  isLogged() {
    const el = document.querySelector('.j-user-login > a');
    fetch("/no-cache/profileSystem/getProfile").then(res => {
      res.json().then(json => {
        let logged = json.IsUserDefined;
        
        if (logged) {
          el.innerHTML = `Olá, ${json.FirstName || 'Usuário'} <br/> Minha conta`
        }
      });
    });
  }
};

export default {
  init: Methods.init
};
