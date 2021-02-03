import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/song.actions';

export interface SongEntity {
  // the thing you keep a list of in memory. looks just like the model. recreate it, don't just use it

  id: string;
  title: string;
  artist: string;
  album?: string;
}

export interface SongState extends EntityState<SongEntity> {

}

export const adapter = createEntityAdapter<SongEntity>();

// const initialState = adapter.getInitialState();
// start with some const data

// const initialState: SongState = {
//   ids: ['a', 'b'],
//   entities: {
//     a: { id: 'a', title: 'Bring Noize', artist: 'Pubic Enemy' },
//     b: { id: 'b', title: 'C.R.E.A.M', artist: 'Wu-Tang', album: 'Enter the Wootie-Tang' }
//   }
// };

const initialState: SongState = {
  ids: ['a', 'b'],
  entities: {
    a: { id: 'a', title: 'Bring Noize', artist: 'Pubic Enemy' },
    b: { id: 'b', title: 'C.R.E.A.M', artist: 'Wu-Tang', album: 'Enter the Wootie-Tang' }
  }
};

const reducerFunction = createReducer(
  initialState,
  on(actions.songAdded, (s, a) => adapter.addOne(a.payload, s))
);

export function reducer(state: SongState = initialState, action: Action): SongState {
  return reducerFunction(state, action);
}



