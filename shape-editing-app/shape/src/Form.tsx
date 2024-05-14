import * as State from "./state";
import { useRef, useEffect, useState } from "preact/hooks";

// square - hue
// star: radius r2, point n
// bullseye: hue2, rings
// cat: look(dropdown: left, center, right)
export default function Form() {
    const [hue, setHue] = useState('');
    const [r2, setR2] = useState('');
    const [n, setN] = useState('');
    const [hue2, setHue2] = useState('');
    const [rings, setRings] = useState('');
    const [look, setLook] = useState('');
    const id = State.selectedShapeId.value;
    const selectedShape = State.shapes.value.find((s) => s.id === id);

    useEffect(() => {
        if (id) {
            if (selectedShape) {
                setHue(selectedShape.props.hue?.toString() || '');
                if (selectedShape.props.type === "Star") {
                    setR2(selectedShape.props.r2?.toString() || '');
                    setN(selectedShape.props.n?.toString() || '');
                }
                if (selectedShape.props.type === "Bullseye") {
                    setHue2(selectedShape.props.hue2?.toString() || '');
                    setRings(selectedShape.props.rings?.toString() || '');
                }
                if (selectedShape.props.type === "Cat") {
                    setLook(selectedShape.props.look?.toString() || '');
                }
            }
        }
    }, [State.shapes.value, 
        selectedShape?.props
    ]);

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // This will prevent the default action when Enter is pressed
        }
    }
    function handleHueChange(e) {
        const newHue = e.target.value;
        setHue(newHue);
        const HueNum = Number(newHue);

        if (newHue && !isNaN(HueNum) && HueNum >= 0 && HueNum <= 360 && id) {
            State.updateShape(id, {hue: HueNum});
        }
    }
    
    function handleR2Change(e) {
        const newR2 = e.target.value;
        setR2(newR2);
        const R2Num = Number(newR2);

        if (newR2 && !isNaN(R2Num) && R2Num >= 20 && R2Num <= 45 && id) {
            State.updateShape(id, {r2: R2Num});
        }
    }

    function handleNChange(e) {
        const newN = e.target.value;
        setN(newN);
        const nNum = Number(newN);

        if (newN && !isNaN(nNum) && nNum >= 3 && nNum <= 10 && id) {
            State.updateShape(id, {n: nNum});
        }
    }

    function handleHue2Change(e) {
        const newHue2 = e.target.value;
        setHue2(newHue2);
        const Hue2Num = Number(newHue2);

        if (newHue2 && !isNaN(Hue2Num) && Hue2Num >= 0 && Hue2Num <= 360 && id) {
            State.updateShape(id, {hue2: Hue2Num});
        }
    }

    function handleRingsChange(e) {
        const newRings = e.target.value;
        setRings(newRings);
        const RingsNum = Number(newRings);

        if (newRings && !isNaN(RingsNum) && RingsNum >= 2 && RingsNum <= 5 && id) {
            State.updateShape(id, {rings: RingsNum});
        }
    }

    function handleLookChange(e) {
        const newLook = e.target.value;
        setLook(newLook);

        if (newLook && (newLook === "left" || newLook === "center" || newLook === "right") && id) {
            State.updateShape(id, {look: newLook});
        }
    }

    const validHue = hue && !isNaN(Number(hue)) && Number(hue) >= 0 && Number(hue) <= 360;
    const validHue2 = hue2 && !isNaN(Number(hue2)) && Number(hue2) >= 0 && Number(hue2) <= 360;
    const validR2 = r2 && !isNaN(Number(r2)) && Number(r2) >= 20 && Number(r2) <= 45;
    const validN = n && !isNaN(Number(n)) && Number(n) >= 3 && Number(n) <= 10;
    const validRings = rings && !isNaN(Number(rings)) && Number(rings) >= 2 && Number(rings) <= 5;
    // const validLook = look && (look === "left" || look === "center" || look === "right");

    return (
        <div class="h-1/3 p-[10px] flex flex-1 flex-col items-center border border-gray-500" >
            <form class="flex items-center gap-x-[5px]">
                <label>Hue</label>
                <input type="number" 
                onInput={(e) => handleHueChange(e)}
                onKeyDown={handleKeyDown}
                value={hue}
                min={0}
                max={360}
                class={`w-[50px] outline ${!validHue? 'outline outline-red-500 outline-[2px]': 'outline-none'}`}
                ></input>
            </form>
            {/* star */}
            {selectedShape?.props.type === "Star" && (
                <form class="flex items-center gap-x-[5px]">
                    <label>Radius</label>
                    <input type="number" 
                    onInput={handleR2Change}
                    onKeyDown={handleKeyDown}
                    value={r2}
                    min={20}
                    max={45}
                    class={`w-[50px] outline ${!validR2? 'outline outline-red-500 outline-[2px]': 'outline-none'}`}
                    ></input>
                </form>
            )}
            {selectedShape?.props.type === "Star" && (
                <form class="flex items-center gap-x-[5px]">
                    <label>Points</label>
                    <input type="number" 
                    onInput={handleNChange}
                    onKeyDown={handleKeyDown}
                    value={n}
                    min={3}
                    max={10}
                    class={`w-[50px] outline ${!validN? 'outline outline-red-500 outline-[2px]': 'outline-none'}`}
                    ></input>
                </form>
            )}
            {/* bullseye */}
            {selectedShape?.props.type === "Bullseye" && (
                <form class="flex items-center gap-x-[5px]">
                    <label>Hue2</label>
                    <input type="number" 
                    onInput={(e) => handleHue2Change(e)}
                    onKeyDown={handleKeyDown}
                    value={hue2}
                    min={0}
                    max={360}
                    class={`w-[50px] outline ${!validHue2? 'outline outline-red-500 outline-[2px]': 'outline-none'}`}
                    ></input>
                </form>
            )}
            {selectedShape?.props.type === "Bullseye" && (
                <form class="flex items-center gap-x-[5px]">
                    <label>Rings</label>
                    <input type="number" 
                    onInput={handleRingsChange}
                    onKeyDown={handleKeyDown}
                    value={rings}
                    min={2}
                    max={5}
                    class={`w-[50px] outline ${!validRings? 'outline outline-red-500 outline-[2px]': 'outline-none'}`}
                    ></input>
                </form>
            )}
            {/* cat */}
            {selectedShape?.props.type === "Cat" && (
            <form class="flex items-center gap-x-[5px]">
                <label>Look</label>
                <select class="min-w-[85px]" 
                onChange={handleLookChange} 
                defaultValue="left"
                value={look}
                >
                    <option value="left">left</option>
                    <option value="center">center</option>
                    <option value="right">right</option>
                </select>
            </form>
            )}
        </div>
    );
}
