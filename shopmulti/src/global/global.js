import './utils/bootstrap/index'
import header from './Header/Header'
import footer from './Footer/Footer'
import './utils/roundValues'
import './utils/variantesCompraRapida'
import './utils/vtex-countdown'
import './Global.scss'

var scre = $(window).width();


const main = () => {
    header()
    footer()

    // console.log(process.env.DB_HOST)
    console.log(process.env)

}

document.addEventListener('DOMContendLoaded', main())
