import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((state) => state.movies?.nowPlayingMovies);
  
  if (movies === null) return;
  const mainMovie = movies[0];

  const { original_title, overview, id } = mainMovie;
  return (
    <div>
      <div className="absolute inset-0 flex flex-col justify-center items-center sm:items-start">
        <VideoTitle title={original_title} overview={overview} />
      </div>
      <div className="relative h-screen">
        <VideoBackground movieID={id} />
      </div>
    </div>
  );
};

export default MainContainer;
