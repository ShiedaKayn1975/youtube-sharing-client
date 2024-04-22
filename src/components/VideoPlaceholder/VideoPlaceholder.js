import React from 'react';
import { ic_youtube_brands, ic_play_solid_white } from '../../assets/index';
import './VideoPlaceholder.scss';

const VideoPlaceholder = ({ className = '', thumbnail, handleClick }) => {
  return (
    <div className={`placeholder-container ${className}`} onClick={handleClick}>
      <img
        className="video-placeholder"
        src={thumbnail}
        alt="video placeholder"
        width="640"
        height="480"
      />
      <img
        className="btn-play-bg"
        src={ic_youtube_brands}
        alt="button play"
        width="72"
        height="72"
      />
      <img
        className="btn-play"
        src={ic_play_solid_white}
        alt="button play"
        width="24"
        height="24"
      />
    </div>
  );
};

export default VideoPlaceholder;
