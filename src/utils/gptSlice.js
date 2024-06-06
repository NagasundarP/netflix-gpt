import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovies: null,
    movieName: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResults: (state, action) => {
      const { movieName, movieResults } = action.payload;
      state.gptMovies = movieResults;
      state.movieName = movieName;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResults } = gptSlice.actions;

export default gptSlice.reducer;
