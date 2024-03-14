import { Subject } from "./observer";

type Shape = {
    drawing: string;
    selected: boolean;
    hue1: number;
    hue2: number;
    rings: number;
    point?: number;
    radius?: number;
    look?: string;
};

export class Model extends Subject {
    private shapes: Shape[] = [];

    get num() {
        return this.shapes.length;
    }
}