import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectGetCurrentCount, selectCountDecrementDisabled, selectCounterResetDisabled } from 'src/app/reducers';
import * as actions from '../../actions/counter.actions';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  current$: Observable<number>;
  resetDisabled$: Observable<boolean>;
  decrementDisabled$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.current$ = this.store
      .select(selectGetCurrentCount);
    this.resetDisabled$ = this.store.select(selectCounterResetDisabled);
    this.decrementDisabled$ = this.store.select(selectCountDecrementDisabled);
  }

  increment(): void {
    this.store.dispatch(actions.countIncremented());
  }

  decrement(): void {
    this.store.dispatch(actions.countDecremented());
  }

  reset(): void {
    this.store.dispatch(actions.countReset());
  }

}
