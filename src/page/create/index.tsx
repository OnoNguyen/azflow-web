import { useEffect, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";
import { Input } from "@/component/Input/style.ts";
import { EditDiv } from "@/page/create/style.ts";
import { useNavigate } from "react-router-dom";
import Modal from "@/component/Modal";
import { PrimaryButton, SecondaryButton } from "@/component/BaseStyle.ts";
import { SentenceEditorContainer } from "@/component/Editor/style.ts";
import TextEditor from "@/component/Editor";

export const CreateStory = () => {
  const [title, setTitle] = useState("");
  const [storyContent, setStoryContent] = useState("");
  const [contentTrunks, setContentTrunks] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const editDivRef = useRef<HTMLDivElement>(null); // Reference for <EditDiv>
  const [blink, setBlink] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);

  const CREATE_VIDEO_PREVIEW = gql`
    mutation createVideoPreview($images: [String!], $contentTrunks: [String!]) {
      createVideoPreview(
        input: { images: $images, contentTrunks: $contentTrunks }
      )
    }
  `;

  const CREATE_META = gql`
    mutation createAudio($content: String!, $voice: String!, $title: String!) {
      createAudio(input: { text: $content, voice: $voice, title: $title }) {
        id
        title
      }
    }
  `;

  const SUM_BOOK = gql`
    mutation createBookSummary($title: String!) {
      createBookSummary(input: { title: $title })
    }
  `;

  const [createMeta, { loading, error }] = useMutation(CREATE_META);
  const [sumBook, { loading: loadingSum, error: errorSum, data: dataSum }] =
    useMutation(SUM_BOOK);
  const [
    createVideoPreview,
    { loading: loadingPreview, error: errorPreview, data: dataPreview },
  ] = useMutation(CREATE_VIDEO_PREVIEW);

  const handleCreateVideoPreview = () => {
    createVideoPreview({
      variables: { images: [], contentTrunks: contentTrunks },
    }).catch((e) => console.error("createPreview error:", e));
  };

  const handleSuggestImage = (story: string) => {
    createMeta({
      variables: { content: story, voice: "", title: title },
    })
      .then(() => setShowModal(true))
      .catch((e) => console.error("createMeta error:", e));
  };

  const handleGen = (title: string) => {
    sumBook({
      variables: { title: title },
    }).catch((e) => console.error("summarise book error:", e));
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleTextAreaClick = () => {
    // Scroll to the EditDiv container
    if (editDivRef.current) {
      editDivRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Blink the EditDiv container
    setBlink(true);
    setTimeout(() => {
      setBlink(false);
    }, 500);
  };

  useEffect(() => {
    setContentTrunks(
      storyContent
        .split(".")
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence !== ""),
    );
    setPreviewReady(false);
  }, [storyContent]);

  if (loading || loadingSum) return <Loader />;
  if (error || errorSum)
    return <ErrorNotification error={error?.message || errorSum?.message} />;

  if (showModal)
    return (
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Story Created"
      >
        <p>Your story has been successfully created.</p>
      </Modal>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Create New Story</h1>
      {
        <EditDiv ref={editDivRef}>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title and author, e.g: Outliers by Malcolm Gladwell"
          />
          <PrimaryButton onClick={() => handleGen(title)}>
            Generate
          </PrimaryButton>
        </EditDiv>
      }
      {
        <EditDiv>
          <TextEditor
            initialContent={dataSum?.createBookSummary || ""}
            onContentChange={setStoryContent}
            blinkIt={blink}
          />
        </EditDiv>
      }
      {
        // video preview div
        <div style={{ display: "flex", justifyContent: "center" }}>
          {previewReady ? (
            <video controls>
              <source src={dataPreview?.createVideoPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <PrimaryButton
              onClick={() => {
                handleCreateVideoPreview();
                setPreviewReady(true);
              }}
              disabled={contentTrunks.length === 0}
            >
              Preview
            </PrimaryButton>
          )}
        </div>
      }
      {
        <SentenceEditorContainer>
          {contentTrunks.map((sentence, index) => (
            <div
              key={sentence}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                minWidth: "340px",
                display: "flex",
                flexDirection: "column",
                gap: "0.5em",
              }}
            >
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="https://via.placeholder.com/300" alt="Image" />
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <textarea
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "5px",
                    width: "100%",
                    resize: "none",
                  }}
                  value={sentence}
                />

                <SecondaryButton onClick={() => handleSuggestImage(sentence)}>
                  Refine
                </SecondaryButton>
              </div>
            </div>
          ))}
        </SentenceEditorContainer>
      }
    </div>
  );
};
