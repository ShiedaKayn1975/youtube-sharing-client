import React, { useState, useCallback } from 'react';
import VideoPlaceholder from '../VideoPlaceholder/VideoPlaceholder';

const VideoItem = ({ video }) => {
  console.log(video)
  const [hasLoadIframe, setHasLoadIframe] = useState(false);

  const handleClickPlaceholder = useCallback(() => {
    setHasLoadIframe(true);
  }, []);

  return (
    <div className="video-item">
      {hasLoadIframe ? (
        <div className="video-container">
          <iframe
            title={video.title}
            frameBorder="0"
            loading="lazy"
            allow="autoplay; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
            src={`https://www.youtube.com/embed/${video.video_id}?autoplay=1`}
          />
        </div>
      ) : (
        <VideoPlaceholder
          className="video-placeholder"
          thumbnail={video.thumbnail}
          handleClick={handleClickPlaceholder}
        />
      )}
      <div className="video-info">
        <div className="title">
          <a
            href={`https://www.youtube.com/watch?v=${video.video_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {video.title}
          </a>
        </div>
        <div className="share-vote-wrapper">
          <div className="shared-by" title={video.creator.name}>
            <span className="txt-medium">Shared by:</span> {video.creator.name}
          </div>
        </div>
        <div className="txt-medium">Description:</div>
        <p className="description">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoItem;
