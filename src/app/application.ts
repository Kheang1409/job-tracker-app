export class Application {
    #_id!: string;
    #candidateId!: string;
    #email!: string;
    #username!: string;
    #status!: string;
    #appliedDate!: Date;
    #notes!: string;

    get _id(): string {
        return this.#_id
    }
    get candidateId(): string {
        return this.#candidateId
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
    get notes(): string {
        return this.#notes
    }

    set _id(id: string) {
        this.#_id = id;
    }
    set candidateId(candidateId: string) {
        this.#candidateId = candidateId;
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
    set notes(notes: string) {
        this.#notes = notes;
    }
}
