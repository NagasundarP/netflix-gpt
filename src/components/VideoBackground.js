import { useSelector } from "react-redux";
import useMoviesTrailer from "../hooks/useMoviesTrailer";

const VideoBackground = ({ movieID }) => {
  const trailerStore = useSelector((state) => state.movies?.trailer);
  useMoviesTrailer(movieID);

  return (
    <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
      <iframe
        className="w-full h-full object-cover"
        src={`https://www.youtube.com/embed/${trailerStore?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerStore?.key}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
