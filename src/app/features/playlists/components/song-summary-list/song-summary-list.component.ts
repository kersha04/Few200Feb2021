import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SongSummaryModel } from '../../models';

@Component({
  selector: 'app-song-summary-list',
  templateUrl: './song-summary-list.component.html',
  styleUrls: ['./song-summary-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongSummaryListComponent implements OnInit {

  @Input() list: SongSummaryModel[];

  constructor() { }

  ngOnInit(): void {

  }

}




  // list: SongSummaryModel[] = [
  //   { id: '1', title: 'Do you dig it?', artist: 'Q-Tip', album: 'Kamaal' },
  //   { id: '2', title: 'Jawls Theme', artist: 'Oatmeal Cookie' }
  // ];


