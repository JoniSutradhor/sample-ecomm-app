import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  filters: {
    category: "",
    rating: 0,
  },
  sort: {
    type: "price",
    direction: "asc",
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity -= 1;
        if (state.cart[itemIndex].quantity === 0) {
          state.cart.splice(itemIndex, 1);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setProducts, addToCart, removeFromCart, setSort, setFilters } =
  productSlice.actions;
export default productSlice.reducer;
