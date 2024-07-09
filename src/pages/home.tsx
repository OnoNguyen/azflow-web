import { DraggableList, DraggableListItem } from "@/component/DraggableList";
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";
import { useAuth } from "@/auth/useAuth.tsx";
import AudioPlayer from "@/component/AudioPlayer";

const GET_AUDIOS = gql`
  mutation getAudiokUrls($userId: String!) {
    audioUrls(input: { userId: $userId })
  }
`;

export const Home = () => {
  const [items, setItems] = useState<DraggableListItem[]>([]);
  const { currentUser } = useAuth();

  const [audiokUrls, { loading, error, data }] = useMutation(GET_AUDIOS);

  useEffect(() => {
    const userId = currentUser?.localAccountId ?? "";
    audiokUrls({ variables: { userId: userId } }).catch((e) =>
      console.error(e),
    );
  }, [currentUser, audiokUrls]);

  useEffect(() => {
    if (data) {
      const draggableItems = data.audioUrls.map((url: string) => ({
        key: url,
        content: <AudioPlayer src={url} />,
      }));
      setItems(draggableItems);
      console.log("items set", draggableItems);
    }
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <ErrorNotification />;

  const handleUpdate = (updatedItems: DraggableListItem[]) => {
    console.log("handleUpdate", updatedItems);
  };

  return (
    <div>
      <DraggableList initialItems={items} onUpdate={handleUpdate} />
    </div>
  );
};
