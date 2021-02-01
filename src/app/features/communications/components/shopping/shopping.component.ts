import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingListItem } from '../../models';
import { ShoppingDataService } from '../../services';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})

export class ShoppingComponent implements OnInit {

  labelForList = 'Buy this crap';
  sirOrMadam = 'Sir';

  stuff$: Observable<ShoppingListItem[]>;


  constructor(private shoppingService: ShoppingDataService) { }

  ngOnInit(): void {
    this.stuff$ = this.shoppingService.getObservable();
  }
  onItemAdded(item: string): void {
    this.shoppingService.addItem(item);
  }

}
