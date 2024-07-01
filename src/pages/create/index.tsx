import TextEditor from "@/component/Editor";
import { gql, useMutation } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";
import { useMsal } from "@azure/msal-react";

export const CreateEditor = () => {
  const TTS = gql`
    mutation tts($content: String!, $voice: String!, $userId: String!) {
      tts(input: { text: $content, voice: $voice, userId: $userId })
    }
  `;
  const [tts, { loading, error, data }] = useMutation(TTS);
  const { accounts } = useMsal();
  const currentUser = accounts[0];

  const handleSave = (content) => {
    const userId = currentUser.localAccountId;

    tts({ variables: { content: content, voice: "", userId: userId } }).catch(
      (e) => console.error("tts error:", e),
    );
  };

  if (loading) return <Loader />;
  if (error) return <ErrorNotification />;

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
