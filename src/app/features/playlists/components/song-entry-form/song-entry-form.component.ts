import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { songAdded } from '../../actions/song.actions';
import { PlaylistState } from '../../reducers';

@Component({
  selector: 'app-song-entry-form',
  templateUrl: './song-entry-form.component.html',
  styleUrls: ['./song-entry-form.component.scss']
})
export class SongEntryFormComponent implements OnInit {

  form: FormGroup;
  constructor(private formbuilder: FormBuilder,
    private store: Store<PlaylistState>) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      album: ['']
    });
  }

  submit(focusMe: HTMLInputElement): void {
    console.log(this.form.value);
    if (this.form.valid) {
      this.store.dispatch(songAdded(this.form.value));
      this.form.reset();
      focusMe.focus();
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      focusMe.focus();
    }

  }

  get title(): AbstractControl { return this.form.get('title'); }
  get artist(): AbstractControl { return this.form.get('artist'); }

}
