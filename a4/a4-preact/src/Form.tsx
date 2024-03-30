import { useState } from "react";
import * as State from "./state";
import { useRef, useEffect } from "preact/hooks";

export default function Form() {
    const [hue, setHue] = useState('');
    const id = State.selectedShapeId.value;

    useEffect(() => {
        if (id) {
            const selectedShape = State.getShape(id);
            if (selectedShape) {
                setHue(selectedShape.props.hue?.toString() || '');
            }
        }
    }, [id]);

    function handleHueChange(e) {
        const newHue = e.target.value;
        setHue(newHue);
        const HueNum = Number(newHue);

        if (newHue && !isNaN(HueNum) && HueNum >= 0 && HueNum <= 360 && id) {
            State.updateShape(id, {hue: HueNum});
        }
    }

    const validHue = hue && !isNaN(Number(hue)) && Number(hue) >= 0 && Number(hue) <= 360;

    return (
        <div class="h-1/3 p-[10px] flex flex-1 flex-col items-center border border-gray-500" >
            <form class="flex items-center gap-x-[5px]">
                <label>Hue</label>
                <input type="number" 
                onChange={handleHueChange}
                value={hue}
                class={`w-[50px] outline ${!validHue? 'outline outline-red-500 outline-[2px]': 'outline-none'}`}
                ></input>
            </form>
        </div>
    );
}
