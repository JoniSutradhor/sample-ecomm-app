import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Header from "./layouts/Header";

test("Find Product Menu", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByText("Products");
  expect(linkElement).toBeInTheDocument();
});
