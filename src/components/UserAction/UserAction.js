import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PATH_SHARE } from '../../utils/constants';
import './UserAction.scss';

const UserAction = ({ email }) => {
  const handleLogout = () => {
    localStorage.removeItem("jwtToken")
    window.location = '/'
  }

  return (
    <div className="user-action-container">
      <span className="txt-welcome">Welcome {email}</span>
      <button
        className="btn-share-video"
        disabled={window.location.pathname === PATH_SHARE}
      >
        {window.location.pathname === PATH_SHARE ? (
          'Share a video'
        ) : (
          <Link to={PATH_SHARE}>Share a video</Link>
        )}
      </button>
      <button className="btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserAction;
