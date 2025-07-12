import { Address } from "./address";

export class Experience {
  #id!: string;
  #companyName!: string;
  #role!: string;
  #address!: Address;
  #skills!: { name: string }[];

  get id(): string {
    return this.#id;
  }

  set id(id: string) {
    this.#id = id;
  }

  get companyName(): string {
    return this.#companyName;
  }

  set companyName(companyName: string) {
    this.#companyName = companyName;
  }

  get role(): string {
    return this.#role;
  }

  set role(role: string) {
    this.#role = role;
  }

  get address(): Address {
    return this.#address;
  }

  set address(address: Address) {
    this.#address = address;
  }

  get skills(): { name: string }[] {
    return this.#skills;
  }

  set skills(skills: { name: string }[]) {
    this.#skills = skills;
  }
}