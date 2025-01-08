import { NgForm } from "@angular/forms";

export class Location {
    #id!: string;
    #city!: string;
    #state!: string;
    #country!: string;
    #address!: string;
    #zip!: string;

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
    get address(): string {
        return this.#address;
    }
    get zip(): string {
        return this.#zip;
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
    set address(address: string) {
        this.#address = address;
    }
    set zip(zip: string) {
        this.#zip = zip;
    }

    fill(form: NgForm) {
        this.id = form.value.id;
        this.city = form.value.city;
        this.state = form.value.state;
        this.country = form.value.country;
        this.zip = form.value.zip;
    }

    jsonify() {
        return {
            id: this.#id,
            city: this.city,
            state: this.state,
            country: this.country,
            zip: this.zip
        }
    }
}