import { Component, OnInit } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { ShoppingDashboard } from 'src/app/features/communications/components/models/dashboard';
import { ShoppingDataService } from 'src/app/features/communications/services';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stuff$: Observable<ShoppingDashboard>;
  constructor(private shoppingService: ShoppingDataService) { }

  ngOnInit(): void {
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
