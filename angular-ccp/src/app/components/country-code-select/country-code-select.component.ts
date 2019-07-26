import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Country } from 'src/app/models/country';
import { AmazonconnectService } from 'src/app/services/amazonconnect.service';

@Component({
  selector: 'app-country-code-select',
  templateUrl: './country-code-select.component.html',
  styleUrls: ['./country-code-select.component.scss']
})
export class CountryCodeSelectComponent implements OnInit {
  dropDownToggled: boolean = false;
  
  selectedCountry: Country;
  countriesList: Country[];

  @Input()
  defaultCountry: Country;

  @Output() selectedCountryEvent = new EventEmitter<Country>();

  constructor(private amazonConnectService: AmazonconnectService) { }

  ngOnInit() {
    this.countriesList = this.amazonConnectService.getDialableCountries();

    if (this.defaultCountry) {
      this.selectedCountry = this.defaultCountry;
    } else {
      this.selectedCountry = this.countriesList.find(el => {
        return el.isoCode === "us";
      });  
    }
    
    this.selectedCountryEvent.emit(this.selectedCountry);
  }

  toggleDropdown() {
    this.dropDownToggled = !this.dropDownToggled;
  }

  setSelectedCountry(country: Country) {
    this.selectedCountry = country;
    this.selectedCountryEvent.emit(this.selectedCountry);
    this.toggleDropdown();
  }
}
