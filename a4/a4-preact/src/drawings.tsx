import { BullseyeProps, CatProps, SquareProps, StarProps } from "./state";

export const square = (gc: CanvasRenderingContext2D, props: SquareProps) => {
    gc.fillStyle = `hsl(${props.hue}, 100%, 50%)`;
    gc.fillRect(-50, -50, 100, 100);
};

export const star = (gc: CanvasRenderingContext2D, props: StarProps) => {
    if (!props.n || !props.r2 || !props.r1) return;
    const centerX = 0;
    const centerY = 0;
    let tempouter = props.r2 / 100 * gc.canvas.width;
    let tempinner = props.r1 / 100 * gc.canvas.width;
    gc.beginPath();
    
    for(var i = 1; i <= props.n * 2; i++) {
        var angle = i * (Math.PI * 2) / (props.n * 2);
        if(i % 2 == 0) {
            var xDest = centerX + (tempouter * Math.sin(angle));
            var yDest = centerY - (tempouter * Math.cos(angle));
        } else {
            var xDest = centerX + (tempinner * Math.sin(angle));
            var yDest = centerY - (tempinner * Math.cos(angle));
        }
        gc.lineTo(xDest, yDest);
    }
    gc.closePath();
    
    gc.fillStyle = `hsl(${props.hue}, 100%, 50%)`;
    gc.fill();
    gc.stroke();

};

export const bullseye = (gc: CanvasRenderingContext2D, props: BullseyeProps) => {
    if (!props.rings) return;
    gc.strokeStyle = "1px solid grey";
    gc.lineWidth = 5;

    for (let i = 0; i < props.rings; i++) {
        const size = gc.canvas.width / 2 - 3;
        gc.fillStyle = `hsl(${(i % 2)? props.hue: props.hue2}, 100%, 50%)`;
        // outline
        gc.beginPath();
        gc.arc(0, 0, size - size / props.rings * i, 0, 2 * Math.PI);
        gc.stroke();
        // fill
        gc.beginPath();
        gc.arc(0, 0, size - size / props.rings * i, 0, 2 * Math.PI);
        gc.fill();
    }
};

export const cat = (gc: CanvasRenderingContext2D, props: CatProps) => {
    gc.fillStyle = `hsl(${props.hue}, 100%, 50%)`;
    gc.strokeStyle = "white";
    gc.lineWidth = 8;

    // head white outline
    gc.beginPath();
    gc.arc(0, 0, 40, 0, 2 * Math.PI);
    gc.stroke();

    // ears
    gc.beginPath();
    // left
    gc.moveTo(-40, -48);
    gc.lineTo(-8, -36);
    gc.lineTo(-35, -14);
    gc.closePath();
    // right
    gc.moveTo(40, -48);
    gc.lineTo(8, -36);
    gc.lineTo(35, -14);
    gc.closePath();
    gc.stroke();
    gc.fill();

    // head
    gc.beginPath();
    gc.arc(0, 0, 40, 0, 2 * Math.PI);
    gc.fill();

    // whites of eyes
    gc.strokeStyle = "black";
    gc.fillStyle = "white";
    gc.lineWidth = 1;
    gc.beginPath();
    // left
    gc.ellipse(-16, -9, 8, 14, 0, 0, Math.PI * 2);
    gc.fill();
    gc.stroke();
    // right
    gc.beginPath();
    gc.ellipse(16, -9, 8, 14, 0, 0, Math.PI * 2);
    gc.fill();
    gc.stroke();

    // eyeballs
    gc.fillStyle = "black";
    gc.beginPath();
    if (props.look === "left") {
        // left
        gc.arc(-16, -9, 5, 0, Math.PI * 2);
        gc.fill();
        // right
        gc.beginPath();
        gc.arc(16, -9, 5, 0, Math.PI * 2);
        gc.fill();
    } else if (props.look === "right") {
        // left
        gc.arc(-16-3, -9, 5, 0, Math.PI * 2);
        gc.fill();
        // right
        gc.beginPath();
        gc.arc(16-3, -9, 5, 0, Math.PI * 2);
        gc.fill();
    } else if (props.look === "center") {
        // left
        gc.arc(-16+3, -9, 5, 0, Math.PI * 2);
        gc.fill();
        // right
        gc.beginPath();
        gc.arc(16+3, -9, 5, 0, Math.PI * 2);
        gc.fill();
    }

};