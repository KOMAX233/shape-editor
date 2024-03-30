import Display from "./Display";
import Form from "./Form";
import { num } from "./state";

export default function Editor() {
  return (
    <div class="w-full h-full bg-gray-200 items-center">
        <Display></Display>
        <Form></Form>
    </div>
  );
}
