// describe application state
import * as fromCounter from './counter.reducer';

export interface AppState {

  counter: fromCounter.CounterState;

}

// an empty js object
export const reducers = {
  counter: fromCounter.reducer
};
