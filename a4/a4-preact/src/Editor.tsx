import Display from "./Display";
import Form from "./Form";
import { num } from "./state";

export default function Editor() {
  return (
    <div class="p-[10px] w-full h-[calc(100%-10px)] items-center">
        <Display></Display>
        <Form></Form>
    </div>
  );
}
