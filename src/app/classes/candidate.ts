export class Candidate {
  #id!: string;
  #candidateId!: string;
  #fullName!: string;
  #email!: string;
  #phoneNumber!: string;
  #resumeUrl?: string;
  #coverLetter?: string;
  #appliedAt!: Date;
  #status!: string;
  #notes?: string;

  get id(): string {
    return this.#id;
  }

  set id(id: string) {
    this.#id = id;
  }

  get candidateId(): string {
    return this.#candidateId;
  }

  set candidateId(value: string) {
    this.#candidateId = value;
  }

  get fullName(): string {
    return this.#fullName;
  }

  set fullName(value: string) {
    this.#fullName = value;
  }

  get email(): string {
    return this.#email;
  }

  set email(value: string) {
    this.#email = value;
  }

  get phoneNumber(): string {
    return this.#phoneNumber;
  }

  set phoneNumber(value: string) {
    this.#phoneNumber = value;
  }

  get resumeUrl(): string | undefined {
    return this.#resumeUrl;
  }

  set resumeUrl(value: string | undefined) {
    this.#resumeUrl = value;
  }

  get coverLetter(): string | undefined {
    return this.#coverLetter;
  }

  set coverLetter(value: string | undefined) {
    this.#coverLetter = value;
  }

  get appliedAt(): Date {
    return this.#appliedAt;
  }

  set appliedAt(value: Date) {
    this.#appliedAt = value;
  }

  get status(): string {
    return this.#status;
  }

  set status(value: string) {
    this.#status = value;
  }

  get notes(): string | undefined {
    return this.#notes;
  }

  set notes(value: string | undefined) {
    this.#notes = value;
  }
}