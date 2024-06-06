import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailer: null,
    popularPlayingMovies: null,
    topRatedMovies: null,
    upComingMovies: null,
  },
  reducers: {
    addNowPlayingMovie: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addNowPlayingTrailer: (state, action) => {
      state.trailer = action.payload;
    },
    addPopularPlayingMovie: (state, action) => {
      state.popularPlayingMovies = action.payload;
    },
    addTopRatedMovie: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingdMovie: (state, action) => {
      state.upComingMovies = action.payload;
    },
  },
});

export const {
  addNowPlayingMovie,
  addNowPlayingTrailer,
  addPopularPlayingMovie,
  addTopRatedMovie,
  addUpcomingdMovie,
} = movieSlice.actions;
export default movieSlice.reducer;
