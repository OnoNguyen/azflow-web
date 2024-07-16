import TextEditor from "@/component/Editor";
import { gql, useMutation } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";

export const CreateEditor = () => {
  const CREATE_AUDIO = gql`
    mutation createAudio($content: String!, $voice: String!) {
      createAudio(input: { text: $content, voice: $voice })
    }
  `;
  const [createAudio, { loading, error, data }] = useMutation(CREATE_AUDIO);

  const handleSave = (content) => {
    createAudio({ variables: { content: content, voice: "" } }).catch((e) =>
      console.error("createAudio error:", e),
    );
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
      <TextEditor onSave={handleSave} />
    </div>
  );
};
