import { Round } from "./round";

export class Candidate {
  #id!: string;
  #candidateId!: string;
  #firstName!: string;
  #lastName!: string;
  #email!: string;
  #rounds!: Round[];
  #currentRound!: string;
  #status!: string;
  #appliedDate!: Date;

  get id(): string {
    return this.#id;
  }

  set id(id: string) {
    this.#id = id;
  }

  get candidateId(): string {
    return this.#candidateId;
  }

  set candidateId(candidateId: string) {
    this.#candidateId = candidateId;
  }

  get firstName(): string {
    return this.#firstName;
  }

  set firstName(firstName: string) {
    this.#firstName = firstName;
  }

  get lastName(): string {
    return this.#lastName;
  }

  set lastName(lastName: string) {
    this.#lastName = lastName;
  }

  get email(): string {
    return this.#email;
  }

  set email(email: string) {
    this.#email = email;
  }

  get rounds(): Round[] {
    return this.#rounds;
  }

  set rounds(rounds: Round[]) {
    this.#rounds = rounds;
  }

  get currentRound(): string{
    return this.#currentRound
  }
  set currentRound(currentRound: string){
    this.#currentRound = currentRound;
  }

  get status(): string {
    return this.#status;
  }

  set status(status: string) {
    this.#status = status;
  }

  get appliedDate(): Date {
    return this.#appliedDate;
  }

  set appliedDate(appliedDate: Date) {
    this.#appliedDate = appliedDate;
  }
}