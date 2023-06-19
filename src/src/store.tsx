import { newsReducer } from './reducer/newsReducer';
import { createStore } from 'redux';

export const store = createStore( newsReducer );