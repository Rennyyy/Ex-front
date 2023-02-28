import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
// import PaypalButton from "./PaypalButton";
import {Button} from 'antd';

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "http://localhost:3001/private/api/v1/addToCart",
      { cart },
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (total) => {
    
    // let formData = new FormData();
    // formData.append("cart", cart);
    // formData.append("total", total);

    const res = await axios.post(
      "http://localhost:3001/private/api/v1/sendOrder",
      {total,cart},
      {
        headers: {
        //   "content-type": "multipart/form-data",
          Authorization: 'Bearer ' + token,
        },
      }
    );
    console.log(res)

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order.");
  };

  if (cart.length === 0)
    return (
      <h2 style={{ "textAlign": "center", fontSize: "5rem" }}>Cart Empty</h2>
    );

    console.log(cart)
  return (
    <div>
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>

          <div className="box-image">
            <img src={product.image} alt="" />
          </div>

          <div className="box-detail">
            <h2>{product.name}</h2>

            <p>{product.description}</p>
            <p>{product.price} THB x {product.quantity} </p>
            <div className="amount">
              <button onClick={() => decrement(product._id)}> - </button>
              <button onClick={() => increment(product._id)}> + </button>
            </div>
            <div className="delete" onClick={() => removeProduct(product._id)}>
              X
            </div>
    
          </div>


          <div className="delete" onClick={() => removeProduct(product._id)}>
              X
            </div>

        </div>
      ))}

      <div className="total">
            <h3>Total {total} THB</h3>
            {/* <button class="btn btn-gradient-border btn-glow" onClick={() => alert("You have successfully placed an order.")}> Buys Now </button> */}
            {/* <button class="btn btn-gradient-border btn-glow" onClick={() => tranSuccess(total)}> Buys Now </button> */}
            <Button type="primary" ghost onClick={() => tranSuccess(total)}> Buys Now </Button>

      </div>
    </div>
  );
}

export default Cart;
