import React, { useEffect, useState, useContext } from 'react';
import Loading from '../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfile } from '../actions/profileAction';
import client from '../api/server';
import { subscribeNotificationChannel } from '../service/notification';
import { toast } from 'react-toastify';

export const AuthContext = React.createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const currentUser = useSelector(state => state.currentUser)
  const notifications = useSelector(state => state.notification)
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    if (!currentUser && client.hasToken()) {
      dispatch(loadProfile())
    }
  }, []);

  useEffect(() => {
    if(notifications[0]){
      toast.info(notifications[0].content)
    }
  }, [notifications])

  useEffect(() => {
    if(currentUser){
      subscribeNotificationChannel(currentUser.id, dispatch)
    }
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ setLoading, setLoadingText }}>
      {children}
      {loading && <Loading description={loadingText} />}
    </AuthContext.Provider>
  );
};
