function GetCategories(categoriesTrees) {
  const categorys = [];

  function recursive(categoriesTrees) {
    categoriesTrees.forEach((category, index) => {
      categorys.push({
        id: category.Id,
        name: category.Name,
        link: category.LinkEncoded,
        quantity: category.Quantity,
      });

      if (category.Children.length) {
        recursive(category.Children[index].Children);
      }
    });
  }

  recursive(categoriesTrees);

  return categorys;
}

export default GetCategories;
