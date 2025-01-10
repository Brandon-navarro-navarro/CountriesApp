import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-country-page',
  standalone: false,

  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent implements OnInit {

    public isLoading: boolean = false;
    public countries: Country[] = [];
    public initialValue: string = '';

    constructor(private countriesService: CountriesService){}

    ngOnInit(): void {
        this.countries = this.countriesService.cacheStore.byCountry.countries;
        this.initialValue = this.countriesService.cacheStore.byCountry.term;
    }


  searchByCountry(textSearch:string){
    this.isLoading = true;
    this.countriesService.searchCountry(textSearch)
    .subscribe(countries => {
      this.countries =  countries;
      this.isLoading = false;
    });
  }

}
