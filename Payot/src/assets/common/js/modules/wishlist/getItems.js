const Methods = {

    getItems( y_UserId ) {
        $.ajax({
            headers: {
                "REST-Range": "resources=0-2999",
                "Accept": "application/vnd.vtex.ds.v10+json",  
                "Content-type": "application/json"
            },
            type: 'GET',
            url: "/api/dataentities/WL/search?an=payottatix&_fields=id,y_skulist&_where=y_userid=" + y_UserId,

            success: function(data) {
                const btn = document.querySelectorAll(`.y-wishBtn`);
                let y_skulist = localStorage.getItem(`y_SkuList`);
                
                if( y_skulist == null || y_skulist == "undefined" ) {
                    localStorage.setItem(`y_SkuList`, data[0].y_skulist);
                    localStorage.setItem(`y_idMd`, data[0].id);
                }


                for( let y = 0; y < btn.length; y++ ) {
                    let that = btn[y];
                    let id = that.dataset.id;

                    if( typeof y_skulist != "undefined" && y_skulist.indexOf(id) != -1 ){
                        that.classList.add(`added`);
                    }
                }

            },
            error: function(err) {
                console.log(err);
            }
        });
    }

};

export default {
	init: Methods.getItems
}