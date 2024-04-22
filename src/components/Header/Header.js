import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../provider/Auth';
import Login from '../Login/Login';
import UserAction from '../UserAction/UserAction';
import { PATH_HOME } from '../../utils/constants';
import './Header.scss';
import { useSelector } from 'react-redux';

const Header = () => {
  const currentUser = useSelector(state => state.currentUser)

  return (
    <header className="header-container">
      <h1 className="title">
        <Link className="no-style" to={PATH_HOME}>
          NguyenTA
        </Link>
      </h1>
      {currentUser ? <UserAction email={currentUser.email} /> : <Login />}
    </header>
  );
};

export default Header;
