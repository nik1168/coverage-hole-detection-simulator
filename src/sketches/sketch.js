export let timesClicked = 0;
export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export default function sketch(p) {
    let pointsSegment1 = [];
    let rotation = 0;

    p.setup = function () {
        p.createCanvas(640, 480, p.WEBGL);
        // let canvas = p.createCanvas(canvasWidth, canvasHeight);
        // canvas.parent('sketchH1');
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        console.log("myCustomRedrawAccordingToNewPropsHandler")
        // if (props.rotation) {
        //     rotation = props.rotation * Math.PI / 180;
        // }
        if(props.getCoords){
            p.sendCoords = props.getCoords;
        }
    };

    p.draw = function () {
        p.background(200);
        for (let i = 0; i < pointsSegment1; i++) {
            p.ellipse(pointsSegment1[i].x, pointsSegment1[i].y, 4, 4);
        }
    };

    p.mousePressed = function () {
        p.sendCoords(p.mouseX, p.mouseY);
        timesClicked++;
        console.log("Mouse pressed :)");
        console.log("Sera?")
        pointsSegment1.push(new Point(p.mouseX, p.mouseY));

    };

};