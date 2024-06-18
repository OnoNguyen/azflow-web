import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { StyledVideo, VideoContainer } from "./style.ts";

const HlsMediaPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      // First check for native browser HLS support
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc;
      } else if (Hls.isSupported()) {
        // If no native HLS support, use HLS.js
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
      }
    }
  }, [videoSrc]);

  return (
    <VideoContainer>
      <StyledVideo ref={videoRef} controls />
    </VideoContainer>
  );
};

export default HlsMediaPlayer;
