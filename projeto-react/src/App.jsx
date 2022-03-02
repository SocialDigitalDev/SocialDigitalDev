import React from 'react'
import CompHeader from  './components/CompHeader'
import CompFooter from  './components/CompFooter'
import CompBannerPrincipal from  './components/CompBannerPrincipal'

export default (props) => (

    <div>
        <header>
            <CompHeader />
        </header>
        <main class="main">
            <CompBannerPrincipal />
        </main>
        <footer>
            <CompFooter />
        </footer>
    </div>

)