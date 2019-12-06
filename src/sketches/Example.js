import {squareDistanceBetweenPoints} from "../utils/geometryUtils";
import {
    Node
} from "../utils/geometryUtils";

function checkClickInside(mouseX, mouseY, canvasWidth, canvasHeight) {
    return mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight
}

export default function exampleAlgo(p) {
    const sensingRate = 60;
    const paddingx = 150;
    const paddingy = 70;
    let nodes = [
        new Node(469.4566699123661 - paddingx, 244.0703125 - paddingy, 0, sensingRate, true, true),
        new Node(430 - paddingx, 224.0703125 - paddingy, 1, sensingRate, true),
        new Node(395 - paddingx, 160 - paddingy, 2, sensingRate),
        new Node(550 - paddingx, 196.0703125 - paddingy, 3, sensingRate),
        new Node(560 - paddingx, 285 - paddingy, 4, sensingRate),
        new Node(495 - paddingx, 330 - paddingy, 5, sensingRate),
        new Node(400 - paddingx, 327 - paddingy, 6, sensingRate),
        new Node(370 - paddingx, 261 - paddingy, 7, sensingRate),
    ];

    p.setup = function () {
        console.log("Coverage Holes");
        // console.log(div1.offsetWidth - 90);
        p.createCanvas(600, 350);
        p.fill('black');
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    };

    p.draw = function () {
        p.background(200);
        if (nodes) {
            nodes.forEach((node, i) => {
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
                    // p.ellipse(node.x, node.y, 6, 6);
                    // p.text('Node ' + (i) + '', node.x - 16, node.y + 15);
                    // p.stroke('black');
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

    };

    p.windowResized = function () {
        // let div1 = document.getElementById("paper");
        // p.resizeCanvas(div1.offsetWidth - 60, 300);
    }
};
