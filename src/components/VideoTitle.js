const VideoTitle = ({ title, overview }) => {
  return (
    <div className="relative z-10 pt-[20%] px-4 sm:pt-36 sm:px-12 text-white text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
      <p className="py-4 sm:py-6 text-lg sm:text-xl w-full sm:w-1/2 lg:w-1/3 mx-auto sm:mx-0">
        {overview}
      </p>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-start">
        <button className="bg-white text-black p-4 text-lg sm:text-xl rounded-lg mb-2 sm:mb-0 sm:mr-2 ">
          ▶️ Play
        </button>
        <button className="bg-gray-500 text-white p-4 text-lg sm:text-xl bg-opacity-50 rounded-lg">
          More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
