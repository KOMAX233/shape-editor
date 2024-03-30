import * as State from "./state";
import { useRef } from "preact/hooks";

type FormProps = {
    editId: number | null;
    initialValue?: string;
};

export default function Form({ editId, initialValue }: FormProps) {
    // reference hook for input element
    const inputRef = useRef<HTMLInputElement>(null);
    
    function handleChange(e: Event) {
        const inputValue = inputRef.current?.value;
        if (inputValue === undefined) return;

        if (editId) {
            State.updateShape(editId, {hue: Number(inputValue)});
        }
    }

    return (
        <div class="h-1/3 p-[10px] flex flex-1 flex-col items-center border border-gray-500" >
            <form class="">
                <label>Hue</label>
                <input ref={inputRef} type="number" onChange={handleChange}></input>
            </form>
        </div>
    );
}
