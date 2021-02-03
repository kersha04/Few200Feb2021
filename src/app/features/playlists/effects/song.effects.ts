import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../actions/song.actions';
import { PlaylistDataService } from '../services/playlist-data.service';

@Injectable()
export class SongEffects {

  // action.songAdded => songAddedSuccessfully || songAddedFailure
  addSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.songAdded),
      switchMap(originalAction => this.service.addASong(originalAction.payload)
        .pipe(
          map(response => actions.songAddedSuccessfully({
            oldId: originalAction.payload.id,
            payload: response
          }))
        ))
    ));

  loadSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadSongs),
      switchMap(() => this.service.getAll()
        .pipe(
          map(response => actions.loadSongsSucceeded({ payload: response }))
        ))
    ), { dispatch: true });

  constructor(
    private actions$: Actions,
    private service: PlaylistDataService
  ) { }
}
