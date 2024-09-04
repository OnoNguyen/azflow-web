import { DraggableList, DraggableListItem } from "@/component/DraggableList";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Loader } from "@/component/Loader";
import { ErrorNotification } from "@/component/Error";
import AudioPlayer from "@/component/AudioPlayer";
import { EditBtn, StoryDiv, ViewBtn } from "@/page/home/style.ts";
import { useNavigate } from "react-router-dom";

const GET_AUDIOS = gql`
  query getAudiosForMember {
    getAudiosForMember {
      url
      title
      id
    }
  }
`;

export const You = () => {
  const [items, setItems] = useState<DraggableListItem[]>([]);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(
    null,
  );

  const { loading, error, data } = useQuery(GET_AUDIOS);

  const navigate = useNavigate();

  useEffect(() => {
    const handlePlayNext = (currentIndex: number) => {
      const nextIndex = currentIndex + 1;
      if (nextIndex < items.length) {
        setCurrentPlayingIndex(nextIndex);
      }
    };

    if (data) {
      const draggableItems = data.getAudiosForMember.map(
        (
          { url, title, id }: { url: string; title: string; id: number },
          index: number,
        ) => ({
          key: id.toString(),
          content: (
            <StoryDiv>
              <h3>{title}</h3>
              <AudioPlayer
                src={url}
                title={title}
                autoPlay={index === currentPlayingIndex} // Autoplay the current item
                onEnded={() => handlePlayNext(index)} // Play next when current item ends
              />
              <div style={{ display: "flex", gap: "0.5em" }}>
                <EditBtn
                  onClick={() =>
                    navigate(`/edit/${id}/${encodeURIComponent(title)}`)
                  }
                >
                  Edit
                </EditBtn>
                <ViewBtn
                  onClick={() =>
                    navigate(
                      `/view/${encodeURIComponent(url)}/${encodeURIComponent(title)}`,
                    )
                  }
                >
                  View
                </ViewBtn>
              </div>
            </StoryDiv>
          ),
        }),
      );
      setItems(draggableItems);
    }
  }, [data, navigate, currentPlayingIndex, items.length]);

  if (loading) return <Loader />;
  if (error) return <ErrorNotification error={error.message} />;

  const handleUpdate = (updatedItems: DraggableListItem[]) => {
    setItems(updatedItems);
  };

  return (
    <div>
      <DraggableList initialItems={items} onUpdate={handleUpdate} />
    </div>
  );
};
