import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Country } from '../interfaces/country';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService  {

  private apiUrl: string = "https://restcountries.com/v3.1";
  public cacheStore : CacheStore = {
    byCapital: {term: '' ,countries: []},
    byCountry: {term: '' ,countries: []},
    byRegion:  { countries: []},
  }

  constructor(private http: HttpClient) {
    this.loadToLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem("cacheStore",JSON.stringify(this.cacheStore));
  }

  private loadToLocalStorage(){
    if(!localStorage.getItem("cacheStore")) return;

    this.cacheStore = JSON.parse(localStorage.getItem("cacheStore")!);
  }

  private getCountriespRequest(url:string) : Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError(()=> of([])),
      // delay(2000)
    )
  }


  searchCapital(textCapital:string) : Observable<Country[]>{
    return this.getCountriespRequest(`${this.apiUrl}/capital/${textCapital}`)
    .pipe(
      tap( countries => this.cacheStore.byCapital = {term: textCapital, countries} ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountry(textCountry:string) : Observable<Country[]>{
    return this.getCountriespRequest(`${this.apiUrl}/name/${textCountry}`)
    .pipe(
      tap( countries => this.cacheStore.byCountry = {term: textCountry, countries} ),
      tap(() => this.saveToLocalStorage())
    )

    };


  searchRegion(textRegion:Region) : Observable<Country[]>{
    return this.getCountriespRequest(`${this.apiUrl}/region/${textRegion}`)
    .pipe(
      tap( countries => this.cacheStore.byRegion = {region: textRegion, countries} ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountryByAlphaCode(alphaCode:string) : Observable<Country | null>{
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${alphaCode}`)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(() => of(null))
    );
  }

}


