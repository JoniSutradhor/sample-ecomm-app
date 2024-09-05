import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setProducts } from './productSlice';
import { products } from '../data/productData';

export const useFetchProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate API call by directly using the product data
        // In a real case, this could be an actual API URL
        const response = { data: products };
        dispatch(setProducts(response.data)); // Dispatch the products
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, [dispatch]);
};
