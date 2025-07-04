import { Address } from "./address";
import { Experience } from "./experience";
import { ContactNumber } from "./contactNumber";
import { Project } from "./project";

export class User {
    #id!: string;
    #firstName!: string;
    #lastName!: string;
    #bio!: string;
    #gender!: string;
    #email!: string;
    #contactNumber!: ContactNumber;
    #address!: Address;
    #skills!: { name: string }[]
    #experiences!: Experience[]
    #projects!: Project[]

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
    get contactNumber(): ContactNumber{
        return this.#contactNumber;
    }
    get email(): string {
        return this.#email;
    }
    get address(): Address {
        return this.#address;
    }
    get skills(): { name: string }[] {
        return this.#skills;
    }
    get experiences(): Experience[] {
        return this.#experiences;
    }
    get projects(): Project[] {
        return this.#projects;
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
    set contactNumber(contactNumber: ContactNumber){
        this.#contactNumber = contactNumber
    }
    set email(email : string) {
        this.#email = email;
    }
    set address(address: Address){
        this.#address = address;
    }
    set skills(skills: { name: string }[]){
        this.#skills = skills;
    }
    set experiences(experiences: Experience[]){
        this.#experiences = experiences;
    }
    set projects(projects: Project[]){
        this.#projects = projects;
    }
}