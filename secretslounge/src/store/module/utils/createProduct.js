function filterProductStock(product) {
  product = product.filter((item) => {
    return item.sellers[0].commertialOffer.AvailableQuantity;
  });

  return product;
}

function CreateProduct(products) {
  products = products.map((product) => {
    const itemStock = filterProductStock(product.items);

    return {
      productId: product.productId,
      clusters: product.clusterHighlights,
      name: product.productName,
      link: product.link,
      image: product.items[0].images[0].imageTag,
      listPrice: product.items[0].sellers[0].commertialOffer.ListPrice,
      bestPrice: product.items[0].sellers[0].commertialOffer.Price,
      category: product.categories,
    };
  });

  return products;
}

export default CreateProduct;
