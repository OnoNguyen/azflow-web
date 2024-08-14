import { DraggableList, DraggableListItem } from "@/component/DraggableList";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";
import AudioPlayer from "@/component/AudioPlayer";
import { EditBtn, StoryDiv } from "@/page/home/style.ts";
import { useNavigate } from "react-router-dom";

const GET_AUDIOS = gql`
  query getAudios {
    getAudios {
      url
      title
      id
    }
  }
`;

export const Home = () => {
  const [items, setItems] = useState<DraggableListItem[]>([]);

  const { loading, error, data } = useQuery(GET_AUDIOS);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const draggableItems = data.getAudios.map(
        ({ url, title, id }: { url: string; title: string; id: number }) => ({
          key: id,
          content: (
            <StoryDiv>
              <h3>{title}</h3>
              <AudioPlayer src={url} title={title} />
              <EditBtn
                onClick={() =>
                  navigate(`/edit/${id}/${encodeURIComponent(title)}`)
                }
              >
                Edit
              </EditBtn>
            </StoryDiv>
          ),
        }),
      );
      setItems(draggableItems);
    }
  }, [data, navigate]);

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
