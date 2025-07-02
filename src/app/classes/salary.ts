
export class Salary {
    
    #minSalary!: number;
    #maxSalary!: number;
    #currency!: string;
    
    get minSalary(): number {
        return this.#minSalary;
    }

    set minSalary(minSalary: number) {
        this.#minSalary = minSalary;
    }

    get maxSalary(): number {
        return this.#maxSalary;
    }

    set maxSalary(maxSalary: number) {
        this.#maxSalary = maxSalary;
    }

    get currency(): string {
        return this.#currency;
    }

    set currency(currency: string) {
        this.#currency = currency;
    }
}
