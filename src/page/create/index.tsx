import TextEditor from "@/component/Editor";
import { gql, useMutation } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";
import { useState } from "react";
import { Input } from "@/component/Input/style.ts";
import { GenButton, SummaryGenerator } from "@/page/create/style.ts";

export const CreateEditor = () => {
  const [title, setTitle] = useState("");

  const CREATE_AUDIO = gql`
    mutation createAudio($content: String!, $voice: String!, $title: String!) {
      createAudio(input: { text: $content, voice: $voice, title: $title })
    }
  `;
  const [createAudio, { loading, error, data }] = useMutation(CREATE_AUDIO);

  const handleSave = (story: string) => {
    createAudio({
      variables: { content: story, voice: "", title: title },
    }).catch((e) => console.error("createAudio error:", e));
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
      <SummaryGenerator>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title and author, e.g: Outliers by Malcolm Gladwell"
        />
        <GenButton onClick={() => handleGen(title)}>Generate</GenButton>
      </SummaryGenerator>
      <TextEditor
        onSave={handleSave}
        initialContent={dataSum?.createBookSummary ?? ""}
      />
    </div>
  );
};
