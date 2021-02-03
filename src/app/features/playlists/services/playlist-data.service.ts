import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { SongEntity } from '../reducers/songs.reducer';
import { map } from 'rxjs/operators';

@Injectable()
export class PlaylistDataService {

  readonly baseUrl = environment.playlistUrl;
  constructor(private http: HttpClient) { }

  addASong(request: SongEntity): Observable<SongEntity> {
    const toSend = {
      title: request.title,
      artist: request.artist,
      album: request.album
    };
    return this.http.post<SongEntity>(this.baseUrl, toSend);
  }

  getAll(): Observable<SongEntity[]> {
    return this.http.get<PlaylistsResponse>(this.baseUrl)
      .pipe(
        map(response => response.data)
      );
  }
}
// this playlistResponse thingy is not necessary, but will help the compiler feel better about life, and it's pretty
interface PlaylistsResponse {
  data: SongEntity[];
}
// all js sent to client, so don't want to embed different stuff
// use environments
