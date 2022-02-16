function floatToCurrency(_float) {
    var s = _float.toString().replace(",", "").split("."),
        decimals = s[1] || "",
        integer_array = s[0].split(""),
        formatted_array = [];

    for (var i = integer_array.length, c = 0; i != 0; i--, c++) {
        if (c % 3 == 0 && c != 0) {
            formatted_array[formatted_array.length] = ".";
        }
        formatted_array[formatted_array.length] = integer_array[i - 1];
    }

    if (decimals.length == 1) {
        decimals = decimals + "0";
    } else if (decimals.length == 0) {
        decimals = "00";
    } else if (decimals.length > 2) {
        decimals = Math.floor(
            parseInt(decimals, 10) / Math.pow(10, decimals.length - 2)
        ).toString();
    }

    return (
        "<span>R$</span> " + formatted_array.reverse().join("") + "," + decimals
    );
}

/**
 * ======================
 * CACHE SELECTORS
 * ======================
 */
const minicart = {
    storeName: "",
    container: ".e-minicart",
    containerProducts: ".e-minicart__products ul",
    containerEmpty: ".e-minicart__empty",
    containerPrice: ".e-minicart__total, .e-minicart__footer",
    productItem: ".e-minicart__products--item",
    productMaxItems: ".e-availability",
    productRemove: ".js--minicart-product-remove",
    productPlus: ".js--minicart-quantity-plus",
    productMinus: ".js--minicart-quantity-minus",
    productQuantity: ".js--minicart-product-quantity",
};

window.refreshMinicart = () => {
    minicartGetProducts();
    checkMinicartItems();
    updateMinicartPrice();
    checkMinicartPrice();
};

/**
 * ======================
 * GET PRODUCTS
 * ======================
 */

/** * init orderform and get items length */
const minicartGetProducts = () => {
    vtexjs.checkout.getOrderForm().done(function (data) {
        const items = data.items;
        $(minicart.containerProducts).addClass("is--loading");
        $(minicart.containerProducts).html("");
        _minicartReadItems(items);
        checkMinicartItems();
        checkMinicartPrice();
        setTimeout(function () {
            $(minicart.containerProducts).removeClass("is--loading");
        }, 2500);
    });
};

/** * get items info */
const _minicartReadItems = (items) => {
    items.map(function (item, index) {
        const _index = index;
        const name = item.name;
        const quantity = item.quantity;
        const skuId = item.id;
        const productId = item.productId;
        const image = item.imageUrl.replace("55-55", "500-500");
        const priceFormatted = item.formattedPrice;
        const price = item.price;
        const availability = item.availability;
        _minicartProductAPI(
            _index,
            name,
            quantity,
            skuId,
            productId,
            image,
            priceFormatted,
            price,
            availability
        );
    });
};

/** * search in api for product availability */
const _minicartProductAPI = (
    _index,
    name,
    quantity,
    skuId,
    productId,
    image,
    priceFormatted,
    price,
    availability
) => {
    $.ajax({
        url: `/api/catalog_system/pub/products/search/?fq=productId:${productId}`,
        type: "GET",
        success: function (response) {
            const items = response[0].items;
            items.map(function (item) {
                if (item.itemId == skuId) {
                    const availabilityTotal =
                        item.sellers[0].commertialOffer.AvailableQuantity;
                    const product = {
                        index: _index,
                        name: name,
                        quantity: quantity,
                        skuId: skuId,
                        productId: productId,
                        image: image,
                        priceFormatted: priceFormatted,
                        price: price,
                        availability: availabilityTotal,
                    };
                    _minicartAppendItems(product);
                }
            });
        },
    });
};

/**
 * ======================
 * SHOW PRODUCTS
 * ======================
 */

