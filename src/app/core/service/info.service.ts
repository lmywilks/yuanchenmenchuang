import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InfoModel } from '../interfaces/info';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private readonly API = environment.api_root;

  constructor(private http: HttpClient) { }

  Retrieve() {
      return this.http.get(`${ this.API }/info`);
  }

  Update(info: InfoModel) {
      return this.http.put(`${ this.API }/info/main`, info);
  }
}
