import TextEditor from "@/component/Editor";
import { gql, useMutation } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";
import { useState } from "react";
import { Input } from "@/component/Input/style.ts";
import { EditDiv, SaveBtn } from "@/page/create/style.ts";
import { useNavigate } from "react-router-dom";
import Modal from "@/component/Modal";

export const CreateStory = () => {
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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

  const [createAudio, { loading, error }] = useMutation(CREATE_AUDIO, {
    refetchQueries: [{ query: GET_AUDIOS }],
    update(cache, { data: { createAudio } }) {
      cache.modify({
        fields: {
          audios(existingAudios = []) {
            const newAudioRef = cache.writeFragment({
              data: createAudio,
              fragment: gql`
                fragment NewAudio on Audio {
                  id
                  title
                }
              `,
            });
            return [...existingAudios, newAudioRef];
          },
        },
      });
    },
  });

  const handleSave = (story: string) => {
    createAudio({
      variables: { content: story, voice: "", title: title },
    })
      .then(() => setShowModal(true))
      .catch((e) => console.error("createAudio error:", e));
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
          <SaveBtn onClick={() => handleGen(title)}>Generate</SaveBtn>
        </EditDiv>
      }
      {dataSum?.createBookSummary && (
        <TextEditor
          onSave={handleSave}
          initialContent={dataSum?.createBookSummary}
        />
      )}
    </div>
  );
};
