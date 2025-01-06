import { Application } from "./application";
import { Location } from "./location";

export class Job {
    #_id!: string;
    #userId!: string;
    #title!: string;
    #company!: string;
    #maxPosition!: number;
    #minExperience!: number;
    #minSalary!: number;
    #maxSalary!: number;
    #skills!: string[];
    #description!: string;
    #location!: Location;
    #applications!: Application[];
    #createdDate!: Date;
    #modifiedDate!: Date;

    get _id(): string {
        return this.#_id
    }
    get userId(): string {
        return this.#userId
    }
    get title(): string {
        return this.#title
    }
    get company(): string {
        return this.#company
    }
    get maxPosition(): number {
        return this.#maxPosition;
    }
    get minExperience(): number {
        return this.#minExperience
    }
    get minSalary(): number {
        return this.#minSalary
    }
    get maxSalary(): number {
        return this.#maxSalary
    }
    get skills(): string[] {
        return this.#skills
    }
    get description(): string {
        return this.#description
    }
    get location(): Location {
        return this.#location
    }
    get applications(): Application[] {
        return this.#applications;
    }
    get createdDate(): Date {
        return this.#createdDate
    }
    get modifiedDate(): Date {
        return this.#modifiedDate
    }

    set _id(id: string) {
        this.#_id = id;
    }
    set userId(userId: string) {
        this.#userId = userId;
    }
    set title(title: string) {
        this.#title = title;
    }
    set company(company: string) {
        this.#company = company;
    }
    set maxPosition(maxPosition: number) {
        this.#maxPosition = maxPosition;
    }
    set minExperience(minExperience: number) {
        this.#minExperience = minExperience;
    }
    set minSalary(minSalary: number) {
        this.#minSalary = minSalary;
    }
    set maxSalary(maxSalary: number) {
        this.#maxSalary = maxSalary;
    }
    set skills(skills: string[]) {
        this.#skills = skills;
    }
    set description(description: string) {
        this.#description = description;
    }
    set location(location: Location) {
        this.#location = location;
    }
    set applications(applications: Application[]) {
        this.#applications = applications;
    }
}
