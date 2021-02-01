import { ShoppingListItem } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';

export class ShoppingDataService {

  private fakeData: ShoppingListItem[] = [
    { id: '1', description: 'Ice Cream Cones', purchased: false },
    { id: '2', description: 'Shoe Polish', purchased: true }
  ];
  private maxId = 3;

  private subject = new BehaviorSubject<ShoppingListItem[]>(this.fakeData);

  getObservable(): Observable<ShoppingListItem[]> {
    return this.subject.asObservable();
  }

  addItem(description: string): void {
    this.fakeData.push({ id: (this.maxId++).toString(), description, purchased: false });
    // this would be some async code that goes to the api.
    this.subject.next(this.fakeData);
  }

  markItemAsPurchased(item: ShoppingListItem): void {
    const storedItem = this.fakeData.filter(i => i.id === item.id)[0].purchased = true;
    // this would be some async code that goes to the api.

    this.subject.next(this.fakeData);
  }

  removeItem(id: string): void {
    // this.fakeData.indexOf(s => s

  }
}


// import { ShoppingListItem } from '../models';
// import { BehaviorSubject, Observable } from 'rxjs';

// export class ShoppingDataService {

//   private fakeData: ShoppingListItem[] = [
//     { id: '1', description: 'Ice Cream Cones', purchased: false },
//     { id: '2', description: 'Cheese', purchased: true },
//   ];

//   private subject = new BehaviorSubject<ShoppingListItem[]>(this.fakeData);
//   private maxId = 3;
//   getObservable(): Observable<ShoppingListItem[]{
//     return this.subject.asObservable();
//   }

//   addItem(description: string): void {
//     this.fakeData.push({ id: (this.maxId++).toString(), description, purchased: false });
//     this.subject.next(this.fakeData);
//   }

//   markItemAsPurchased(item: ShoppingListItem): void {
//     const storedItem = this.fakeData.filter(i => i.id === item.id)[0].purchased = true;
//     this.subject.next(this.fakeData);
//   }
// }
