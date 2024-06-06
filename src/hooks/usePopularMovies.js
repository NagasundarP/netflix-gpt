import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularPlayingMovie } from "../utils/movieSlice";
import { useEffect } from "react";

const usePopularPlayingMovies = () => {
  const dispatch = useDispatch();

  const popularPlayingMovies = useSelector(
    (store) => store.movies.popularPlayingMovies
  );

  const getPopularPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularPlayingMovie(json.results));
  };

  useEffect(() => {
    if (!popularPlayingMovies) getPopularPlayingMovies();
  }, []);
};

export default usePopularPlayingMovies;
