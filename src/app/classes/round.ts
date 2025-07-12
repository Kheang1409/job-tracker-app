export class Round {
  #name!: string;
  #appointmentDate!: string; 
  #remarked!: string;
  #status!: string;

  get name(): string {
    return this.#name;
  }

  set name(name: string) {
    this.#name = name;
  }

  get appointmentDate(): string {
    return this.#appointmentDate;
  }

  set appointmentDate(appointmentDate: string) {
    this.#appointmentDate = appointmentDate;
  }

  get remarked(): string {
    return this.#remarked;
  }

  set remarked(remarked: string) {
    this.#remarked = remarked;
  }

  get status(): string {
    return this.#status;
  }

  set status(status: string) {
    this.#status = status;
  }
}