import { useParams } from "react-router-dom";
import { ShareBtn } from "@/page/view/style.ts";
import AudioPlayer from "@/component/AudioPlayer";

export const ViewStory = () => {
  const { encodedUrl, encodedTitle } = useParams();
  const decodedTitle = decodeURIComponent(encodedTitle ?? "");
  const decodedUrl = decodeURIComponent(encodedUrl ?? "");

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(
      () => {
        alert("Shareable URL copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy the URL: ", err);
      },
    );
  };

  return (
    <div>
      <h1>{decodedTitle}</h1>
      <AudioPlayer src={decodedUrl} title={decodedTitle} />
      <ShareBtn onClick={handleShare}>Share</ShareBtn>
    </div>
  );
};
