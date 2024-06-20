import AudioPlayer from "../component/AudioPlayer";
import { gql, useQuery } from "@apollo/client";

export const Home = () => {
  const GET_TRACK = gql`
    query getTrack {
      trackUrl
    }
  `;

  const { loading, error, data } = useQuery(GET_TRACK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <AudioPlayer src={data.trackUrl} />
    </div>
  );
};
