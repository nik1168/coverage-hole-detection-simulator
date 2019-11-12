export let timesClicked = 0;

export class Node {
    constructor(x, y, id=0, sensingRate = 80, isActive = true, isReference = false) {
        this.x = x;
        this.y = y;
        this.sensingRate = sensingRate;
        this.oneHopeNeighbors = [];
        this.twoHopeNeighbors = [];
        this.active = isActive;
        this.isReference = isReference;
        this.id = id
    }
}
function checkClickInside(mouseX,mouseY,canvasWidth,canvasHeight){
    return mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight
}
export default function sketch(p) {
    let div1 = document.getElementById("paper");
    p.setup = function () {

        console.log("div1 width");
        console.log(div1.offsetWidth-90);
        // p.createCanvas(div1.offsetWidth, div1.offsetHeight);
        p.createCanvas(div1.offsetWidth-60, 600);
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
        if(props.addingNodes !== undefined){
            p.addingNodes = props.addingNodes
        }
    };

    p.draw = function () {
        p.background(200);
        if(p.nodes){
            for (let i = 0; i < p.nodes.length; i++) {
                p.ellipse(p.nodes[i].x, p.nodes[i].y, 6, 6);
                p.text('Node '+(i+1)+'', p.nodes[i].x-16, p.nodes[i].y+15);
                p.stroke('black');
                p.fill('rgba(0,255,0, 0.25)')
                p.circle(p.nodes[i].x,  p.nodes[i].y, p.nodes[i].sensingRate)
            }
        }
    };

    p.mousePressed = function () {
        if(checkClickInside(p.mouseX,p.mouseY,div1.offsetWidth-60, 600)){
            p.sendCoords(p.mouseX, p.mouseY);
        }
    }

    p.windowResized = function () {
        let div1 = document.getElementById("paper");
        p.resizeCanvas(div1.offsetWidth-60, 600);
    }
};