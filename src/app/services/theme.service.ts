import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient, private jwt: JwtService) { }

  getThemes() {
    return this.http.get(`${this.jwt.endpoint}/users/${this.jwt.getId()}/themes/`, { headers: this.jwt.headers }).pipe(
      map((res: any) => {
        return res;
      }));
  }

  getThemeById(id) {
    return this.http.get(`${this.jwt.endpoint}/users/${this.jwt.getId()}/themes/${id}`, { headers: this.jwt.headers }).pipe(
      map((res: any) => {
        return res;
      }));
  }

  getThemesByCategoryId(id): Observable<any> {
    return this.getThemes().pipe(map((res: any) => {
      let tempThemes = [];
      for(let theme of res) {
        if (theme.category === Number(id)){
          tempThemes.push(theme);
        }
      }
        return tempThemes;
      }
      ));
  }

  createTheme(theme): Observable<any> {
    const api = `${this.jwt.endpoint}/users/${this.jwt.getId()}/themes/`;
    return this.http.post(api, theme, {headers: this.jwt.headers}).pipe(
      map((res: any) => {
        return res;
      }));
  }


  deleteTheme(themeId) {
    const api = `${this.jwt.endpoint}/users/${this.jwt.getId()}/themes/${Number(themeId)}`;
    return this.http.delete(api, {headers: this.jwt.headers}).pipe(
      map((res: any) => {
        return res;
      }));
  }

  updateTheme(theme): Observable<any> {
    const api = `${this.jwt.endpoint}/users/${this.jwt.getId()}/themes/`;
    return this.http.put(api, theme, {headers: this.jwt.headers}).pipe(
      map((res: any) => {
        return res;
      }));
  }
}
