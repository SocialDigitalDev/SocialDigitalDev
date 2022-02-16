import './Account.scss'

const main = () => {
    eventAccount()
}

const eventAccount = () => {
    document.querySelector('body')
        .addEventListener('click', () => {
            console.log('clicked this')
        })
}

var scre = $(window).width();

var acc = {
 
    init: function () {

    }
}
acc.init();

export default main