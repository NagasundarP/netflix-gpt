import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailer: null,
    popularPlayingMovies: null,
  },
  reducers: {
    addNowPlayingMovie: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addNowPlayingTrailer: (state, action)=>{
      state.trailer = action.payload
    },
    addPopularPlayingMovie: (state, action) => {
      state.popularPlayingMovies = action.payload;
    },
  },
});

export const { addNowPlayingMovie, addNowPlayingTrailer,addPopularPlayingMovie } = movieSlice.actions;
export default movieSlice.reducer;
