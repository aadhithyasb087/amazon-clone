import React from "react";
import Product from "../product/Product";
import "./SearchProduct.css";
import { useLoaderData } from "react-router-dom";

import { useLocation } from "react-router-dom";


function SearchProduct() {
  const location = useLocation();
  const data = useLoaderData().data;

    var myParam = new URLSearchParams(location.search).get("product");
    myParam = myParam.toLowerCase();
  const filteredProducts = myParam
    ? data.filter((product) => {
        const title = product.title.toLowerCase();
        const category = product.category.toLowerCase();
        console.log(title, title.includes(myParam));
        return title.includes(myParam) || category.includes(myParam);
      })
    : [];
  if (filteredProducts.length) {
    return (
      <div className="search__product">
        {filteredProducts.map((item) => (
          <Product
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            rating={5}
            description={item.description}
            category={item.category}
          ></Product>
        ))}
      </div>
    );
  } else {
    console.log(filteredProducts);
    return (
      <div className="no__products">
        <p>
          <b>No results for {myParam}.</b> <br></br> Try checking your spelling
          or use more general terms
        </p>
      </div>
    );
  }
}

export default SearchProduct;
