'use strict';

export class Task {
  // Constructor
  constructor(name, priority, isImportant) {
    this.#name = name;
    this.#priority = priority;
    this.#isImportant = isImportant;
    this.#isCompleted = false;
    this.#dateCreated = new Date();
    this.#id = this.#generateId();
  }

  #generateId() {
    idName = this.#name.replace(/\s+/g, '').toLowerCase(); // remove whitespace and convert to lowercase
    return `${idName}-${this.#dateCreated.toISOString()}`;
  }

  // Getters
  get id() {
    return this.#id;
  }

  get taskDetails() {
    return {
      name: this.#name,
      priority: this.#priority,
      dateCreated: this.#dateCreated,
      isImportant: this.#isImportant,
      isCompleted: this.#isCompleted,
    };
  }

  // Setters
  set name(newName) {
    this.#name = newName;
  }

  set priority(newPriority) {
    this.#priority = newPriority;
  }

  set isImportant(isImportant) {
    this.#isImportant = isImportant;
  }

  set isCompleted(isCompleted) {
    this.#isCompleted = isCompleted;
  }

  // Methods
  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      priority: this.#priority,
      isImportant: this.#isImportant,
      isCompleted: this.#isCompleted,
      dateCreated: this.#dateCreated.toLocaleString(),
    };
  }
}
