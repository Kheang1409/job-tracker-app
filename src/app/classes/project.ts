import { Address } from "./address";

export class Project {
  #id!: string;
  #name!: string;
  #about!: string;
  #startDate!: Date;
  #endDate!: Date;

  get id(): string {
    return this.#id;
  }

  set id(id: string) {
    this.#id = id;
  }

  get name(): string {
    return this.#name;
  }

  set name(name: string) {
    this.#name = name;
  }

  get about(): string {
    return this.#about;
  }

  set about(about: string) {
    this.#about = about;
  }

  get startDate(): Date {
    return this.#startDate;
  }

  set startDate(startDate: Date) {
    this.#startDate = startDate;
  }

  get endDate(): Date{
    return this.#endDate;
  }

  set endDate(endDate: Date) {
    this.#endDate = endDate;
  }
}