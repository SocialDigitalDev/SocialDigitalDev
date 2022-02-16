import './EmptySearch-400-500.scss'

const main = () => {
    eventError()
}

const eventError = () => {
    document.querySelector('body')
        .addEventListener('click', () => {
            console.log('clicked this')
        })
}

var scre = $(window).width();

var es400500 = {
    init: function () {

    }
}
es400500.init();

export default main