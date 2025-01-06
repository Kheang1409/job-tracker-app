import { FormGroup } from "@angular/forms";

export class User {
    #_id: string = ''
    #email: string = ''
    #username: string = ''
    #password: string = ''

    get _id(): string {
        return this.#_id;
    }
    get email(): string {
        return this.#email;
    }
    get username(): string {
        return this.#username;
    }
    get password(): string {
        return this.#password;
    }
    set username(username: string) {
        this.#username = username
    }
    set password(passowrd: string) {
        this.#password = passowrd
    }
    set email(email: string) {
        this.#email = email;
    }

    fill(form: FormGroup) {
        this.email = form.value.email;
        this.username = form.value.username;
        this.password = form.value.password;
    }

    jsonify() {
        return {
            email: this.email,
            password: this.password,
        }
    }
    jsonifyCreate() {
        return {
            email: this.email,
            username: this.username,
            password: this.password,
        }
    }
}