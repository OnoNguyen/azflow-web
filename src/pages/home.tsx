// import { gql } from "@apollo/client";
//

import { DraggableList } from "@/component/DraggableList";
import AudioPlayer from "@/component/AudioPlayer";

export const Home = () => {
  // const GET_TRACK = gql`
  //   query getTrack {
  //     trackUrl
  //   }
  // `;
  //
  // const { loading, error, data } = useQuery(GET_TRACK);
  //
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  const items = [
    <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />,
    <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" />,
    <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" />,
  ];

  const simpleItems = [<div>Item 1</div>, <div>Item 2</div>, <div>Item 3</div>];

  return (
    <div>
      <DraggableList items={items} />
      <DraggableList items={simpleItems} />
    </div>
  );
};
