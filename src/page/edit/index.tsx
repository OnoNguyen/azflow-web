import { gql, useMutation } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";
import { useState } from "react";
import { Input } from "@/component/Input/style.ts";
import { EditDiv, SaveBtn } from "@/page/create/style.ts";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "@/component/Modal";

export const EditStory = () => {
  const { storyId, encodedTitle } = useParams();
  const navigate = useNavigate();
  const id = parseInt(storyId ?? "-1");
  const initTitle = decodeURIComponent(encodedTitle ?? "");
  const [title, setTitle] = useState(initTitle);
  const [showModal, setShowModal] = useState(false);

  const EDIT_AUDIO = gql`
    mutation editAudio($id: Int!, $title: String!) {
      editAudio(input: { id: $id, title: $title }) {
        id
        title
      }
    }
  `;

  const GET_AUDIOS = gql`
    query getAudiosForMember {
      getAudiosForMember {
        url
        title
        id
      }
    }
  `;

  const [editAudio, { loading, error }] = useMutation(EDIT_AUDIO, {
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

  const handleSave = (title: string) => {
    editAudio({
      variables: { id: id, title: title },
    })
      .then(() => {
        setShowModal(true);
      })
      .catch((e) => console.error("editAudio error:", e));
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/you");
  };

  if (loading) return <Loader />;
  if (error) return <ErrorNotification error={error?.message} />;

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
        />
        <SaveBtn onClick={() => handleSave(title)}>Save</SaveBtn>
      </EditDiv>

      <Modal isOpen={showModal} onClose={handleModalClose} title="Story Edited">
        <p>Your story has been successfully edited.</p>
      </Modal>
    </div>
  );
};
