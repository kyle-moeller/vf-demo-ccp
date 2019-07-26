import { Country } from "./country";

export class ParameterizedPhoneNumber {
    phoneNumber : string;
    country : Country;

    constructor(num, country) {
        this.phoneNumber = num;
        this.country = country;
    }
}