import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingTrailer } from "../utils/movieSlice";
import { useEffect } from "react";

const useMoviesTrailer = (movieID) => {
  const dispatch = useDispatch();
  const trailerCheck = useSelector((store) => store.movies.trailer);
  const getMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    const trailer = json.results.filter(
      (video) => video.name === "Official Trailer"
    );
    const trailerVideo = trailer.length ? trailer[0] : json.results[0];
    dispatch(addNowPlayingTrailer(trailerVideo));
  };

  useEffect(() => {
    !trailerCheck && getMovieTrailer();
  }, []);
};

export default useMoviesTrailer;
