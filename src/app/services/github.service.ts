import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  public urlGitHub = 'https://api.github.com/users/'

  constructor(
    private _http: HttpClient
  ) { }

  loadUser(username: any): Observable<any> {
    return this._http.get(this.urlGitHub+username)
  }

  loadRepositories(username: any): Observable<any> {
    return this._http.get(this.urlGitHub+username+'/repos')
  }
}
