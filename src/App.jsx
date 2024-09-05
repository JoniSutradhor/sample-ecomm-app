import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import WrapperComponent from "./layouts/WrapperComponent";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <WrapperComponent>
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </WrapperComponent>
      </Router>
    </Provider>
  );
};

export default App;
