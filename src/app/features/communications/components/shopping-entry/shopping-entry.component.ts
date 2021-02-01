import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-entry',
  templateUrl: './shopping-entry.component.html',
  styleUrls: ['./shopping-entry.component.scss']
})
export class ShoppingEntryComponent implements OnInit {

  form: FormGroup;

  @Output() itemAdded = new EventEmitter<string>();
  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      item: ['', [Validators.required, Validators.maxLength(100)]]
    }
    );
  }

  get item(): AbstractControl { return this.form.get('item'); }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.form.valid) {
      // tell the parent, here is what they added.
      // no guarantee they are listening.
      // parents usually don't
      // at least I know I try not to

      this.itemAdded.emit(this.item.value);
      // this.itemAdded.emit(this.form.get('item').value);
    }

    const message = this.form.valid ? 'It is valid' : 'Actually... it is not valid';
    console.log(this.form.value);
    console.log(message);
  }
}
