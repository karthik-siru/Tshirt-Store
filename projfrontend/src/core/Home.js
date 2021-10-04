import "../styles.css";
import { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { load } from "dotenv";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, seterror] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data && data.err) {
        seterror(data.err);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="All about tshirts">
      <div className="row text-center">
        <h1 className="text-white "> All of T-shirts </h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default Home;
