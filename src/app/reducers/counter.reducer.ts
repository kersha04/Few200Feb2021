import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/counter.actions';

export interface CounterState {
  current: number;
  by: number;
}

const initialState: CounterState = {
  current: 0,
  by: 1
};
// ... leave the rest how it is, but update blah
const myReducer = createReducer(
  initialState,
  on(actions.countIncremented, (s) => ({ ...s, current: s.current + s.by })),
  on(actions.countDecremented, (s) => ({ ...s, current: s.current - s.by })),
  on(actions.countReset, () => initialState),
  on(actions.countBySet, (s, a) => ({ ...s, by: a.by })),
);


// reducer(currentState, action) => newState
export function reducer(state: CounterState = initialState, action: Action): CounterState {
  // this must be pure
  // you can't cahnge the args (state or action)
  // you can only provide a new value, and cannot do side effects here like,
  // calling apis, changing a route, updating data etc.

  return myReducer(state, action);
}

