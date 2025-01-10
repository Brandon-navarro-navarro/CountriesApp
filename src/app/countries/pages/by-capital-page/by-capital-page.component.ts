import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  standalone: false,
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit {

    public countries: Country[] = [];
    public isLoading: boolean = false;
    public initialValue: string = '';

    constructor(private countriesService: CountriesService){}

    ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

    searchByCapital(textSearch:string){

      this.isLoading = true;
      this.countriesService.searchCapital(textSearch)
      .subscribe(countries => {
        this.countries =  countries;
        this.isLoading = false;
      });
    }

}
