import { random } from "simplekit/utility";
import { Subject } from "./observer";


type Todo = {
  id: number;
  text: string;
  selected: boolean;
  hue: number;
};

// super simple "id generator"
let uniqueId = 1;

export class Model extends Subject {
  // model data (i.e. model state)
  private todos: Todo[] = [];

  // information methods
  get num() {
    return this.todos.length;
  }

  get numSelected() {
    return this.todos.filter((t) => t.selected).length;
  }

  // model "business logic" (CRUD)

  // Create
  create(task: string, hue: number) {
    this.todos = [
      ...this.todos,
      { id: uniqueId++, text: task, selected: false, hue: hue},
    ];
    this.notifyObservers();
  }

  // Read
  todo(id: number): Todo | undefined {
    return this.todos.find((t) => t.id === id);
    // no need to notify observers since data not changed
  }

  all(): Todo[] {
    // return a copy (avoids bugs if views try to edit)
    return [...this.todos];
  }

  // Update
  update(id: number, todo: { text?: string; selected?: boolean; hue?: number }) {
    this.todos = this.todos.map((t) =>
      // if todo matches id, then spread it and replace
      // with defined properties in todo object argument
      t.id === id ? { ...t, ...todo } : t
    );
    this._selectId = null;
    this.notifyObservers();
  }

  // select a todo to edit
  private _selectId: number | null = null;
  get selectId() {
    return this._selectId;
  }
  select(id: number) {
    this._selectId = id;
    this.notifyObservers();
  }

  // Delete
  delete(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    // edge case if editing a todo that is deleted
    if (this._selectId === id) this._selectId = null;
    this.notifyObservers();
  }

  randomHue() {
    let rand = Math.ceil(random(0, 359));
    return rand;
  }
}
