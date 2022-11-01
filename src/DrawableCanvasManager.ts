interface Point {
    x: number;
    y: number;
    lineWidth: number;
    color: string;
}

interface Coordinate {
    x: number;
    y: number;
}

export class DrawableCanvasManager {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private clickX: number[] = [];
    private clickY: number[] = [];
    private clickDrag: boolean[] = [];
    private points: Point[] = [];
    private isPressed: boolean;
    private strokeHistory: object[] = [];

    constructor(canvas: HTMLCanvasElement) {
        if (canvas == null) throw Error("Canvas cannot be null.");
        let context = canvas.getContext("2d");
        if (context == null) throw Error("Cannot create a drawing context.");
        
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "black";
        context.lineWidth = 2;

        this.canvas = canvas;
        this.context = context;
        this.isPressed = false;

        this.createUserEvents();
    }

    private createUserEvents() {
        let canvas = this.canvas;

        canvas.addEventListener("mousedown", this.pressEventHandler);
        canvas.addEventListener("touchstart", this.pressEventHandler);

        canvas.addEventListener("mousemove", this.moveEventHandler);
        canvas.addEventListener("touchmove", this.moveEventHandler);

        canvas.addEventListener("mouseup", this.releaseEventHandler);
        canvas.addEventListener("touchend", this.releaseEventHandler);
        canvas.addEventListener("touchleave", this.releaseEventHandler);

        canvas.addEventListener("mouseout", this.cancelEventHandler);
        canvas.addEventListener("touchcancel", this.cancelEventHandler);
    }

    /**
     * This function takes in an array of points and draws them onto the canvas.
     * @param {array} stroke array of points to draw on the canvas
     * @return {void}
     */
    private draw(stroke: Point[]) {
        this.context.strokeStyle = "black";
        this.context.lineCap = "round";
        this.context.lineJoin = "round";

        const l = stroke.length - 1
        if (stroke.length >= 3) {
            const xc = (stroke[l].x + stroke[l - 1].x) / 2
            const yc = (stroke[l].y + stroke[l - 1].y) / 2
            this.context.lineWidth = stroke[l - 1].lineWidth
            this.context.quadraticCurveTo(stroke[l - 1].x, stroke[l - 1].y, xc, yc)
            this.context.stroke()
            this.context.beginPath()
            this.context.moveTo(xc, yc)
        } else {
            const point = stroke[l];
            this.context.lineWidth = point.lineWidth
            this.context.strokeStyle = point.color
            this.context.beginPath()
            this.context.moveTo(point.x, point.y)
            this.context.stroke()
        }
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
    }

    private clearEventHandler = () => {
        this.clearCanvas();
    }

    private cancelEventHandler = () => {
        this.isPressed = false;
    }

    private getCurrentCoordinates = (e: MouseEvent | TouchEvent) : Coordinate  => {
        let mouseX = (e as TouchEvent).changedTouches ?
            (e as TouchEvent).changedTouches[0].pageX :
            (e as MouseEvent).pageX;
        let mouseY = (e as TouchEvent).changedTouches ?
            (e as TouchEvent).changedTouches[0].pageY :
            (e as MouseEvent).pageY;
        mouseX -= this.canvas.offsetLeft;
        mouseY -= this.canvas.offsetTop;
        return { x: mouseX, y: mouseY };
    }

    private getTouchPressure = (e: MouseEvent | TouchEvent): number => {
        let pressure = 0.1;
        const touches = (e as TouchEvent).changedTouches;
        if (touches) {
            pressure = touches[0].force;
            console.info(`Presure: ${pressure}`);
        } else {
            pressure = 1.0;
        }
        return pressure;
    }

    private pressEventHandler = (e: MouseEvent | TouchEvent) => {
        const coords = this.getCurrentCoordinates(e);
        const pressure = this.getTouchPressure(e);
        const lineWidth = Math.log(pressure + 1) * 5;

        this.isPressed = true;

        this.points.push({ x: coords.x, y: coords.y, lineWidth: lineWidth, color: "black" })
        this.draw(this.points);
    }

    private moveEventHandler = (e: MouseEvent | TouchEvent) => {
        if (!this.isPressed) return;
        const coords = this.getCurrentCoordinates(e);
        const pressure = this.getTouchPressure(e);
        const lineWidth = (Math.log(pressure + 1) * 10 * 0.2 + 1 * 0.8)
        
        this.points.push({ x: coords.x, y: coords.y, lineWidth: lineWidth, color: "black" })
        this.draw(this.points);
        e.preventDefault();
    }

    private releaseEventHandler = () => {
        this.isPressed = false;
        this.points = [];
    }

}