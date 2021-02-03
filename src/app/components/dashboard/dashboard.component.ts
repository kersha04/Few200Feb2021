import { Component, OnInit } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { CounterDashboard, ShoppingDashboard } from 'src/app/models/dashboard';
import { ShoppingDataService } from 'src/app/features/communications/services';
import { map } from 'rxjs/operators';
import { AppState, selectCounterDashboard } from 'src/app/reducers';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stuff$: Observable<ShoppingDashboard>;
  counterStuff$: Observable<CounterDashboard>;
  constructor(private store: Store<AppState>,
    private shoppingService: ShoppingDataService) { }

  ngOnInit(): void {
    this.counterStuff$ = this.store.select(selectCounterDashboard);
    this.stuff$ = this.shoppingService.getObservable()
      .pipe(
        map(items => {
          return {
            totalItems: items.length,
            purchasedItems: items.filter(i => i.purchased === true).length,
            unpurchasedItems: items.filter(i => i.purchased === false).length
          } as ShoppingDashboard;
        })
      );
  }

}
