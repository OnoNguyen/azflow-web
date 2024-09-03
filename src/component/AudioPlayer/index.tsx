import React, { useEffect, useRef } from "react";

type AudioPlayerProps = {
  src: string;
  type?: "audio/mp3" | "audio/aac";
  title: string;
  autoPlay?: boolean;
  onEnded?: () => void;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  autoPlay,
  onEnded,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play();
    }
  }, [autoPlay]);

  return (
    <audio ref={audioRef} controls src={src} onEnded={onEnded}>
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
