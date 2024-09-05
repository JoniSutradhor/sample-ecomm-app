import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/productSlice";
import { Button, Typography } from "@mui/material";

const CartPage = () => {
  const cart = useSelector((state) => state.product.cart);
  const dispatch = useDispatch();

  // Calculate the grand total
  const grandTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center">
        <Typography variant="h4" className="mb-4">
          Shopping Cart
        </Typography>
      </div>
      {cart.length === 0 ? (
        <div className="flex justify-center">
          <Typography>Your cart is empty.</Typography>
        </div>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border-b"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  height={100}
                  width={100}
                  className="object-cover mr-4"
                />
                <div>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2">
                    Unit Price: ${item.price}
                  </Typography>
                  <Typography variant="body2">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    Total Price: ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </div>
              </div>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          ))}
          <div className="mt-6 flex justify-end">
            <Typography variant="h5">
              Grand Total: ${grandTotal.toFixed(2)}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
