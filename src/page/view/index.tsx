import { useState } from "react";
import { useParams } from "react-router-dom";
import { ShareBtn } from "./style.ts";
import AudioPlayer from "@/component/AudioPlayer";
import { gql, useMutation } from "@apollo/client";
import Modal from "@/component/Modal";

const SHORT_URL = gql`
  mutation createShortURL($longURL: String!) {
    createShortURL(longURL: $longURL) {
      shortURL
    }
  }
`;

export const ViewStory = () => {
  const { encodedUrl, encodedTitle } = useParams();
  const decodedTitle = decodeURIComponent(encodedTitle ?? "");
  const decodedUrl = decodeURIComponent(encodedUrl ?? "");
  const [shortUrlData, setShortUrlData] = useState<{ shortURL: string }>({
    shortURL: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [createShortURL] = useMutation(SHORT_URL);

  const handleShare = async () => {
    const currentUrl = window.location.href;
    try {
      const { data } = await createShortURL({
        variables: { longURL: currentUrl },
      });
      setShortUrlData(data.createShortURL);
      await navigator.clipboard.writeText(data.createShortURL.shortURL);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to create or copy the short URL: ", err);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <h1>{decodedTitle}</h1>
      <AudioPlayer src={decodedUrl} title={decodedTitle} />
      <ShareBtn onClick={handleShare}>Share</ShareBtn>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Shareable Link Copied To Clipboard"
      >
        <a
          href={shortUrlData.shortURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {shortUrlData.shortURL}
        </a>
      </Modal>
    </div>
  );
};
