import React from "react";
import YouTube from "react-youtube";

const Youtube = (props) => {
  const { videoId, height } = props;
  const opts = {
    height,
    width: "100%",
    height: 300,
    playerVars: {
      autoplay: 0,
    },
  };

  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const _onError = (event) => {
    console.error("Youtube player error:", event);
  };

  // For clean behaviour without errors
  const _onStateChange = (event) => {
    return;
  };
  const _onPlaybackQualityChange = (event) => {
    return;
  };
  const _onPlay = (event) => {
    return;
  };
  const _onPause = (event) => {
    return;
  };

  return (
    <div style={{ width: "100%" }}>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={_onReady}
        onPlay={_onPlay}
        onPause={_onPause}
        autoplay={false}
        onStateChange={_onStateChange}
        onPlaybackQualityChange={_onPlaybackQualityChange}
      />
    </div>
  );
};

YouTube.defaultProps = {
  height: "600px",
};

export default Youtube;
