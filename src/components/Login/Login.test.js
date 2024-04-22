import { render, cleanup, fireEvent } from '@testing-library/react';
import Login from './Login';

afterEach(cleanup);

test('Login render without crash', () => {
  const result = render(<Login />);
  const container = result.container;
  const elm = container.querySelector('.login-container');
  const inputEmail = container.querySelector('input[type="email"]');
  const inputPassword = container.querySelector('input[type="password"]');
  const inputSubmit = container.querySelector('input[type="submit"]');

  expect(elm).toBeInTheDocument();
  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
  expect(inputSubmit).toBeInTheDocument();
});

test('Button Login/Register disabled when email and password empty', () => {
  const result = render(<Login />);
  const inputSubmit = result.container.querySelector('input[type="submit"]');
  expect(inputSubmit).toBeDisabled();
});

const setUp = () => {
  const result = render(<Login />);
  const container = result.container;
  const inputEmail = container.querySelector('input[type="email"]');
  const inputPassword = container.querySelector('input[type="password"]');
  const inputSubmit = container.querySelector('input[type="submit"]');
  return {
    inputEmail,
    inputPassword,
    inputSubmit,
  };
};

test('Button Login/Register disabled when email empty and password not empty', () => {
  const { inputPassword, inputSubmit } = setUp();
  fireEvent.change(inputPassword, { target: { value: 'test_password' } });
  expect(inputSubmit).toBeDisabled();
});

test('Button Login/Register disabled when email not empty and password empty', () => {
  const { inputEmail, inputSubmit } = setUp();
  fireEvent.change(inputEmail, { target: { value: 'test_email@gmail.com' } });
  expect(inputSubmit).toBeDisabled();
});

test('Button Login/Register enabled when email not empty and password not empty', () => {
  const { inputEmail, inputPassword, inputSubmit } = setUp();
  fireEvent.change(inputEmail, { target: { value: 'test_email@gmail.com' } });
  fireEvent.change(inputPassword, { target: { value: 'test_password' } });
  expect(inputSubmit).not.toBeDisabled();
});
