import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const gpt = useSelector((store) => store.gpt);
  const { gptMovies, movieName } = gpt;

  if (!movieName) return null;

  return (
    <div className="flex flex-col items-center w-full px-4">
      <div className="p-4 bg-black text-white w-full sm:w-11/12 max-w-2xl rounded-lg text-center">
        <h2 className="text-xl sm:text-2xl font-semibold">{`Results for "${movieName}"`}</h2>
      </div>
      <div className="mt-4 w-full sm:w-11/12 max-w-2xl">
        <MovieList title={movieName} movies={gptMovies} />
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
