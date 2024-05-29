import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularPlayingMovie } from "../utils/movieSlice";
import { useEffect } from "react";

const usePopularPlayingMovies = ()=>{
    const dispatch = useDispatch();

    const getPopularPlayingMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular",
        API_OPTIONS
      );
      const json = await data.json();
      console.log(json.results);
      dispatch(addPopularPlayingMovie(json.results))
    };
  
    useEffect(() => {
        getPopularPlayingMovies();
    }, []);
}

export default usePopularPlayingMovies;