import React from 'react'
import YouTube from "react-youtube";



const Youtube = (props) => {
	const { videoId } = props;
	const opts = {
    height: "400px",
    width: "100%",
    playerVars: {
      autoplay: 0
    }
	};
		
	const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
	}
	
	return (
    <div>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={_onReady}
        autoplay={false}
      />
    </div>
  );
}

export default Youtube;
