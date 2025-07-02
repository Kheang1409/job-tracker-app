import { NgForm } from "@angular/forms";

export class Address {
    #id!: string;
    #country!: string;
    #street!: string;
    #city!: string;
    #state!: string;
    #postalCode!: string;

    get id(): string {
        return this.#id;
    }
    get city(): string {
        return this.#city;
    }
    get state(): string {
        return this.#state;
    }
    get country(): string {
        return this.#country;
    }
    get street(): string {
        return this.#street;
    }
    get postalCode(): string {
        return this.#postalCode;
    }

    set id(id: string) {
        this.#id = id;
    }
    set city(city: string) {
        this.#city = city;
    }
    set state(state: string) {
        this.#state = state;
    }
    set country(country: string) {
        this.#country = country;
    }
    set street(street: string) {
        this.#street = street;
    }
    set zip(zip: string) {
        this.#postalCode = zip;
    }

    jsonify() {
        return {
            country: this.country,
            street: this.street,
            city: this.city,
            state: this.state,
            postalCode: this.zip
        }
    }
}