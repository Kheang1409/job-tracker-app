import { Address } from "./address"; // You can keep this if Address structure is still relevant.
import { Salary } from "./salary";

export class Job {
    #id!: string;
    #authorId!: string;
    #title!: string;
    #companyName!: string;        
    #workMode!: string;        
    #employmentType!: string;  
    #salary!: Salary;
    #jobLocation!: Address;
    #numberOfOpenings!: number;
    #status!: string;
    #createdAt!: Date;

    // Getter and Setter methods
    get id(): string {
        return this.#id;
    }

    set id(id: string) {
        this.#id = id;
    }

    get authorId(): string {
        return this.#authorId;
    }

    set authorId(authorId: string) {
        this.#authorId = authorId;
    }

    get title(): string {
        return this.#title;
    }

    set title(title: string) {
        this.#title = title;
    }

    get companyName(): string {
        return this.#companyName;
    }

    set companyName(companyName: string) {
        this.#companyName = companyName;
    }

    get workMode(): string {
        return this.#workMode;
    }

    set workMode(workMode: string) {
        this.#workMode = workMode;
    }

    get employmentType(): string {
        return this.#employmentType;
    }

    set employmentType(employmentType: string) {
        this.#employmentType = employmentType;
    }

    get salary(): Salary{
        return this.#salary;
    }

    set salary(salary: Salary) {
        this.#salary = salary;
    }

    get jobLocation(): Address {
        return this.#jobLocation;
    }

    set jobLocation(jobLocation: Address) {
        this.#jobLocation = jobLocation;
    }

    get numberOfOpenings(): number {
        return this.#numberOfOpenings;
    }

    set numberOfOpenings(numberOfOpenings: number) {
        this.#numberOfOpenings = numberOfOpenings;
    }

    get status(): string {
        return this.#status;
    }

    set status(status: string) {
        this.#status = status;
    }

    get createdAt(): Date {
        return this.#createdAt;
    }

    set createdAt(createdAt: Date) {
        this.#createdAt = createdAt;
    }
}
