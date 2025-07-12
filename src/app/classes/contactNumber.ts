export class ContactNumber {
  #countryCode!: string;
  #phoneNumber!: string; 

  get cityCode(): string {
    return this.#countryCode;
  }

  set countryCode(countryCode: string) {
    this.#countryCode = countryCode;
  }

  get phoneNumber(): string {
    return this.#phoneNumber;
  }

  set phoneNumber(phoneNumber: string) {
    this.#phoneNumber = phoneNumber;
  }
}