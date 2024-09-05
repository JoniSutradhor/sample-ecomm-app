import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setProducts } from "./productSlice";
import { products } from "../data/productData";

export const useFetchProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = { data: products };
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, [dispatch]);
};
