import React, { useRef } from "react";

export type TAudioPlayerProps = {
  src: string;
  type?: "audio/mp3" | "audio/aac";
};

const AudioPlayer: React.FC<TAudioPlayerProps> = ({
  src,
  type = "audio/mp3",
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleCanPlay = () => {
    console.log("Audio can play");
  };

  const handleCanPlayThrough = () => {
    console.log("Audio can play through");
  };

  const handleError = () => {
    console.error("Error occurred while loading audio");
  };

  return (
    <audio
      controls
      ref={audioRef}
      onCanPlay={handleCanPlay}
      onCanPlayThrough={handleCanPlayThrough}
      onError={handleError}
    >
      <source src={src} type={type} />
    </audio>
  );
};

export default AudioPlayer;
