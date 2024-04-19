import React from "react";
import "./Home.css";
import Product from "../product/Product";
import Banner from "./Banner";
import { useLoaderData } from "react-router-dom";

function Home() {
  const data = useLoaderData().data;
  return (
    <div className="home">
      <Banner />
      <div className="home__container">
        {data.map((item) => (
          <Product
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            rating={5}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
