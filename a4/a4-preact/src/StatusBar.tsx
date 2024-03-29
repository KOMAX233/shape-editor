// app state
import { count, increment } from "./state";

export default function StatusBar() {
  return (
    <div class="h-[50px] bg-gray-200 flex items-center">
      <label class="min-w-[80px] py-0.5 px-2">
        {count.value} shape{(count.value > 1)? "s": ""}
      </label>
    </div>
  );
}
