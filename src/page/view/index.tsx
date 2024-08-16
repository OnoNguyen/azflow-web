import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  CloseBtn,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ShareBtn,
} from "@/page/view/style.ts";
import AudioPlayer from "@/component/AudioPlayer";
import { gql, useMutation } from "@apollo/client"; // Simple function to simulate URL shortening

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
  const [shortUrlData, setShortUrlData] = useState(null);
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

      {showModal && shortUrlData && (
        <Modal onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>Shareable Short Link</h3>
            </ModalHeader>
            <ModalBody>
              <a href={shortUrlData.shortURL} target="_blank">
                {shortUrlData.shortURL}
              </a>
            </ModalBody>
            <ModalFooter>
              <CloseBtn onClick={handleCloseModal}>Close</CloseBtn>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};
