import { render, cleanup } from '@testing-library/react';
import { AuthContext } from '../../provider/Auth';
import { MemoryRouter } from 'react-router-dom';
import Share from './Share';

afterEach(cleanup);

test('share should render without crash', () => {
  const result = render(
    <AuthContext.Provider
      value={{
        setLoading: jest.fn(),
        setLoadingText: jest.fn(),
      }}
    >
      <MemoryRouter>
        <Share />
      </MemoryRouter>
    </AuthContext.Provider>
  );
  const elm = result.container.querySelector('.share-container');
  expect(elm).toBeInTheDocument();
});
