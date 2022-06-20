import RemoveFromCart from "../../../../common/js/modules/datalayer/removeFromCart";

const Methods = {
	init() {
        $(document).ajaxStop( () => {
            Methods.setInfos();
            Methods.open();
            Methods.close();
            Methods.removeItemMinicart();
            Methods.updateQtdMinicart();
        });
    },
    
    _convertCurrency(number) {
        const int = number.toString().substr(0, number.toString().length - 2)
        const decimal = number.toString().substr(number.toString().length - 2, number.toString().length);

        return `R$ ${int},${decimal}`;
    },

    _removeItem(index) {
        vtexjs.checkout.getOrderForm()
        .then(function(orderForm) {
          let itemIndex = 0
          let item = orderForm.items[itemIndex];
          let itemsToRemove = [
            {
              "index": index,
              "quantity": 0,
            }
          ]
          return vtexjs.checkout.removeItems(itemsToRemove);
        })
    },

    _updateQty(index, qtd) {
        vtexjs.checkout.getOrderForm()
        .then(function(orderForm) {
          let updateItem = {
            index: index,
            quantity: qtd
          };

          return vtexjs.checkout.updateItems([updateItem], null, false);
        })
    },

    open() {
        const body = document.querySelector('body');
        const btnOpen = document.querySelector('.js--open-minicart');
        const minicart = document.querySelector('.j-minicart__content');
        
        btnOpen.addEventListener('click', () => {
            if( !minicart.classList.contains('is--active') ) {
                body.classList.add('no--scroll');
                minicart.classList.add('is--active');
            }
        });
    },
    
    close() {
        const body = document.querySelector('body');
        const btnClose = document.querySelector('.js--close-minicart');
        const minicart = document.querySelector('.j-minicart__content');
        
        
        btnClose.addEventListener('click', () => {
            body.classList.remove('no--scroll');
            minicart.classList.remove('is--active');
        });
    },

    setInfos() {
        const items = vtexjs.checkout.orderForm.items;
        const minicart = document.querySelector('.j-minicart__content-js');
        var subtotal;
        var shipping = "Não calculado";
        if (vtexjs.checkout.orderForm.totalizers[0]){
            subtotal = Methods._convertCurrency(vtexjs.checkout.orderForm.totalizers[0].value);
            if (vtexjs.checkout.orderForm.totalizers[1] && vtexjs.checkout.orderForm.totalizers[1].id === 'Shipping' && vtexjs.checkout.orderForm.totalizers[1].value > 0){
                shipping = Methods._convertCurrency(vtexjs.checkout.orderForm.totalizers[1].value);
            }else if(vtexjs.checkout.orderForm.totalizers[1] && vtexjs.checkout.orderForm.totalizers[1].value < 0){
                shipping = "Frete Grátis";
            }
        }
        const totalPrice = Methods._convertCurrency(vtexjs.checkout.orderForm.value);
        let wrapper;

        if ( items.length < 1 ) {
            wrapper = `
                        <div class="j-minicart-empty">
                            <p>
                                Seu carrinho está vazio
                            </p>
                            <div class="j-minicart-total">
                                <p>
                                    <span>Total</span>
                                    <strong class='js--minicart-total'> - </strong>
                                </p>
    
                                <a class='j-minicart-btn' href="/checkout/#/checkout">Finalizar compra</a>
                            </div>
                        </div>
                    `;	
        } else {
            wrapper = `
                <div class="j-minicart-items">
                    <ul class='j-minicart-items__list'>
            `;
            
            items.forEach( (item, index) => {  
                console.log(items);              
                let formattedPrice = Methods._convertCurrency(item.price);
                wrapper += `
                    <li data-index="${index}" data-product-id="${item.productId}">
                        <div class="j-minicart-img">
                            <a href="${item.detailUrl}">
                                <img src="${item.imageUrl}" alt="${item.name}" />
                            </a>
                        </div>
                        <div class="j-minicart-item">
                            <a href="${item.detailUrl}" class="j-minicart-item__name">
                                ${item.name}
                            </a>
                            <button class='j-minicart-remove__item'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="19.408" height="24" viewBox="0 0 19.408 24"><defs></defs><g transform="translate(-46.155)"><g transform="translate(46.155)"><path class="a" d="M62.821,2.875H59.085a3.248,3.248,0,0,0-6.453,0H48.9a2.745,2.745,0,0,0-2.742,2.742v.141a2.745,2.745,0,0,0,1.733,2.547V21.258A2.745,2.745,0,0,0,50.629,24H61.088a2.745,2.745,0,0,0,2.742-2.742V8.305a2.745,2.745,0,0,0,1.733-2.547V5.617A2.745,2.745,0,0,0,62.821,2.875ZM55.859,1.3a1.952,1.952,0,0,1,1.912,1.575H53.947A1.952,1.952,0,0,1,55.859,1.3ZM62.53,21.258A1.443,1.443,0,0,1,61.088,22.7H50.629a1.443,1.443,0,0,1-1.441-1.442V8.5H62.53Zm1.733-15.5A1.443,1.443,0,0,1,62.821,7.2H48.9a1.443,1.443,0,0,1-1.441-1.442V5.617A1.443,1.443,0,0,1,48.9,4.176H62.821a1.443,1.443,0,0,1,1.441,1.442v.141Z" transform="translate(-46.155)"/><path class="a" d="M158.725,258.192a.65.65,0,0,0,.65-.65v-7.321a.65.65,0,1,0-1.3,0v7.321A.65.65,0,0,0,158.725,258.192Z" transform="translate(-152.507 -237.155)"/><path class="a" d="M228.8,258.192a.65.65,0,0,0,.65-.65v-7.321a.65.65,0,1,0-1.3,0v7.321A.65.65,0,0,0,228.8,258.192Z" transform="translate(-219.091 -237.155)"/><path class="a" d="M298.864,258.192a.65.65,0,0,0,.65-.65v-7.321a.65.65,0,1,0-1.3,0v7.321A.65.65,0,0,0,298.864,258.192Z" transform="translate(-285.675 -237.155)"/></g></g></svg>
                            </button>
                            
                            <div class="j-minicart-item__bottom">
                                <div class="j-minicart-qty">
                                    <form class="j-minicart__form">
                                        <select class="j-minicart__form--qtd">
                                            <option value="${item.quantity}" checked>${item.quantity}</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </form>
                                </div>
                                <div class='j-minicart-price'>
                                    <p>${formattedPrice}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                `;
            });

            wrapper += `
                        </ul>
                            <div class="j-minicart-total">
                                <p class="minicart-subtotal">
                                    <span>Subtotal</span>
                                    <span class='js--minicart-subtotal'>${subtotal}</span>
                                </p>
                                <p class="minicart-frete">
                                    <span>Frete</span>
                                    <span class='js--minicart-shipping'>${shipping}</span>
                                </p>
                                <p>
                                    <span>Total</span>
                                    <strong class='js--minicart-total'> ${totalPrice} </strong>
                                </p>
    
                                <a class='j-minicart-btn' href="/checkout/#/checkout">Finalizar compra</a>
                            </div>
                        </div>
                    `;

        }

        minicart.innerHTML = '';
        minicart.innerHTML += wrapper;
    },

    removeItemMinicart() {
        const btnRemove = document.querySelectorAll('.j-minicart-remove__item');

        btnRemove.forEach( item => {
            item.addEventListener('click', () => {
                let index = item.closest('li').dataset.index;

                let link    = item.closest(`li`).querySelector(`.j-minicart-item__name`).getAttribute(`href`);
                let price   = item.closest(`li`).querySelector(`.j-minicart-price p`).innerText.replace(`R$ `,``).replace(`,`,`.`);
                let qtd     = item.closest(`li`).querySelector(`.j-minicart__form--qtd option:checked`).value;

                RemoveFromCart.init( link, qtd, price );
                
                Methods._removeItem(index);
            });
        });
    },

    updateQtdMinicart() {
        const form = document.querySelectorAll('.j-minicart__form');

        form.forEach( item => {
            let select = item.querySelector('select');
            let index = item.closest('li').dataset.index;

            select.addEventListener('change', ev => {
                let value = ev.target.value;
                Methods._updateQty(index, value);
            });
        });
    }
};

export default {
	init: Methods.init,
}