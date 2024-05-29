import MovieCards from "./MovieCards";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl text-white font-bold mb-4">{title}</h1>
      <div className="flex overflow-x-scroll space-x-4">
        {movies?.map((movie) => (
          <MovieCards key={movie.id} posterPath={movie?.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
