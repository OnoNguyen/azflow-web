import { DraggableList, DraggableListItem } from "@/component/DraggableList";
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";
import AudioPlayer from "@/component/AudioPlayer";

const GET_AUDIOS = gql`
  mutation getAudioUrls {
    audioUrls
  }
`;

export const Home = () => {
  const [items, setItems] = useState<DraggableListItem[]>([]);

  const [audioUrls, { loading, error, data }] = useMutation(GET_AUDIOS);

  useEffect(() => {
    audioUrls().catch((e) => console.error("audioUrls error:", e));
  }, [audioUrls]);

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
