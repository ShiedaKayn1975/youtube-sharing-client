import { render, cleanup } from '@testing-library/react';
import ScrollToTop from './ScrollToTop';

afterEach(cleanup);

test('ScrollToTop should render without crash', () => {
  const result = render(<ScrollToTop />);
  const elm = result.container.querySelector('.scroll-to-top');
  expect(elm).toBeInTheDocument();
});
