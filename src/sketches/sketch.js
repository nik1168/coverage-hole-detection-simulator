import {squareDistanceBetweenPoints} from "../utils/geometryUtils";

export let timesClicked = 0;

function checkClickInside(mouseX, mouseY, canvasWidth, canvasHeight) {
    return mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight
}

export default function sketch(p) {
    let div1 = document.getElementById("paper");
    let div2 = document.getElementById("gridWidth");
    const padding = 0;
    const height = 450;
    const width = div2.offsetWidth;
    p.setup = function () {

        // console.log("div1 width");
        // console.log(width - padding);
        // p.createCanvas(div1.offsetWidth, div1.offsetHeight);
        p.createCanvas(width - padding, height);
        p.fill('black');
        // let canvas = p.createCanvas(canvasWidth, canvasHeight);
        // canvas.parent('sketchH1');
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        // console.log("myCustomRedrawAccordingToNewPropsHandler");
        // console.log(props);
        if (props.getCoords) {
            p.sendCoords = props.getCoords;
        }
        if (props.nodes) {
            p.nodes = props.nodes
        }
        if (props.addingNodes !== undefined) {
            p.addingNodes = props.addingNodes
        }
        if (props.addingNeighbors !== undefined) {
            p.addingNeighbors = props.addingNeighbors
        }
        if (props.circumCenter) {
            p.circumCenter = props.circumCenter
        }
        if (props.sensingRate) {
            p.sensingRange = props.sensingRate
        }
        if (props.addingFailureNode) {
            p.addingFailureNode = props.addingFailureNode
        }
    };

    p.draw = function () {
        p.background(200);
        if (p.nodes) {
            p.nodes.forEach((node, i) => {
                if (node.active) {
                    p.ellipse(node.x, node.y, 6, 6);
                    p.text('Node ' + (node.id) + '', node.x - 16, node.y + 15);
                    p.stroke('black');
                    p.fill('rgba(0,255,0, 0.25)');

                    p.circle(node.x, node.y, p.sensingRange * 2);
                    if (node.isReference) {
                        p.fill('rgba(163, 255, 232, 0.25)');
                        p.circle(node.x, node.y, 2 * p.sensingRange * 2)
                    }
                    if (node.coverageHolesAroundNode.length > 0) {
                        // console.log("coverage holes!!!")
                        node.coverageHolesAroundNode.forEach((val, index) => {
                            p.ellipse(val.circumCenter.x, val.circumCenter.y, 6, 6);
                            p.text('cc: ' + index + '', val.circumCenter.x - 16, val.circumCenter.y + 15);
                        })
                    }
                } else {
                    p.ellipse(node.x, node.y, 6, 6);
                    p.text('Node ' + (i) + '', node.x - 16, node.y + 15);
                    p.stroke('black');
                    p.fill('rgba(255,0,0, 0.15)');
                    p.circle(node.x, node.y, p.sensingRange * 2);
                }
            });
        }
        if (p.circumCenter) {
            // p.ellipse(p.circumCenter.x, p.circumCenter.y, 6, 6);
            // p.text('Circum center', p.circumCenter.x - 16, p.circumCenter.y + 15);
        }
    };

    p.mousePressed = function () {
        if (checkClickInside(p.mouseX, p.mouseY, width - padding, height)) {
            p.sendCoords(p.mouseX, p.mouseY);
        }
    };

    p.windowResized = function () {
        const padding = 0;
        const height = 450;
        const width = div2.offsetWidth;
        p.resizeCanvas(width - padding, height);
    }
};