/** * append products into minicart container */
const _minicartAppendItems = (product) => {
    $(minicart.containerProducts).append(`
    <li class="e-minicart__products--item">
			<input type="hidden" class="e-index" value="${product.index}" />
			<input type="hidden" class="e-sku" value="${product.skuId}" />
			<input type="hidden" class="e-id" value="${product.productId}" />
			<input type="hidden" class="e-availability" value="${product.availability}" />
			<input type="hidden" class="e-price" value="${product.price}" />
			<div class="e-minicart__products--item-image">
				<img src="${product.image}" alt="${product.name}" title="${product.name}"/>
			</div>
			<div class="e-minicart__products--item-info">
				<div class="e-minicart__products--item-name">
					<h3>${product.name}</h3>
				</div>
				<div class="e-minicart__products--item-container">
					<div class="e-minicart__products--item-price">
						<p>${product.priceFormatted}</p>
					</div>
					<div class="e-minicart__products--item-quantity">
						<span class="e-minicart__products--item-quantity-controller js--minicart-quantity-minus">-</span>
						<span class="e-minicart__products--item-quantity-input js--minicart-quantity-value">
							<input readonly="readonly" type="number" value="${product.quantity}" class="js--minicart-product-quantity"/>
						</span>
						<span class="e-minicart__products--item-quantity-controller js--minicart-quantity-plus">+</span>
					</div>
			</div>
		</li>
	`);
};

/**
 * ======================
 * UPDATE PRODUCTS
 * ======================
 */

/** * minicart remove products */
const minicartRemoveProduct = () => {
    $("body").on("click", minicart.productRemove, function (ev) {
        ev.preventDefault();
        const productItem = $(this).parents(minicart.productItem);
        const index = productItem.find(".e-index").val();
        _orderFormRemove(index, productItem);
    });
};

/** * remove product from orderform and init first orderform function */
const _orderFormRemove = (index, productItem) => {
    vtexjs.checkout.getOrderForm().done(function (response) {
        const orderFormId = response.orderFormId;
        const data = {
            orderItems: [
                {
                    index: index,
                    quantity: 0,
                },
            ],
        };
        var settings = {
            url: `/api/checkout/pub/orderForm/${orderFormId}/items`,
            type: "PATCH",
            timeout: 0,
            crossDomain: true,
            processData: false,
            contentType: false,
            dataType: "json",
            headers: {
                Accept: "application/vnd.vtex.ds.v10+json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "REST-Range": "resources=0-100",
            },
            data: JSON.stringify(data),
        };

        $.ajax(settings).done(function (response) {
            productItem.remove();
            $(minicart.containerProducts).addClass("is--loading");
            $(minicart.containerProducts).html("");
            minicartGetProducts();
            checkMinicartItems();
            updateMinicartPrice();
            setTimeout(function () {
                checkMinicartPrice();
                $(minicart.containerProducts).removeClass("is--loading");
            }, 2000);
        });
    });
};

/** * watch minicart quantity change */
const minicartQuantity = () => {
    $(document).on("click", minicart.productPlus, function () {
        var _element = $(this);
        var _quantity = _element
            .parents(minicart.productItem)
            .find(minicart.productQuantity);
        var _availability = _element
            .parents(minicart.productItem)
            .find(minicart.productMaxItems)
            .val();
        var productItem = _element.parents(minicart.productItem);
        var index = productItem.find(".e-index").val();
        if (parseInt(_quantity.val()) < parseInt(_availability)) {
            _quantity.val(parseInt(_quantity.val()) + 1);
            _orderFormUpdate(index, productItem);
            checkMinicartPrice();
        }
    });

    $(document).on("click", minicart.productMinus, function () {
        var _element = $(this);
        var _quantity = _element
            .parents(minicart.productItem)
            .find(minicart.productQuantity);
        var productItem = $(this).parents(minicart.productItem);
        var index = productItem.find(".e-index").val();
        if (_quantity.val() > 0) {
            _quantity.val(parseInt(_quantity.val()) - 1);
        }
        _orderFormUpdate(index, productItem);
        checkMinicartPrice();
    });

    $("body").on("change", minicart.productQuantity, function () {
        var _element = $(this);
        var _quantity = _element.val();
        var productItem = $(this).parents(minicart.productItem);
        var index = productItem.find(".e-index").val();
        var _availability = productItem.find(minicart.productMaxItems).val();
        if (parseInt(_quantity) > parseInt(_availability)) {
            _element.val(_availability);
        }
        _orderFormUpdate(index, productItem);
        checkMinicartPrice();
    });
};

