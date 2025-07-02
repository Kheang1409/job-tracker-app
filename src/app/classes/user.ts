import { FormGroup } from "@angular/forms";
import { Address } from "./address";

export class User {
    #id!: string
    #firstName!: string
    #lastName!: string
    #bio!: string
    #gender!: string
    #email!: string
    #phoneNumber!: string
    #address!: Address

    get id(): string {
        return this.#id;
    }
    get firstName(): string{
        return this.#firstName;
    }
    get lastName(): string{
        return this.#lastName;
    }
    get bio(): string{
        return this.#bio;
    }
    get gender(): string{
        return this.#gender;
    }
    get phoneNumber(): string{
        return this.#phoneNumber;
    }
    get email(): string {
        return this.#email;
    }
    get address(): Address {
        return this.#address;
    }

    set firstName(firstName: string){
        this.#firstName = firstName;
    }
    set lastName(lastName : string){
        this.#lastName = lastName;
    }
    set bio(bio : string){
        this.#bio = bio;
    }
    set gender(gender : string){
        this.#gender = gender;
    }
    set phoneNumber(phoneNumer: string){
        this.#phoneNumber = phoneNumer
    }
    set email(email : string) {
        this.#email = email;
    }
    set address(address: Address){
        this.#address = address;
    }

    jsonify() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            bio: this.bio,
            gender: this.gender,
            email: this.email,
            address: this.address.jsonify()
        }
    }
}