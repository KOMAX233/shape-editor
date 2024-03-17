import { Subject } from "./observer";
import { Shape } from "./shape";

// id generator
let uniqueID = 1;

export class Model extends Subject {
    shapes: Shape[] = [];

    get num() {
        return this.shapes.length;
    }

    get numSelected() {
        return this.shapes.filter((t) => t.selected).length;
    }
    
    // model "business logic" (CRUD)

    // Create
    create(drawing: string, hue2?: number, rings?: number, point?: number, radius?: number, look?: string) {
        const temphue = Math.floor(Math.random() * 361);
        this.shapes = [
            ...this.shapes,
            {
                id: uniqueID++,
                drawing: drawing,
                selected: false,
                hue1: temphue,
                texthue1: String(temphue),
                // (hue2)? hue2: hue2,
                // rings: rings,
                // point: point,
                // radius: radius,
                // look: look
            },
        ];
        this.notifyObservers();
    }
    // read
    shape(id: number): Shape | undefined {
        return this.shapes.find((t) => t.id === id);
    }
    all(): Shape[] {
        // return a copy
        return [...this.shapes];
    }
    select(id: number) {
        this._selectID = null
        this.shapes.forEach((s) => {
            if (s.id === id) {
                s.selected = !s.selected;
                if (s.selected) {
                    this._selectID = s.id;
                }
            } else {
                s.selected = false;
            }
        });

        this.notifyObservers();
    }
    // update
    update(id: number, shape: {
        selected?: boolean;
        hue1: number;
        texthue1: string;
        hue2?: number;
        rings?: number;
        point?: number;
        radius?: number;
        look?: string
    }) {
        this.shapes = this.shapes.map((s) =>
            s.id === id? {...s, ...shape} : s
        );
        // this._selectID = null;
        this.notifyObservers();
    }

    // select a shape to edit
    private _selectID: number | null = null;
    get selectID() {
        return this._selectID;
    }
    // delete
    delete(id: number) {
        this.shapes = this.shapes.filter((s) => s.id !== id);
        // if editing a shape that is deleted
        if (this._selectID === id) {
            this._selectID = null;
        }
        this.notifyObservers();
    }
    deleteAll() {
        this.shapes = [];
        this._selectID = null;
        this.notifyObservers();
    }
}