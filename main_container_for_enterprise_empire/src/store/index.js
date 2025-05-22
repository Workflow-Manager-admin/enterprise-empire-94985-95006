import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';

/**
 * Redux store configuration
 */
export const store = configureStore({
  reducer: {
    game: gameReducer
  }
});

export default store;
