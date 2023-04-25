import React from "react";
import "./YoutubeVideo.css";

// YouTube video component
const YoutubeVideo = ({ videoId }) => {
  // YouTube video URL
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  console.log(videoUrl);

  return (
    <div className="iframeWrapper">
      <iframe
        src={videoUrl}
        // title="YouTube Video"
        // allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        // allowFullScreen
        // // type="text/html"
      />
    </div>
  );
};

export default YoutubeVideo;
