import React, { useRef } from "react";

export type TAudioPlayerProps = {
  src: string;
  type?: "audio/mp3" | "audio/aac";
  title: string;
};

const AudioPlayer: React.FC<TAudioPlayerProps> = ({
  src,
  type = "audio/mp3",
  title,
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
    <div>
      <h3>{title}</h3>
      <audio
        controls
        ref={audioRef}
        onCanPlay={handleCanPlay}
        onCanPlayThrough={handleCanPlayThrough}
        onError={handleError}
        title={title}
      >
        <source src={src} type={type} />
      </audio>
    </div>
  );
};

export default AudioPlayer;
