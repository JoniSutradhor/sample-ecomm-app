import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [], // List of products
  cart: JSON.parse(localStorage.getItem('cart')) || [], // Cart items stored in localStorage
  filters: {
    category: '',
    rating: 0,
  },
  sort: {
    type: 'price',
    direction: 'asc',
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already in cart
      } else {
        state.cart.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity -= 1; // Decrease quantity by 1
        if (state.cart[itemIndex].quantity === 0) {
          state.cart.splice(itemIndex, 1); // Remove item if quantity is 0
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setProducts, addToCart, removeFromCart, setSort, setFilters } = productSlice.actions;
export default productSlice.reducer;
