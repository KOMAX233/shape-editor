// app state
import Editor from "./Editor";
import { num } from "./state";

type RightViewProps = {
  colour?: string;
};

export default function RightView({
  colour = "grey",
}: RightViewProps) {
  return (
    <div class="w-1/3 p-[10px] bg-[whitesmoke] flex flex-wrap content-start">
      <div class="w-full h-full p-[10px] border-gray-500 bg-[whitesmoke] border flex flex-wrap content-start">
        {
          <Editor></Editor>
        }
      </div>
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
