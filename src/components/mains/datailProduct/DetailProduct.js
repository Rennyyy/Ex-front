import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../products/Products";
// import {
//   ArrowBackIosOutlined,
//   ArrowForwardIosOutlined,
// } from "@material-ui/icons";

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
//   const addCart = state.userAPI.addCart;
  const [detailProduct, setDetailProduct] = useState([]);

//   const [isMoved, setIsMoved] = useState(false);
//   const [slideNumber, setSlideNumber] = useState(0);

  const listRef = useRef();

//   const handleClick = (direction) => {
//     setIsMoved(true);
//     let distance = listRef.current.getBoundingClientRect().x - 50;
//     if (direction === "left" && slideNumber > 0) {
//       setSlideNumber(slideNumber - 1);
//       listRef.current.style.transform = `translateX(${590 + distance}px)`;
//     }
//     if (direction === "right" && slideNumber < 5) {
//       setSlideNumber(slideNumber + 1);
//       listRef.current.style.transform = `translateX(${-1550+ distance}px)`;
//     }
//   };

//   console.log(detailProduct)
  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;
  console.log(detailProduct)


  return (
    <>
      <div className="detail">
        <div className="list">
          <div className="wrapper">
            
            <div className="container" ref={listRef}>
                <div className="listItem">
                    <img src={detailProduct.images} alt="" />
                    
                 </div>
              
            </div>

            
          </div>
        </div>
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.name}</h2>
            <h6>#id: {detailProduct.product_id}</h6>
          </div>
          <span> {detailProduct.level}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Borrowed: {detailProduct.sold}</p>
          {/* <Link
            to="/cart"
            className="cart"
            onClick={() => addCart(detailProduct)}
          >
            Borrow Now
          </Link> */}
        </div>
      </div>

      {/* <div>
        <h2>Related </h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div> */}
    </>
  );
}

export default DetailProduct;
