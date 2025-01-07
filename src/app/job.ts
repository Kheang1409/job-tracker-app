import { NgForm } from "@angular/forms";
import { Application } from "./application";
import { Location } from "./location";

export class Job {
    #id!: string;
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
    #status!: string;

    get id(): string {
        return this.#id
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
    get status(): string {
        return this.#status;
    }

    set id(id: string) {
        this.#id = id;
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
    set createdDate(createdDate: Date) {
        this.#createdDate = createdDate;
    }
    set modifiedDate(modifiedDate: Date) {
        this.#modifiedDate = modifiedDate;
    }
    set status(status: string) {
        this.#status = status;
    }

    fill(form: NgForm) {
        this.id = form.value.id;
        this.userId = form.value.userId;
        this.title = form.value.title;
        this.company = form.value.company;
        this.maxPosition = form.value.maxPosition;
        this.minExperience = form.value.minExperience;
        this.minSalary = form.value.minSalary;
        this.maxSalary = form.value.maxSalary;
        this.skills = form.value.skills;
        this.description = form.value.description;
        this.location = form.value.location;
    }

    jsonify() {
        return {
            id: this.#id,
            userId: this.userId,
            title: this.title,
            company: this.company,
            maxPosition: this.maxPosition,
            minExperience: this.minExperience,
            minSalary: this.minSalary,
            maxSalary: this.maxSalary,
            skills: this.skills,
            description: this.description,
            location: this.location,
            applications: this.applications,
            createdDate: this.createdDate,
            modifiedDate: this.modifiedDate
        }
    }

    isApplied(userId: string): boolean {
        if (this.#applications.length == 0)
            return false;
        let found = this.applications.find(application => application.userId == userId)
        if (found)
            return true;
        return false;
    }

    newApplication(application: Application) {
        this.#applications.push(application);
    }
}
