import React from 'react';
import Header from '../../components/Header/Header';
import VideoList from '../../components/VideoList/VideoList';
import './Home.scss';

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <VideoList />
    </div>
  );
};

export default Home;
