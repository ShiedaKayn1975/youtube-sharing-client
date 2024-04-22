import React, { useEffect, useCallback, useState, useRef } from 'react';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import VideoItem from './VideoItem';
import { useAuthContext } from '../../provider/Auth';
// import { getvideos } from '../../firebase/firebaseStore';
// import { addNotiError, addNotiSuccess } from '../../utils/notification';
import './VideoList.scss';
import client from '../../api/server';

const FETCH_LIMIT = 4;

const VideoList = () => {
  const { setLoading, setLoadingText } = useAuthContext();
  const [videos, setVideos] = useState([]);
  const needFetch = useRef(true);

  const handleGetVideos = () => {
    client.get("/api/v1/video_sharings").then(
      (response) => {
        setVideos(response.data.data)
      }
    )
  }

  const handleLoadMore = useCallback(async () => {
    needFetch.current = true;
    handleGetVideos();
  }, [handleGetVideos]);

  useEffect(() => {
    if (needFetch.current) {
      needFetch.current = false;
      handleGetVideos();
    }
  }, [handleGetVideos, needFetch]);

  return (
    <div className="video-list-container">
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
      <div className="btn-loadmore-wrapper">
        <button className="btn-loadmore" onClick={handleLoadMore}>
          Load more
        </button>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default VideoList;
