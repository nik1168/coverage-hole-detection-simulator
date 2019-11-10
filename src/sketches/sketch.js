export let timesClicked = 0;

export class Node {
    constructor(x, y, sensingRate = 4) {
        this.x = x;
        this.y = y;
        this.sensingRate = sensingRate;
        this.oneHopeNeighbors = [];
        this.twoHopeNeighbors = [];
    }
}
export default function sketch(p) {

    let rotation = 0;

    p.setup = function () {
        p.createCanvas(640, 480);
        p.fill('black');
        // let canvas = p.createCanvas(canvasWidth, canvasHeight);
        // canvas.parent('sketchH1');
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        console.log("myCustomRedrawAccordingToNewPropsHandler");
        if(props.getCoords){
            p.sendCoords = props.getCoords;
        }
        if(props.nodes){
            p.nodes = props.nodes
        }
    };

    p.draw = function () {
        p.background(200);
        console.log("p.nodes")
        console.log(p.nodes)
        if(p.nodes){
            for (let i = 0; i < p.nodes.length; i++) {
                p.ellipse(p.nodes[i].x, p.nodes[i].y, 4, 4);
            }
        }
    };

    p.mousePressed = function () {
        p.sendCoords(p.mouseX, p.mouseY);
        timesClicked++;
        // p.pointsSegment1.push(new Point(p.mouseX, p.mouseY));
    };

};