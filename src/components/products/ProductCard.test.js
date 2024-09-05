import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import ProductCard from "./ProductCard";
import { addToCart } from "../../store/productSlice";
import { useDispatch } from "react-redux";
import { act } from "react";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("ProductCard Component", () => {
  test("renders the product card with correct data", () => {
    const product = {
      id: 1,
      name: "Test Product",
      price: "20.00",
      image: "test-image.jpg",
      rating: 4,
    };

    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    );

    // Check if the product name is rendered
    expect(screen.getByText("Test Product")).toBeInTheDocument();

    // Check if the product price is rendered
    expect(screen.getByText("Price : 20.00")).toBeInTheDocument();

    // Check if the product image is rendered
    expect(screen.getByAltText("green iguana")).toHaveAttribute(
      "src",
      "test-image.jpg"
    );
  });

  test("dispatches addToCart action on button click", () => {
    const product = {
      id: 1,
      name: "Test Product",
      price: "20.00",
      image: "test-image.jpg",
      rating: 4,
    };

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    act(() => {
      render(
        <Provider store={store}>
          <ProductCard product={product} />
        </Provider>
      );
    });

    fireEvent.click(screen.getByText("Add to Cart"));

    expect(dispatch).toHaveBeenCalledWith(addToCart(product));
  });
});
