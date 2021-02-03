import * as fromSongs from './songs.reducer';
import * as models from '../models';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

export const featureName = 'playlistFeature';

export interface PlaylistState {
  songs: fromSongs.SongState;
}

export const reducers: ActionReducerMap<PlaylistState> = {
  songs: fromSongs.reducer
};


const selectFeature = createFeatureSelector<PlaylistState>(featureName);

const selectSongsBranch = createSelector(
  selectFeature,
  f => f.songs
);



// Helpers
const { selectAll: selectSongArray } = fromSongs.adapter.getSelectors(selectSongsBranch);


// crap we needs
export const selectSongListModel = createSelector(
  selectSongArray,
  songs => songs.map(song => {
    return {
      ...song,
      isSaved: !song.id.startsWith('TEMP')
    } as models.SongSummaryModel;
  })
);
