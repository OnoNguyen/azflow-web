import AudioPlayer from "@/component/AudioPlayer";
import { Loader } from "@/component/Loader";
import { SecondaryButton } from "@/component/BaseStyle.ts";

export interface IAudioArea {
  sentence: string;
  id: number;
  handleCreateAudioTrunk: (sentence: string, id: number) => void;
  handleTextAreaClick: () => void;
  loadingAudioTrunk: boolean;
}

export const AudioArea = ({
  sentence,
  id,
  handleCreateAudioTrunk,
  handleTextAreaClick,
  loadingAudioTrunk,
}: IAudioArea) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AudioPlayer
        title={""}
        src={`${import.meta.env.VITE_API_URL}/video/${id}.mp3?t=${Date.now()}`}
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <textarea
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            resize: "none",
          }}
          value={sentence}
          readOnly
          onClick={() => handleTextAreaClick()} // Attach the click handler
        />
        {loadingAudioTrunk ? (
          <Loader />
        ) : (
          <SecondaryButton onClick={() => handleCreateAudioTrunk(sentence, id)}>
            Create Audio
          </SecondaryButton>
        )}
      </div>
    </div>
  );
};
