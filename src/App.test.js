import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for routing
import { Provider } from 'react-redux'; // Import Provider for Redux
import { store } from './store/store'; // Import your Redux store
import Header from './layouts/Header';

test('Find Product Menu', () => {
  render(
    <Provider store={store}> {/* Wrap with Provider for Redux */}
      <MemoryRouter> {/* Wrap with MemoryRouter for routing */}
        <Header />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByText('Products');
  expect(linkElement).toBeInTheDocument();
});
