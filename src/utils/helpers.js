export const getYoutubeVideoId = (url) => {
  if (!url || typeof url !== 'string') return '';

  if (url.endsWith('/')) {
    url = url.substring(0, url.length - 1);
  }

  const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regex);
  if (match && match[7].length === 11) {
    return match[7];
  }
  return '';
};

export const getYoutubeVideoInfo = async (video_id) => {
  const gootleApiBase = 'https://www.googleapis.com/youtube/v3';
  const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const requestUrl = `${gootleApiBase}/videos?id=${video_id}&key=${youtubeApiKey}&part=snippet`;

  try {
    const resp = await fetch(requestUrl);
    const data = await resp.json();
    if (data && data.error) {
      throw data.error;
    } else {
      return data;
    }
  } catch (error) {
    throw error;
  }
};
