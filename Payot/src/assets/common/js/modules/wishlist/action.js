const Methods = {
	init() {
        Methods.actionButtons();
    },

    putSkuListMD( y_SkuList ) {

        console.log(`no put `, y_SkuList);

        let url = "/api/dataentities/WL/documents/";

        let dataUser = {
            y_skulist: y_SkuList,
            y_userid: localStorage.getItem(`y_UserId`)
        };

        if( localStorage.getItem(`y_idMd`) != null ) {
            url = `/api/dataentities/WL/documents/${localStorage.getItem(`y_idMd`)}/`;
        }

        let headers = {
            'Accept': 'application/vnd.vtex.ds.v10+json',
            'Content-Type': 'application/json'
        };

        $.ajax({
            headers: headers,
            type: 'PUT',
            url: `${url}?an=payottatix`,
            data: JSON.stringify(dataUser),

            success: function(data) {
                alert(`Produto adiconado à WishList`);
            },
            error: function(err) {
                console.log(err);
                
                alert(`Erro ao adiconar o produto à WishList`);
            }
        });

    },

    actionButtons() {
        const btn = document.querySelectorAll(`.y-wishBtn`);

        for( let y = 0; y < btn.length; y++ ) {

            btn[y].addEventListener(`click`, (e) => {
                e.preventDefault();
                let that = e.currentTarget;
                let id = "";

                if( that.classList.contains(`btn-wishlist`) ) {
                    id = skuJson.productId;
                } else {
                    id = that.dataset.id;
                }
                
                console.log(`id `, id);

                if( localStorage.getItem(`y_Logged`) == "true" ) {
                    
                    let y_SkuList = localStorage.getItem(`y_SkuList`);

                    if( y_SkuList == null ) {
                        localStorage.setItem(`y_SkuList`, id);
                        console.log(`tava vazio`);
                    } else {
                        console.log(`ñ tava vazio`);
                        let index = y_SkuList.indexOf(id);
                        
                        if( that.classList.contains(`added`) ) {
                            if( index != -1 ) {
                                console.log(`antes do filter`, y_SkuList);
                                y_SkuList = y_SkuList.split(`,`).filter( item => item != id );
                                console.log(`pós filter`, y_SkuList);
                                that.classList.remove(`added`);
                            }
                        } else {
                            y_SkuList = y_SkuList.split(`,`);
                            y_SkuList.push(id);
                            that.classList.add(`added`);
                        }
                        
                        y_SkuList = y_SkuList.toString();
                        localStorage.setItem(`y_SkuList`, y_SkuList);

                        Methods.putSkuListMD( y_SkuList );
                        
                    }
                } else {
                    window.location.href = `/login?ReturnUrl=${window.location.pathname}`;
                }
            });
        }
    }
};

export default {
	init: Methods.init,
}