import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SongSummaryModel } from '../../models';
import { PlaylistState, selectSongListModel } from '../../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  playlist$: Observable<SongSummaryModel[]>;
  constructor(private store: Store<PlaylistState>) { }

  ngOnInit(): void {
    this.playlist$ = this.store.select(selectSongListModel);
  }

}
