import { Address } from "./address";
import { Candidate } from "./candidate";
import { Salary } from "./salary";

export class JobDetail {
    #id!: string;
    #authorId!: string;
    #title!: string;
    #companyName!: string;        
    #workMode!: string;        
    #employmentType!: string;  
    #numberOfOpenings!: number;
    #minExperience!: number;
    #salary!: Salary;
    #requirementSkills!: { name: string }[];
    #jobDescription!: string;
    #jobLocation!: Address;
    #candidates!: Candidate[];
    #status!: string;
    #createdAt!: Date;
    #updatedAt!: Date;
    #expirationDate!: Date;

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

    get salary(): Salary {
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

    get requirementSkills(): { name: string }[] {
        return this.#requirementSkills;
    }

    set requirementSkills(requirementSkills: { name: string }[]) {
        this.#requirementSkills = requirementSkills;
    }

    get candidates(): Candidate[] {
        return this.#candidates;
    }

    set candidates(candidates: Candidate[]) {
        this.#candidates = candidates.filter(candidate => candidate.status !== 'Withdrawn');
    }

    get jobDescription(): string {
        return this.#jobDescription;
    }

    set jobDescription(jobDescription: string) {
        this.#jobDescription = jobDescription;
    }

    get numberOfOpenings(): number {
        return this.#numberOfOpenings;
    }

    set numberOfOpenings(numberOfOpenings: number) {
        this.#numberOfOpenings = numberOfOpenings;
    }

    get minExperience(): number {
        return this.#minExperience;
    }

    set minExperience(minExperience: number) {
        this.#minExperience = minExperience;
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

    get updatedAt(): Date {
        return this.#updatedAt;
    }

    set updatedAt(updatedAt: Date) {
        this.#updatedAt = updatedAt;
    }

    get expirationDate(): Date {
        return this.#expirationDate;
    }

    set expirationDate(expirationDate: Date) {
        this.#expirationDate = expirationDate;
    }

    isExpired(): boolean {
        const now = new Date();
        const expirationDate = new Date(this.#expirationDate);
        return expirationDate < now;
    }

    isApplied(candidateId: string): boolean{
        return this.#candidates.some(candidate => candidate.candidateId === candidateId);
    }

    candidateCount(): number{
        return this.#candidates.length;
    }
}