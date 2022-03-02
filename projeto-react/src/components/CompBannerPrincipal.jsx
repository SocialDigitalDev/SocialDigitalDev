import React from 'react'
import Slider from "react-slick";
import vanguard from '../img/vanguard.jpg'
import eldenring from '../img/eldenring.jpg'

function bannerPrincipal() {
    var settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false
    }
    return (
        <div class="banner-principal-main">
            <div class="wrapper">
                <Slider {...settings}>
                    <div class="box-banner">
                        <img src={vanguard} width="1920" height="580" alt="Call of Duty Vanguard" />
                    </div>
                    <div class="box-banner">
                        <img src={eldenring} width="1920" height="580" alt="Elden Ring" />
                    </div>
                </Slider>
            </div>
        </div>
    )  
}

export default bannerPrincipal;