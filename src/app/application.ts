import { NgForm } from "@angular/forms";

export class Application {
    #id!: string;
    #userId!: string;
    #email!: string;
    #username!: string;
    #status!: string;
    #appliedDate!: Date;
    #interviewDate!: Date;
    #notes!: string;

    get id(): string {
        return this.#id
    }
    get userId(): string {
        return this.#userId
    }
    get email(): string {
        return this.#email
    }
    get username(): string {
        return this.#username
    }
    get status(): string {
        return this.#status
    }
    get appliedDate(): Date {
        return this.#appliedDate
    }
    get interviewDate(): Date {
        return this.#interviewDate;
    }
    get notes(): string {
        return this.#notes
    }

    set id(id: string) {
        this.#id = id;
    }
    set userId(userId: string) {
        this.#userId = userId;
    }
    set email(email: string) {
        this.#email = email;
    }
    set username(username: string) {
        this.#username = username;
    }
    set status(status: string) {
        this.#status = status;
    }
    set appliedDate(appliedDate: Date) {
        this.#appliedDate = appliedDate;
    }
    set interviewDate(interviewDate: Date) {
        this.#interviewDate = interviewDate;
    }
    set notes(notes: string) {
        this.#notes = notes;
    }

    jsonify() {
        return {
            id: this.#id,
            userId: this.userId,
            email: this.email,
            username: this.username,
            status: this.status,
            appliedDate: this.appliedDate,
            notes: this.notes
        }
    }
}
