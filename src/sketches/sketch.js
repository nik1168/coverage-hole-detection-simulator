import {squareDistanceBetweenPoints} from "../utils/geometryUtils";

export let timesClicked = 0;

function checkClickInside(mouseX, mouseY, canvasWidth, canvasHeight) {
    return mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight
}

export default function sketch(p) {
    let div1 = document.getElementById("paper");
    p.setup = function () {

        console.log("div1 width");
        console.log(div1.offsetWidth - 90);
        // p.createCanvas(div1.offsetWidth, div1.offsetHeight);
        p.createCanvas(div1.offsetWidth - 60, 450);
        p.fill('black');
        // let canvas = p.createCanvas(canvasWidth, canvasHeight);
        // canvas.parent('sketchH1');
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        console.log("myCustomRedrawAccordingToNewPropsHandler");
        console.log(props);
        if (props.getCoords) {
            p.sendCoords = props.getCoords;
        }
        if (props.nodes) {
            p.nodes = props.nodes
        }
        if (props.addingNodes !== undefined) {
            p.addingNodes = props.addingNodes
        }
        if (props.circumCenter) {
            p.circumCenter = props.circumCenter
        }
    };

    p.draw = function () {
        p.background(200);
        if (p.nodes) {
            p.nodes.forEach((node, i) => {
                if (node.active) {
                    p.ellipse(node.x, node.y, 6, 6);
                    p.text('Node ' + (i) + '', node.x - 16, node.y + 15);
                    p.stroke('black');
                    p.fill('rgba(0,255,0, 0.25)');

                    p.circle(node.x, node.y, node.sensingRate * 2);
                    if (node.isReference) {
                        p.fill('rgba(163, 255, 232, 0.25)');
                        p.circle(node.x, node.y, 2 * node.sensingRate * 2)
                    }
                    if (node.coverageHolesAroundNode.length > 0) {
                        // console.log("coverage holes!!!")
                        node.coverageHolesAroundNode.forEach((val, index) => {
                            p.ellipse(val.x, val.y, 6, 6);
                            p.text('cc: ' + index + '', val.x - 16, val.y + 15);
                        })
                    }
                } else {
                    p.ellipse(node.x, node.y, 6, 6);
                    p.text('Node ' + (i) + '', node.x - 16, node.y + 15);
                    p.stroke('black');
                    p.fill('rgba(255,0,0, 0.25)');
                    p.circle(node.x, node.y, node.sensingRate * 2);
                }
            });
        }
        if (p.circumCenter) {
            // p.ellipse(p.circumCenter.x, p.circumCenter.y, 6, 6);
            // p.text('Circum center', p.circumCenter.x - 16, p.circumCenter.y + 15);
        }
    };

    p.mousePressed = function () {
        if (checkClickInside(p.mouseX, p.mouseY, div1.offsetWidth - 60, 600)) {
            p.sendCoords(p.mouseX, p.mouseY);
        }
    };

    p.windowResized = function () {
        let div1 = document.getElementById("paper");
        p.resizeCanvas(div1.offsetWidth - 60, 600);
    }
};
