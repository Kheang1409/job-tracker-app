export class StatusRemark {
    #status!: string;
    #dateToRemeber!: Date;
    #notes!: string;

    get status(): string {
        return this.#status;
    }
    get dateToRemeber(): Date {
        return this.#dateToRemeber;
    }
    get notes(): string {
        return this.#notes;
    }

    set status(status: string) {
        this.#status = status;
    }
    set dateToRemeber(dateToRemeber: Date) {
        this.#dateToRemeber = dateToRemeber;
    }
    set notes(notes: string) {
        this.#notes = notes;
    }

    jsonify() {
        return {
            status: this.#status,
            dateToRemeber: this.#dateToRemeber,
            notes: this.#notes
        }
    }
}
