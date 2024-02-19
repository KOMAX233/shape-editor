import { random } from "simplekit/utility";
import { Subject } from "./observer";


type Todo = {
  id: number;
  text: string;
  selected: boolean;
  hue: number;
  shape: string;
  inner: number;
  outer: number;
  point: number;
};

// super simple "id generator"
let uniqueId = 1;

export class Model extends Subject {
  // model data (i.e. model state)
  private todos: Todo[] = [];
  public selected: Todo[] = [];
  
  public shiftPressed: boolean = false;
  public shapeClicked: boolean = false;

  // information methods
  get num() {
    return this.todos.length;
  }

  get numSelected() {
    return this.todos.filter((t) => t.selected).length;
  }

  // model "business logic" (CRUD)

  // Create
  create(task: string, hue: number, shape: string, inner?:number, outer?: number, point?: number) {
    this.todos = [
      ...this.todos,
      { id: uniqueId++, 
        text: task, 
        selected: false, 
        hue: hue, 
        shape: shape,
        inner: (inner)? inner: 15,
        outer: (inner)? inner: 20,
        point: (inner)? inner: 3,
      },
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
  update(id: number, todo: { text?: string; selected?: boolean; hue?: number, inner?: number, outer?: number, point?: number }) {
    this.todos = this.todos.map((t) =>
      // if todo matches id, then spread it and replace
      // with defined properties in todo object argument
      t.id === id ? { ...t, ...todo } : t
    );
    this._selectId = null;
    this.selected = [];
    this.notifyObservers();

  }

  // select a todo to edit
  private _selectId: number | null = null;
  get selectId() {
    return this._selectId;
  }

  select(id: number, shift: boolean) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return;
    if (shift) {
      this.selected.push(todo);
      todo.selected = !todo.selected;
    } else {
      this._selectId = id;
      let tempv = todo.selected;
      this.todos.forEach((t) => t.selected = false);
      todo.selected = !tempv;      
    }
    this.notifyObservers();
  }

  // Delete
  delete(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    // edge case if editing a todo that is deleted
    if (this._selectId === id) this._selectId = null;
    this.notifyObservers();
  }

  clear() {
    this.todos = [];
    this._selectId = null;
    this.notifyObservers();
  }

  randomHue() {
    let rand = Math.ceil(random(0, 359));
    return rand;
  }

  randomR() {
    let rand = Math.ceil(random(20, 44));
    return rand;
  }

  randomPoint() {
    let rand = Math.ceil(random(3, 9));
    return rand;
  }

  deselectAll() {
    this.todos.forEach((t) => t.selected = false);
    this.selected = [];
    this.notifyObservers();
  }

  toggleShift() {
    this.shiftPressed = !this.shiftPressed;
    this.notifyObservers();
  }

  toggleClick(v: boolean) {
    this.shapeClicked = v;
    this.notifyObservers();
  }
}
