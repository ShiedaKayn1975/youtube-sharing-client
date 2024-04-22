import { render, cleanup } from '@testing-library/react';
import { AuthContext } from '../../provider/Auth';
import ShareBox from './ShareBox';

afterEach(cleanup);

test('ShareBox should render without crash', () => {
  const result = render(
    <AuthContext.Provider
      value={{
        setLoading: jest.fn(),
        setLoadingText: jest.fn(),
      }}
    >
      <ShareBox />
    </AuthContext.Provider>
  );
  const elm = result.container.querySelector('.sharebox-container');
  expect(elm).toBeInTheDocument();
});
