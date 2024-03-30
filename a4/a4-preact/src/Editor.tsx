import Display from "./Display";
import Form from "./Form";
import * as State from "./state";

export default function Editor() {
  // const hasSelected = State.selectedShapeId.value;
  if (State.numSelected.value <= 0) {
    return (
      <div class="p-[10px] w-full h-[calc(100%-10px)] items-center justify-center flex">
          <label>Select One</label>
      </div>
    );
  } else if (State.numSelected.value > 1) {
    console.log("too many");
    return (
      <div class="p-[10px] w-full h-[calc(100%-10px)] items-center justify-center flex">
        <label>Too Many Selected</label>
      </div>
    );
  } else {
    return (
      <div class="p-[10px] w-full h-[calc(100%-10px)] items-center">
          <Display></Display>
          <Form></Form>
      </div>
    );
  }
}
