import { computed, signal } from "@preact/signals";

export type Shape = {
  id: number;
  type: string;
  hue: number;
  done: boolean;
};

//#region state

// the array of all Shapes
export const shapes = signal<Shape[]>([]);

export const num = computed(() => shapes.value.length);

// selected shape ID (for editing)
export const selectedShapeId = signal<number | null>(null);

// // selected shape (just a shortcut, not used in demo)
// export const selectedShape = computed(() => {
//   return selectedShapeId.value
//     ? getShape(selectedShapeId.value)
//     : undefined;
// });

//#endregion

//#region convenience functions

// Read
export const getShape = (id: number): Shape | undefined => {
  return shapes.value.find((s) => s.id === id);
};

//#endregion

//#region mutations

// very simple unique id generator
let uniqueId = 1;

// model "business logic" (CRUD)

// Create
export const addShape = (type: string, hue: number) => {
  // GOOD: assigns new array, signal will know
  shapes.value = [
    ...shapes.value,
    {
      id: uniqueId++,
      type,
      hue,
      done: false,
    },
  ];

  selectedShapeId.value = null;
};

// Update
export const updateShape = (
  id: number,
  shape: { type: string; hue?: number; done?: boolean }
) => {
  shapes.value = shapes.value.map((s) =>
    // if shape matches id, then spread it and replace
    // with defined properties in shape object argument
    s.id === id ? { ...s, ...shape } : s
  );
  selectedShapeId.value = null;
};

// Delete
export const deleteShape = (id: number | null) => {
  // GOOD: assigns new array, signal will know
  if (id != null) {
    shapes.value = shapes.value.filter((s) => s.id !== id);
    // edge case if editing a shape that is deleted
    if (selectedShapeId.value === id) {
      selectedShapeId.value = null;
    }
  }
};

// Clear
export const clearShape = () => {
  shapes.value = []
  selectedShapeId.value = null;
};

// generate random hue
export const randomHue = () => {
    const hue = Math.floor(Math.random() * 361);
    return hue;
    // const saturation = 100;
    // const luminance  = 50;
    // return `hsl(${hue}, ${saturation}%, ${luminance}%)`;
};

export const initShapes = () => {
  for (let i = 0; i < 8; i++) {
    const hue = randomHue();
    addShape('Square', hue);
  }
}

initShapes();

//#endregion
