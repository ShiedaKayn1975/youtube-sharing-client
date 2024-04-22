import React, { useCallback } from "react";
import useInput from "../../hooks/useInput";
import { useAuthContext } from "../../provider/Auth";
import { getYoutubeVideoId, getYoutubeVideoInfo } from '../../utils/helpers';
import { img_video_placeholder } from "../../assets/index";
import "./ShareBox.scss";
import { toast } from "react-toastify";
import client from "../../api/server";

const ShareBox = () => {
  const {
    value: url,
    setValue: setUrl,
    handleOnChange: handleSetUrl,
  } = useInput("");
  const { setLoading, setLoadingText } = useAuthContext();

  const handleShare = useCallback(
    async (event) => {
      event.preventDefault();
      const { url } = event.target.elements;

      // Get Youtube video's id
      const video_id = getYoutubeVideoId(url.value.trim());
      if (!video_id) {
        toast.error("Youtube Video's URL is invalid")
        return;
      }

      // Get Youtube video's info
      setLoading(true);
      setLoadingText('Getting the video info...');

      let error = null;
      let title = 'Video title';
      let description = 'Video description';
      let thumbnail = img_video_placeholder;

      try {
        const data = await getYoutubeVideoInfo(video_id);
        if (data && data.items && data.items.length > 0) {
          title = data.items[0].snippet?.title ?? title;
          description = data.items[0].snippet?.description ?? description;
          thumbnail =
            data.items[0].snippet?.thumbnails?.standard?.url ?? thumbnail;
        }
      } catch (err1) {
        console.log('Get videoInfo error:', { err1 });
        error = err1;
      }

      if (!error) {
        setLoadingText('Sharing the video...');
        try {
          await addVideo({ video_id, title, description, thumbnail });
          toast.success('You shared the video successfully')
        } catch (err2) {
          console.log('Add video error:', { err2 });
          error = err2;
        }
      }

      if (error) {
        toast.error(error.message)
      }

      setLoading(false);
      setLoadingText('');
      setUrl('');
    },
    [setLoading, setLoadingText, setUrl]
  );

  const addVideo = async (data) => {
    console.log(data)
    const response = await client.post("/api/v1/video_sharings", {
      video_id: data.video_id,
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail
    })

    return response
  }

  return (
    <div className="sharebox-container">
      <form className="sharebox-form" onSubmit={handleShare}>
        <span className="sharebox-title">Share a Youtube video</span>
        <div className="sharebox-url">
          <label htmlFor="url">Youtube URL:</label>
          <input
            autoFocus
            name="url"
            type="text"
            value={url}
            onChange={handleSetUrl}
          />
        </div>
        <div className="sharebox-submit">
          <input name="submit" type="submit" value="Share" disabled={!url} />
        </div>
      </form>
    </div>
  );
};

export default ShareBox;
