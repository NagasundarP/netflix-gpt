import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstans";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langOpt = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const handleGptSearch = async () => {
    // const gptQuery =
    //   "Act as a movie recommendation system and give movies for the query" +
    //   searchText.current.value +
    //   ". only give me top 5 movies, by comma separated like in the example given ahead. Example Result: Gadar, Don, Sholay, Golmaal, Koi Mil Gaya";
    // const searchResult = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        searchText.current.value +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    dispatch(
      addGptMovieResults({
        movieName: searchText.current.value,
        movieResults: json.results,
      })
    );
  };

  return (
    <form
      className="w-full max-w-md p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={searchText}
        className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
        placeholder={lang[langOpt].gptSearchPlaceholder}
        type="text"
      ></input>
      <button
        type="submit"
        className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={handleGptSearch}
      >
        {lang[langOpt].search}
      </button>
    </form>
  );
};

export default GptSearchBar;
