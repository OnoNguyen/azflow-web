import { gql, useMutation } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";
import { useState } from "react";
import { Input } from "@/component/Input/style.ts";
import { EditDiv, SaveBtn } from "@/page/create/style.ts";
import { useParams } from "react-router-dom";

export const EditStory = () => {
  const { storyId, encodedTitle } = useParams();
  const id = parseInt(storyId ?? "-1");
  const initTitle = decodeURIComponent(encodedTitle ?? "");
  const [title, setTitle] = useState(initTitle);

  const EDIT_AUDIO = gql`
    mutation editAudio($id: Int!, $title: String!) {
      editAudio(input: { id: $id, title: $title })
    }
  `;
  const [editAudio, { loading, error, data }] = useMutation(EDIT_AUDIO);

  const handleSave = (title: string) => {
    editAudio({
      variables: { id: id, title: title },
    }).catch((e) => console.error("createAudio error:", e));
  };

  if (loading) return <Loader />;
  if (error) return <ErrorNotification error={error?.message} />;

  if (data)
    return (
      <div>
        <h1>Story Edited</h1>
        <p>{data.ediAudio}</p>
      </div>
    );

  return (
    <div>
      <h1>Edit Story</h1>
      <EditDiv>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <SaveBtn onClick={() => handleSave(title)}>Save</SaveBtn>
      </EditDiv>
    </div>
  );
};
