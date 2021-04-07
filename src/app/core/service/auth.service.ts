import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = environment.api_root;

  constructor(
      private http: HttpClient
  ) { }

  public Login(username: string, password: string) {
      return this.http.post(`${ this.API }/auth/login`, { username, password })
  }
}
