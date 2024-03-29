// app state
import { count } from "./state";

type ShapeListProps = {
  colour?: string;
};

export default function ShapeList({
  colour = "grey",
}: ShapeListProps) {
  return (
    <div class="p-[10px] flex-1 bg-[white] flex flex-wrap">
      {[...Array(count.value)].map((_, i) => (
        <NumberBox num={i + 1} colour={colour} />
      ))}
    </div>
  );
}

// A component for the box with a number in it.
type NumberBoxProps = {
  num: number;
  colour: string;
};

function NumberBox({ num, colour }: NumberBoxProps) {
  return (
    <div
      class="m-1 p-[10px] flex-none hover:cursor-pointer text-black hover:text-red-500"
      style={{ background: colour }}
    >
      {num}
    </div>
  );
}

// class={style.box}
