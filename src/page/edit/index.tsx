import { gql, useMutation, useQuery } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";
import { useEffect, useState } from "react";
import { Input } from "@/component/Input/style.ts";
import { EditDiv, SaveBtn } from "@/page/create/style.ts";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "@/component/Modal";

const GET_AUDIO = gql`
  query getAudio($id: Int!) {
    getAudio(id: $id) {
      id
      title
      transcriptUrl
    }
  }
`;

const EDIT_AUDIO = gql`
  mutation editAudio($id: Int!, $title: String!, $transcript: String!) {
    editAudio(input: { id: $id, title: $title, transcript: $transcript }) {
      id
      title
    }
  }
`;

const GET_AUDIOS = gql`
  query getAudiosForMember {
    getAudiosForMember {
      url
      transcriptUrl
      title
      id
    }
  }
`;

export const EditStory = () => {
  const { storyId, encodedTitle } = useParams();
  const navigate = useNavigate();
  const id = parseInt(storyId ?? "-1");
  const initTitle = decodeURIComponent(encodedTitle ?? "");
  const [title, setTitle] = useState(initTitle);
  const [transcript, setTranscript] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    loading: queryLoading,
    error: queryError,
    data,
  } = useQuery(GET_AUDIO, {
    variables: { id },
    fetchPolicy: "cache-first",
  });

  const [editAudio, { loading: mutationLoading, error: mutationError }] =
    useMutation(EDIT_AUDIO, {
      refetchQueries: [{ query: GET_AUDIOS }],
      update(cache, { data: { editAudio } }) {
        cache.modify({
          fields: {
            audios(existingAudios = []) {
              const newAudioRef = cache.writeFragment({
                data: editAudio,
                fragment: gql`
                  fragment NewAudio on Audio {
                    id
                    title
                  }
                `,
              });
              return existingAudios.map((audioRef: any) =>
                audioRef.__ref === `Audio:${id}` ? newAudioRef : audioRef,
              );
            },
          },
        });
      },
    });

  useEffect(() => {
    if (data && data.getAudio) {
      setTitle(data.getAudio.title);

      if (data.getAudio.transcriptUrl) {
        fetch(data.getAudio.transcriptUrl)
          .then((response) => response.text())
          .then((text) => setTranscript(text))
          .catch((error) => {
            console.error("Error fetching transcript:", error);
          });
      }
    }
  }, [data]);

  const handleSave = (title: string, transcript: string) => {
    editAudio({
      variables: { id: id, title: title, transcript: transcript },
    })
      .then(() => setShowModal(true))
      .catch((e) => console.error("editAudio error:", e));
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/you");
  };

  if (queryLoading || mutationLoading) return <Loader />;
  if (queryError) return <ErrorNotification error={queryError.message} />;
  if (mutationError) return <ErrorNotification error={mutationError.message} />;

  return (
    <div>
      <h1>Edit Story</h1>
      <EditDiv>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          style={{
            border: "1px solid #ccc",
            minHeight: "300px",
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            resize: "none",
          }}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
        <SaveBtn onClick={() => handleSave(title, transcript)}>Save</SaveBtn>
      </EditDiv>

      <Modal isOpen={showModal} onClose={handleModalClose} title="Story Edited">
        <p>Your story has been successfully edited.</p>
      </Modal>
    </div>
  );
};
