
export const BASE_URL = "https://pettiesbackend.ajinkya6373.repl.co";
export const DropdowmItems = ["Recommended", "low to high", "high to low"];
export const Ratings = ["4 stars & above", "3 stars & above", "2 stars & above", "1 stars & above"]
export const Price = ["0 - 250", "251 - 500", "501 - 1000", "1001 - 2000", "2001 - 5000", "5001 and above"]
export const availability = ["Assured_delivery", "Onsale"]

export const AddressInput = [
  {
    id: 1,
    name: "name",
    type: "text",
    placeholder: "Enter name",
    label: "Name",
    errorMessage: "Please fill the name!",
    required: true,

  },
  {
    id: 2,
    name: "address",
    type: "text",
    placeholder: "Enter house no., street, colony",
    label: "Address",
    errorMessage: "Please fill the address!",
    required: true,
  },
  {
    id: 3,
    name: "city",
    type: "text",
    placeholder: "Enter city",
    label: "City",
    errorMessage: "Please fill the city!",
    required: true,
  },
  {
    id: 4,
    name: "state",
    type: "text",
    placeholder: "Enter state",
    label: "State",
    errorMessage: "Please fill the state!",
    required: true,
  },
  {
    id: 5,
    name: "pinCode",
    type: "text",
    placeholder: "Enter zip code",
    label: "PinCode",
    errorMessage: "Please enter zipcode!",
    required: true,
  },
  {
    id: 6,
    name: "mobileNo",
    type: "text",
    placeholder: "Enter mobile Number",
    label: "MobileNo",
    errorMessage: "Please enter valid mobileNo!",
    required: true,
    pattern: "^[0-9]{10}$"
  },
]

export const DummyAddress = {
  name: "Krishna Gite",
  address: "B. No. 10, Prerananagar, Adarsh Colony, Maldad Road East , Sangamner",
  city: "Mumbai",
  state: "Maharashtra",
  pinCode: "173468",
  mobileNo: "8752388912"

}

export const keywords = [
  'Dog',
  'Cat',
  'Bird',
  'Fish',
  'Food',
  'Health Care',
  'Grooming',
  'Accessories',
  'Bowls & Feeders',
  'Toys',
  'Clothes',
  'Aquarium Decor'

]
export const discountedPrice = (price, discountPer, qunatity=1) => {
  return (price - (discountPer * (price / 100))) * qunatity;
}

export const totalPrice = (cartList) => {
  return cartList.reduce(
    (acc, item) => {
      return {
        totalMRP: acc.totalMRP + item.quantity * item.product.price,
        discount: acc.discount + discountedPrice(item.product.price,item.product.discountPercentage,item.quantity),
      }

    },
    { totalMRP: 0, discount: 0 },
  );
};

export const getFilteredProductsByPets = (productList, filterList) => {

  if (filterList.length > 0) {
    return productList.filter((product) => product.pets.some((e) => filterList.includes(e))
    )
  }
  return productList
}


export const getFilteredProductsByCategory = (productList, filterList) => {
  if (filterList.length > 0) {
    return productList.filter((product) =>
      filterList.some((list) => list === product.category)
    );
  }
  return productList;
};

export const getFilteredProductsByAvailability = (productList, filterList) => {
  if (filterList.length > 0) {
    if (filterList.includes("Assured_delivery")) {
      productList = productList.filter((product) => product.assuredDelivery === true)
    }
    if (filterList.includes("Onsale")) {
      productList = productList.filter((product) => product.onSale === true)
    }
    return productList;
  }
  return productList;
}


export const getFilteredProductsByPrice = (productList, filterList) => {
  let output = [];
  if (filterList.length > 0) {
    if (filterList.includes("0 - 250")) {
      productList.filter((product) => product.price >= 0 && product.price <= 250).forEach((p) => {
        output.push(p)
      })
    }
    if (filterList.includes("251 - 500")) {
      productList.filter((product) => product.price >= 251 && product.price <= 500).forEach((p) => {
        output.push(p)
      })
    }
    if (filterList.includes("501 - 1000")) {
      productList.filter((product) => product.price >= 501 && product.price <= 1000).forEach((p) => {
        output.push(p)
      })
    }
    if (filterList.includes("1001 - 2000")) {
      productList.filter((product) => product.price >= 1001 && product.price <= 2000).forEach((p) => {
        output.push(p)
      })
    }
    if (filterList.includes("2001 - 5000")) {
      productList.filter((product) => product.price >= 2001 && product.price <= 5000).forEach((p) => {
        output.push(p)
      })
    }
    if (filterList.includes("5001 and above")) {
      productList.filter((product) => product.price >= 5001).forEach((p) => {
        output.push(p)
      })
    }
    return output;
  }
  return productList;
}

export const getFilteredProductsByRating = (productList, checkRating) => {
  if (checkRating) {
    switch (checkRating) {
      case "4 stars & above":
        return productList.filter((product) => parseInt(product.rating) >= 4)
      case "3 stars & above":
        return productList.filter((product) => parseInt(product.rating) >= 3)
      case "2 stars & above":
        return productList.filter((product) => parseInt(product.rating) >= 2)
      case "1 stars & above":
        return productList.filter((product) => parseInt(product.rating) >= 1)
      default:
        return productList
    }
  }
  return productList;
}

export const getSortedProducts = (filteredData, sortBy) => {
  switch (sortBy) {
    case "low to high":
      return [...filteredData].sort((a, b) => a.price - b.price);
    case "high to low":
      return [...filteredData].sort((a, b) => b.price - a.price);
    default:
      return filteredData;
  }
};

export const sortBySearchparams = (product, searchTerm) => {

  if (searchTerm.length > 0) {
    const searchData = [];
    product.forEach((p) => {
      searchTerm.forEach((i) => {
        if ((p.name.toLowerCase().includes(i.toLowerCase()) || p.category.toLowerCase().includes(i.toLowerCase()) || p.description.toLowerCase().includes(i.toLowerCase())) && !searchData.includes(p)) {
          searchData.push(p);
        }
        else {
          p.pets.forEach((petname) => {
            if (petname.toLowerCase().includes(i.toLowerCase()) && !searchData.includes(p)) {
              searchData.push(p);
            }
          })
        }
      })
    })
    return searchData;
  }
  return product;
}

export const getTransformedProducts = ({
  product,
  chechPetsList,
  checkCategoryList,
  checkavAilabilityList,
  checkPriceList,
  checkRating,
  sort,
  searchTerm,


}) => {

  const getsortBySearchparams = sortBySearchparams(
    product,
    searchTerm,
  )
  const filteredProductsByPets = getFilteredProductsByPets(
    getsortBySearchparams,
    chechPetsList
  )
  const filteredProductsByCategory = getFilteredProductsByCategory(
    filteredProductsByPets,
    checkCategoryList
  );
  const filteredProductsByAvailability = getFilteredProductsByAvailability(
    filteredProductsByCategory,
    checkavAilabilityList
  )

  const filteredProductsByPrice = getFilteredProductsByPrice(
    filteredProductsByAvailability,
    checkPriceList
  )

  const filteredProductsByRating = getFilteredProductsByRating(
    filteredProductsByPrice,
    checkRating
  );

  const sortedProductList = getSortedProducts(filteredProductsByRating, sort);
  return sortedProductList;
};
