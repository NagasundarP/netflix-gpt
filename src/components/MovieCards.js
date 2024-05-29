import { IMG_CDN_URL } from "../utils/constants";

const MovieCards = ({ posterPath }) => {
  return (
    <div className="flex-shrink-0 w-32 sm:w-48">
      <img 
        src={`${IMG_CDN_URL}/${posterPath}`} 
        alt="Movie Poster" 
        className="w-full h-auto rounded-lg"
      />
    </div>
  );
};

export default MovieCards;
