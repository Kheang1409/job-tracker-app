import { AbstractControl, ValidationErrors } from '@angular/forms';
import { countries } from '../data/countries';

export function phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
  
    const countryCode = control.root.get('countryCode')?.value;
    const phoneNumber = control.root.get('phoneNumber')?.value;
    
    if (!countryCode || !phoneNumber) return null;

    const country = countries.find(c => c.name === countryCode);

    if (!country) {
        return { invalidCountryCode: true };
    }

    const minPhoneLength = country.minLength;
    const maxPhoneLength = country.maxLength;
    
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < minPhoneLength || phoneNumberLength > maxPhoneLength) {
        return { invalidPhoneNumberLength: true };
    }

    const phonePattern = new RegExp(`^\\d{${minPhoneLength},${maxPhoneLength}}$`);
    if (!phonePattern.test(phoneNumber)) {
        return { invalidPhoneNumberPattern: true };
    }

  return null;
}