import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { countBySet } from 'src/app/actions/counter.actions';
import { AppState, selectCountBy } from 'src/app/reducers';


@Component({
  selector: 'app-countby',
  templateUrl: './countby.component.html',
  styleUrls: ['./countby.component.scss']
})
export class CountbyComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  by$: Observable<number>;
  ngOnInit(): void {
    this.by$ = this.store.select(selectCountBy);
  }

  countBy(by: number): void {
    this.store.dispatch(countBySet({ by }));
  }
}
