import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Observable, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-rhs',
  templateUrl: './rhs.component.html',
  styleUrls: ['./rhs.component.scss']
})
export class RhsComponent implements OnInit, OnDestroy {

  isEven$: Observable<boolean>;
  message$: Observable<string>;
  sub: Subscription;


  message = '';
  constructor(private service: MessageService) { }

  ngOnInit(): void {
    this.message$ = this.service.getMessageObservable();

    this.isEven$ = this.service.getMessageObservable()
      .pipe(
        map(val => val.length % 2 === 0));

    // this is probably a memory leak. If do this,
    // you must unsubsribe as well. sine we sub in the init, unsub in the destroy
    this.sub = this.service.getMessageObservable()
      .pipe(
        tap(val => console.log(val))).subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  doItRealGood(): void {
    this.message = this.service.getMessage();
  }
}
