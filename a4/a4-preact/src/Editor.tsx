import Display from "./Display";
import Form from "./Form";
import * as State from "./state";

export default function Editor() {
  const hasSelected = State.selectedShapeId.value;
  if (!hasSelected) {
    return null;
  } else {
    return (
      <div class="p-[10px] w-full h-[calc(100%-10px)] items-center">
          <Display></Display>
          <Form></Form>
      </div>
    );
  }
}
