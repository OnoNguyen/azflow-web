import TextEditor from "@/component/Editor";
import { gql, useMutation } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";
import { useState } from "react";
import { Input } from "@/component/Input/style.ts";

export const CreateEditor = () => {
  const [title, setTitle] = useState("");

  const CREATE_AUDIO = gql`
    mutation createAudio($content: String!, $voice: String!, $title: String!) {
      createAudio(input: { text: $content, voice: $voice, title: $title })
    }
  `;
  const [createAudio, { loading, error, data }] = useMutation(CREATE_AUDIO);

  const handleSave = (content) => {
    createAudio({
      variables: { content: content, voice: "", title: title },
    }).catch((e) => console.error("createAudio error:", e));
  };

  if (loading) return <Loader />;
  if (error) return <ErrorNotification error={error.message} />;

  if (data)
    return (
      <div>
        <h1>Story Created</h1>
        <p>{data.tts}</p>
      </div>
    );

  return (
    <div>
      <h1>Create New Story</h1>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      />
      <TextEditor onSave={handleSave} />
    </div>
  );
};
