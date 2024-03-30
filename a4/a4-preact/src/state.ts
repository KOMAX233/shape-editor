import { computed, signal } from "@preact/signals";

// shape properties
export type SquareProps = {
  type: "Square";
  hue?: number;
}

export type StarProps = {
  type: "Star";
  r1?: number;
  r2?: number;
  n?: number;
  hue?: number;
}

export type BullseyeProps = {
  type: "Bullseye";
  rings?: number;
  hue?: number;
  hue2?: number;
}

export type CatProps = {
  type: "Cat";
  hue?: number;
  look?: "left" | "center" | "right";
}

export type ShapeType = "Square" | "Star" | "Bullseye" | "Cat";

export type ShapePropsType = 
  | SquareProps
  | StarProps
  | BullseyeProps
  | CatProps;

export type Shape = {
  id: number;
  selected: boolean;
  props: ShapePropsType;
}

//#region state

// the array of all Shapes
export const shapes = signal<Shape[]>([]);

export const num = computed(() => shapes.value.length);
export let editingID = signal<number | null>(null);
export const numSelected = computed(() => shapes.value.filter((s) => s.selected).length);

// selected shape ID (for editing)
export const selectedShapeId = signal<number | null>(null);
export const getEditingShape = computed(() => {
  const id = selectedShapeId.value;
  if (id) {
    return getShape(id);
  }
  return null;
})

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
let uniqueId = 0;

// model "business logic" (CRUD)

// Create
export const addShape = (type: ShapeType = "Square") => {
  // GOOD: assigns new array, signal will know
  shapes.value = [
    ...shapes.value,
    createRandomShape(type)
  ];

  selectedShapeId.value = null;
};

export const createRandomShape = (type: ShapeType): Shape => {
  switch (type) {
    case "Square":
      return {
        id: uniqueId++,
        selected: false,
        props: {
          type: "Square",
          hue: Math.round(Math.random() * 360),
        } as SquareProps,
      };
    case "Star":
      return {
        id: uniqueId++,
        selected: false,
        props: {
          type: "Star",
          hue: Math.round(Math.random() * 360),
          r1: 15,
          r2: Math.round(20 + Math.random() * 25),
          n: Math.round(3 + Math.random() * 7),
        } as StarProps,
      };
    case "Bullseye":
      return {
        id: uniqueId++,
        selected: false,
        props: {
          type: "Bullseye",
          hue: Math.round(Math.random() * 360),
          hue2: Math.round(Math.random() * 360),
          rings: Math.round(2 + Math.random() * 3),
        } as BullseyeProps,
      };
    case "Cat":
      function randomLook() {
        const r = Math.random();
        if (r < 0.33) return "left";
        if (r < 0.66) return "center";
        return "right";
      }
      return {
        id: uniqueId++,
        selected: false,
        props: {
          type: "Cat",
          hue: Math.round(Math.random() * 360),
          look: randomLook(),
        } as CatProps,
      };
  }
}

// Update
export const updateShape = (
  id: number,
  shape: { type?: string; hue?: number; done?: boolean }
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

export const deSelectAllBut = (shape?: Shape) => {
  shapes.value.filter((s) => s.id !== shape?.id).forEach((s) => (s.selected = false));
}

export const select = (id: number = -1) => {
  const shape = shapes.value.find((s) => (s.id === id));
  if (!shape) return;
  // if (!multiSelectMode) deSelectAllBut(shape);
  shape.selected = true;
  editingID.value = numSelected.value === 1? shape.id : null;
}

export const deSelect = (id: number = -1) => {
  const shape = shapes.value.find((s) => (s.id === id));
  if (!shape) return;
  // if (!multiSelectMode) deSelectAllBut(shape);
  shape.selected = false;
  if (numSelected.value === 1) {
    const editShape = shapes.value.find((s) => s.selected);
    if (editShape) {
      editingID.value = editShape?.id;
    } else {
      editingID.value = null;
    }
  }
}

export const deSelectAll = () => {
  shapes.value.forEach((s) => s.selected = false);
  editingID.value = null;
}

for (let i = 0; i < 8; i++) {
  addShape("Square");
}

//#endregion
