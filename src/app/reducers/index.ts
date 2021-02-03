import * as fromCounter from './counter.reducer';
import * as fromErrors from './errors.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as models from '../models';


export interface AppState {
  counter: fromCounter.CounterState;
  errors: fromErrors.ErrorState;
}

export const reducers: ActionReducerMap<AppState> = {
  counter: fromCounter.reducer,
  errors: fromErrors.reducer
};


// Selectors "Dux"

// 1. Feature Selector (if you are in a feature)

// 2. A selector per property on the state (per branch)
function selectCounterBranch(state: AppState): fromCounter.CounterState {
  return state.counter;
}

function selectErrorsBranch(state: AppState): fromErrors.ErrorState {
  return state.errors;
}
// 3. Any helpers you might need
// function selectCountCurrent(state: AppState): number {
//   return state.counter.current;
// }
const selectCountCurrent = createSelector(
  selectCounterBranch,
  c => c.current);
// 4. What the components need

// TODO: We need one that returns the current count for the counter

// export function getCurrentCount(state: AppState): number {
//   return state.counter.current;
// }

export const selectCountBy = createSelector(
  selectCounterBranch,
  b => b.by
);

export const selectGetCurrentCount = createSelector(
  selectCountCurrent,
  c => c
);

// one says if the reset button should be disabled
// export function selectCounterResetDisabled(state: AppState): boolean {
//   return state.counter.current === 0;
// }
export const selectCounterResetDisabled = createSelector(
  selectCountCurrent,
  c => c === 0
);

// one says if the decrement button should be disabled
// export function selectCountDecrementDisabled(state: AppState): boolean {
//   return state.counter.current === 0;
// }
export const selectCountDecrementDisabled = createSelector(
  selectCountCurrent,
  selectCountBy,
  (c, b) => (c - b) < 0
);

export const selectCounterDashboard = createSelector(
  selectCountCurrent,
  selectCountBy,
  (current, by) => ({ by, current } as models.CounterDashboard)
);

export const selectHasError = createSelector(
  selectErrorsBranch,
  b => b.hasError
);

export const selectErrorMessage = createSelector(
  selectErrorsBranch,
  b => b.message
);
