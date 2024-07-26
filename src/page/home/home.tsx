import { DraggableList, DraggableListItem } from "@/component/DraggableList";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";
import AudioPlayer from "@/component/AudioPlayer";

const GET_AUDIOS = gql`
  query getAudios {
    getAudios {
      url
      title
    }
  }
`;

export const Home = () => {
  const [items, setItems] = useState<DraggableListItem[]>([]);

  const { loading, error, data } = useQuery(GET_AUDIOS);

  useEffect(() => {
    if (data) {
      const draggableItems = data.getAudios.map(
        ({ url, title }: { url: string; title: string }) => ({
          key: url,
          content: <AudioPlayer src={url} title={title} />,
        }),
      );
      setItems(draggableItems);
      console.log("items set", draggableItems);
    }
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <ErrorNotification error={error.message} />;

  const handleUpdate = (updatedItems: DraggableListItem[]) => {
    console.log("handleUpdate", updatedItems);
  };

  return (
    <div>
      <DraggableList initialItems={items} onUpdate={handleUpdate} />
    </div>
  );
};
