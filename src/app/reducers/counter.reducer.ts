import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/counter.actions';

export interface CounterState {
  current: number;

}

const initialState: CounterState = {
  current: 0
};

const myReducer = createReducer(
  initialState,
  on(actions.countIncremented, (s) => ({ current: s.current + 1 })),
  on(actions.countDecremented, (s) => ({ current: s.current - 1 })),
  on(actions.countReset, (s) => ({ current: 0 }))
);

// reducer(currentState, action) => newState
export function reducer(state: CounterState = initialState, action: Action): CounterState {
  // this must be pure
  // you can't cahnge the args (state or action)
  // you can only provide a new value, and cannot do side effects here like,
  // calling apis, changing a route, updating data etc.

  return myReducer(state, action);
}

