import { SecondaryButton } from "@/component/BaseStyle.ts";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Loader } from "@/component/Loader";

interface IImageGenArea {
  id: number;
  sentence: string;
  setImage: (image: string) => void;
}

export const ImageGenArea = ({ id, sentence, setImage }: IImageGenArea) => {
  const GENERATE_IMAGE = gql`
    mutation generateImage($id: Int!, $content: String!) {
      generateImage(input: { id: $id, prompt: $content })
    }
  `;

  const [generateImage, { loading, data }] = useMutation(GENERATE_IMAGE);

  const [content, setContent] = useState<string>(sentence);

  function handleCreateImage() {
    // call generateImage GQL with given prompt
    generateImage({
      variables: {
        id,
        content,
      },
    })
      .then(() => {
        console.log("generateImage success");
        setImage(
          `${import.meta.env.VITE_API_URL}/video/${id}.png?t=${Date.now()}`,
        );
      })
      .catch((e) => console.error("generateImage error:", e));
  }

  return (
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
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {loading ? (
        <Loader />
      ) : (
        <SecondaryButton onClick={handleCreateImage}>
          Create Image
        </SecondaryButton>
      )}
    </div>
  );
};
