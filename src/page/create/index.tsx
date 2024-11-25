import TextEditor from "@/component/Editor";
import { gql, useMutation } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";
import { useEffect, useState } from "react";
import { Input } from "@/component/Input/style.ts";
import { EditDiv } from "@/page/create/style.ts";
import { useNavigate } from "react-router-dom";
import Modal from "@/component/Modal";
import { PrimaryButton, SecondaryButton } from "@/component/BaseStyle.ts";
import { SentenceEditorContainer } from "@/component/Editor/style.ts";

export const CreateStory = () => {
  const [title, setTitle] = useState("");
  const [storyContent, setStoryContent] = useState("");
  const [contentTrunks, setContentTrunks] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const CREATE_META = gql`
    mutation createAudio($content: String!, $voice: String!, $title: String!) {
      createAudio(input: { text: $content, voice: $voice, title: $title }) {
        id
        title
      }
    }
  `;

  const CREATE_AUDIO = gql`
    mutation createAudio($content: String!, $voice: String!, $title: String!) {
      createAudio(input: { text: $content, voice: $voice, title: $title }) {
        id
        title
      }
    }
  `;

  const GET_AUDIOS = gql`
    query getAudios {
      getAudios {
        url
        title
        id
      }
    }
  `;

  const [createMeta, { loading, error }] = useMutation(CREATE_META);

  const handleCreateMeta = (story: string) => {
    createMeta({
      variables: { content: story, voice: "", title: title },
    })
      .then(() => setShowModal(true))
      .catch((e) => console.error("createMeta error:", e));
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/");
  };

  const SUM_BOOK = gql`
    mutation createBookSummary($title: String!) {
      createBookSummary(input: { title: $title })
    }
  `;

  const [sumBook, { loading: loadingSum, error: errorSum, data: dataSum }] =
    useMutation(SUM_BOOK);

  const handleGen = (title: string) => {
    sumBook({
      variables: { title: title },
    }).catch((e) => console.error("summarise book error:", e));
  };

  useEffect(() => {
    setContentTrunks(
      storyContent
        .split(".")
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence !== ""),
    );
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
    <div>
      <h1>Create New Story</h1>
      {
        <EditDiv>
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
          />
        </EditDiv>
      }
      {
        <SentenceEditorContainer>
          {contentTrunks.map((sentence, index) => (
            <div key={sentence}>
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
              />
              <SecondaryButton onClick={() => handleCreateMeta(sentence)}>
                Generate Image
              </SecondaryButton>
            </div>
          ))}
        </SentenceEditorContainer>
      }
    </div>
  );
};
