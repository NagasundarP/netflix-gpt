import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from './GptMovieSuggestion';
import { BG_IMG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute inset-0 -z-10">
        <img
          src={BG_IMG_URL}
          alt="netflix background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </div>
  );
};

export default GptSearch;
