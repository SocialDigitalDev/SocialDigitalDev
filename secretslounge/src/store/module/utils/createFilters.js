function isCheckedFilter(filters, tapy, name) {
  const filtered = filters.find((filter) => {
    return filter.tapy === tapy && filter.name === name;
  });

  return !!filtered;
}

function CreateSpecificationFilters(
  specificationFilters,
  tapy,
  selectedsFilters
) {
  const filters = {};

  specificationFilters.map((filter) => {
    filters[filter.Name] = {
      tapy,
      name: filter.Name,
      map: filter.Map,
      checked: isCheckedFilter(selectedsFilters, tapy, filter.Name),
      link: filter.LinkEncoded,
      quantity: filter.Quantity,
    };

    return filters;
  });

  return filters;
}

function CreateFilters(specification, selectedsFilters, tapy) {
  const filters = {};

  if (tapy === "brands") {
    specification.map((brand) => {
      filters[brand.Name] = {
        tapy: "brands",
        name: brand.Name,
        map: brand.Map,
        checked: isCheckedFilter(selectedsFilters, "brands", brand.Name),
        link: brand.LinkEncoded,
        quantity: brand.Quantity,
      };

      return filters;
    });

    return filters;
  }

  specification.map((filter) => {
    const [type, value] = filter;

    filters[type] = {
      title: type,
      filters: CreateSpecificationFilters(value, type, selectedsFilters),
    };

    return filters;
  });

  return filters;
}

export default CreateFilters;
