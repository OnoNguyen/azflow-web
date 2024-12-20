import { useEffect, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { Input } from "@/component/Input/style.ts";
import { EditDiv } from "@/page/create/style.ts";
import { useNavigate } from "react-router-dom";
import Modal from "@/component/Modal";
import { PrimaryButton } from "@/component/BaseStyle.ts";
import { SentenceEditorContainer } from "@/component/Editor/style.ts";
import TextEditor from "@/component/Editor";
import { ImageArea } from "@/page/create/imageArea.tsx";
import { AudioArea } from "@/page/create/audioArea.tsx";
import { ImageGenArea } from "@/page/create/imageGenArea.tsx";

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

  const CREATE_AUDIO_TRUNK = gql`
    mutation createAudioTrunk($text: String!, $voice: String!, $id: Int!) {
      createAudioTrunk(input: { text: $text, voice: $voice, id: $id })
    }
  `;

  const SUM_BOOK = gql`
    mutation createBookSummary($title: String!) {
      createBookSummary(input: { title: $title })
    }
  `;

  const [
    createAudioTrunk,
    {
      loading: loadingAudioTrunk,
      error: errorAudioTrunk,
      data: dataAudioTrunk,
    },
  ] = useMutation(CREATE_AUDIO_TRUNK);

  const [sumBook, { loading: loadingSum, error: errorSum, data: dataSum }] =
    useMutation(SUM_BOOK);

  const [
    createVideoPreview,
    { loading: loadingPreview, error: errorPreview, data: dataPreview },
  ] = useMutation(CREATE_VIDEO_PREVIEW);

  const handleCreateAudioTrunk = (text: string, id: number) => {
    createAudioTrunk({
      variables: { text: text, voice: "", id: id },
    }).catch((e) => console.error("createAudioTrunk error:", e));
  };

  const handleCreateVideoPreview = () => {
    createVideoPreview({
      variables: { images: [], contentTrunks: contentTrunks },
    }).catch((e) => console.error("createPreview error:", e));
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
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
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
        // size the video to fit Iphone 15 Pro screen size
        // 430 x 932
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {previewReady && dataPreview ? (
            <video controls style={{ maxWidth: "430px", maxHeight: "920px" }}>
              <source src={dataPreview.createVideoPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : loadingPreview ? (
            <Loader />
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
          {contentTrunks.map((sentence, id) => (
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
              {/* Audio Area */}
              <AudioArea
                sentence={sentence}
                id={id}
                handleCreateAudioTrunk={handleCreateAudioTrunk}
                handleTextAreaClick={handleTextAreaClick}
                loadingAudioTrunk={loadingAudioTrunk}
              />

              {/* Image Area */}
              <ImageArea id={id} />

              {/* Image Generation Area */}
              <ImageGenArea sentence={sentence} />
            </div>
          ))}
        </SentenceEditorContainer>
      }
    </div>
  );
};
