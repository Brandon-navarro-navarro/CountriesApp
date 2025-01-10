import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';
import { CountriesService } from '../../services/countries.service';


@Component({
  selector: 'countries-by-region-page',
  standalone: false,

  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent implements OnInit {

  public regionActiva?: Region;
  public isLoading: boolean = false;
  public countries: Country[] = []
  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania']

  constructor(private countriesService: CountriesService){}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.regionActiva = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(textSearch:Region){
    this.isLoading = true;
    this.countriesService.searchRegion(textSearch).subscribe(
      regions => {
        this.countries = regions
        this.isLoading = false;
        this.regionActiva = textSearch;
      }
    )
  }
}
