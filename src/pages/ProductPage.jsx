import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort, setFilters } from "../store/productSlice";
import { useFetchProducts } from "../store/useFetchProducts";
import ProductCard from "../components/products/ProductCard";

const ProductPage = () => {
  useFetchProducts(); // Custom hook to fetch products
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const sort = useSelector((state) => state.product.sort);
  const filters = useSelector((state) => state.product.filters);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const handleSort = (e) => {
    dispatch(setSort({ type: "price", direction: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    dispatch(setFilters({ category: e.target.value, rating: selectedRating }));
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
    dispatch(
      setFilters({
        category: selectedCategory,
        rating: parseInt(e.target.value),
      })
    );
  };

  const applySortAndFilters = () => {
    let filteredProducts = products.filter((product) => {
      const categoryMatch =
        filters.category === "" || product.category === filters.category;
      const ratingMatch =
        filters.rating === 0 || product.rating >= filters.rating;
      return categoryMatch && ratingMatch;
    });

    if (sort.type === "price") {
      filteredProducts = filteredProducts.sort((a, b) => {
        return sort.direction === "asc" ? a.price - b.price : b.price - a.price;
      });
    } else if (sort.type === "rating") {
      filteredProducts = filteredProducts.sort((a, b) => {
        return sort.direction === "asc"
          ? a.rating - b.rating
          : b.rating - a.rating;
      });
    }

    return filteredProducts;
  };

  const sortedAndFilteredProducts = applySortAndFilters();

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label>Sort by Price: </label>
        <select onChange={handleSort} className="ml-2 border">
          <option value="asc">Asc</option>
          <option value="desc">Dsc</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Category: </label>
        <select onChange={handleCategoryChange} className="ml-2 border h-8">
          <option value="">All</option>
          <option value="generation-4">Generation 4</option>
          <option value="generation-5">Generation 5</option>
          <option value="generation-8">Generation 8</option>
        </select>
        <label className="md:ml-4">Rating: </label>
        <select onChange={handleRatingChange} className="ml-2 border h-8">
          <option value="0">All</option>
          <option value="4">4 Stars & Up</option>
          <option value="3">3 Stars & Up</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sortedAndFilteredProducts.length > 0 ? (
          sortedAndFilteredProducts.map((product) => (
            <div key={product.id} className="flex justify-center items-center">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div>No products found.</div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
