import { NgForm } from "@angular/forms";

export class Location {
    #_id!: string;
    #city!: string;
    #state!: string;
    #country!: string

    get _id(): string {
        return this.#_id;
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

    set _id(id: string) {
        this.#_id = id;
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

    constructor() {

    }

    fill(form: NgForm) {
        this._id = form.value.id;
        this.city = form.value.city;
        this.state = form.value.state;
        this.country = form.value.country;
    }

    jsonify() {
        return {
            city: this.city,
            state: this.state,
            country: this.country
        }
    }
}