const _orderFormUpdate = (index, productItem) => {
    vtexjs.checkout.getOrderForm().done(function (response) {
        const orderFormId = response.orderFormId;
        const data = {
            orderItems: [
                {
                    index: index,
                    quantity: productItem.find(minicart.productQuantity).val(),
                },
            ],
        };
        var settings = {
            url: `/api/checkout/pub/orderForm/${orderFormId}/items`,
            type: "PATCH",
            timeout: 0,
            dataType: "json",
            crossDomain: true,
            processData: false,
            contentType: false,
            headers: {
                Accept: "application/vnd.vtex.ds.v10+json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "REST-Range": "resources=0-100",
            },
            data: JSON.stringify(data),
        };

        $.ajax(settings).done(function (response) {
            updateMinicartPrice();
            checkMinicartPrice();
        });
    });
};

/** * check orderform items to show/hide empty container */
const checkMinicartItems = () => {
    vtexjs.checkout.getOrderForm().done(function (data) {
        const items = data.items;
        if (items.length > 0) {
            $(minicart.containerProducts).show();
            $(minicart.containerPrice).show();
            $(minicart.containerEmpty).hide();
            $(".e-minicart__shipping-range").show();
        } else {
            $(minicart.containerProducts).hide();
            $(minicart.containerPrice).hide();
            $(minicart.containerEmpty).show();
        }
    });
};

const updateMinicartPrice = () => {
    vtexjs.checkout.getOrderForm().done(function (data) {
        if (data.totalizers.length > 0) {
            const minicartTotal =
                data.totalizers[0]["value"] != undefined
                    ? data.totalizers[0]["value"]
                    : false;
            $(".e-minicart__price--total").html(
                `${floatToCurrency(minicartTotal / 100)}`
            );
        }
    });
};

const checkMinicartPrice = () => {
    vtexjs.checkout.getOrderForm().done(function (data) {
        var minicartTotal = "";
        var _itemsPrice = 0;
        var _discountPrice = 0;
        var _items = data.totalizers.filter(function (item, b) {
            if (item["id"] == "Items") {
                return item;
            }
        });
        var _discount = data.totalizers.filter(function (item, b) {
            if (item["id"] == "Discounts") {
                return item;
            }
        });

        if (_items[0] != undefined) {
            _itemsPrice = _items[0]["value"];
        }
        if (_discount[0] != undefined) {
            _discountPrice = _discount[0]["value"];
        }
        if (data.totalizers.length > 0) {
            minicartTotal = (_itemsPrice - _discountPrice * -1) / 100;
            $(".e-minicart__shipping-range-bar-indicator p").html(
                floatToCurrency(minicartTotal)
            );
        }
    });
};

const openMiniCartCustom = () => {
    $(".header__bottom__right__cart, .mob-header__fixed__content__cart").on(
        "click",
        function (event) {
            event.preventDefault();
            $(".e-minicart__overlay").toggleClass("is--active");
            $(".e-minicart").toggleClass("is--active");
            $(".e-minicart__total").toggleClass("is--active");
        }
    );
};

const closeMiniCartCustom = () => {
    $(".e-minicart__header p, .e-minicart__overlay").on("click", function () {
        $(".e-minicart__overlay").removeClass("is--active");
        $(".e-minicart").removeClass("is--active");
        $(".e-minicart__total").removeClass("is--active");
    });
};

/** init functions */
$(document).ready(function () {
    minicartGetProducts();
    minicartRemoveProduct();
    minicartQuantity();
    updateMinicartPrice();
    checkMinicartPrice();
    checkMinicartItems();

    openMiniCartCustom();
    closeMiniCartCustom();
});