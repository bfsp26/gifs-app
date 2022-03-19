import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gifs } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey: string = 'dBhvdR31c3jrJTr0cmMD4olGpGiRVdE2';
  private baseUrl: string = 'https://api.giphy.com/v1/gifs';
  private _record: string[] = [];
  public results: Gifs[] = [];

  get record() {
    return [...this._record];
  }

  constructor(private http: HttpClient) {
    this._record = JSON.parse(localStorage.getItem('record')!) || [];
    this.results = JSON.parse(localStorage.getItem('lastGif')!) || [];
  }

  searchGifs(query: string = '') {

    query = query.trim().toLowerCase();

    if (!this._record.includes(query)) {
      this._record.unshift(query);
      this._record = this._record.splice(0, 10);
      localStorage.setItem('record', JSON.stringify(this._record));
    }

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.baseUrl}/search`, { params })
      .subscribe((resp) => {
        this.results = resp.data;
        localStorage.setItem('lastGif', JSON.stringify(this.results));
      });
  }

}
