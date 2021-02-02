import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, filter } from 'rxjs/operators';
import * as actions from '../actions/counter.actions';
import * as appActions from '../actions/app.actions';

@Injectable() // if service takes a constructor, the whole class needs this
export class CounterEffects {
  // when we get an applicationStarted
  // check localStorage for 'by'
  // if there, turn it into a actions.countBySet(by)
  // otherwise, don't do a thing

  // checkCountBy$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(actions.applicationStarted,
  //     tap
  //   )

  // ))

  readSavedCounstBy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => localStorage.getItem('by')),
      filter(by => by !== null), // stop here if null. Nothing was saved
      map(by => parseInt(by, 10)), // otherwise get what was saved, and parse it into a base 10 number
      map(by => actions.countBySet({ by })) // what comes our here is sent to the reducer
    ), { dispatch: true });



  // this on its own would crash chrome
  // tap, unlike map, whatever goes into tap comes out. map you get/modify stuff and output it
  // logItAll$ = createEffect(() =>
  //   this.actions$.pipe(
  //     tap(a => console.log(`Got an action of type ${a.type}`))
  //   ), { dispatch: false } // this keeps it from sending it back as another action and endless looping
  // );
  // actions.countBySet => doStuffBeforeYouDie => save it. => done!

  saveCountBy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.countBySet),
      tap(a => localStorage.setItem('by', a.by.toString()))
    ), { dispatch: false });

  constructor(private actions$: Actions) { }
}
