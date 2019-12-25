import {squareDistanceBetweenPoints} from "../utils/geometryUtils";
import {
    Node
} from "../utils/geometryUtils";

function checkClickInside(mouseX, mouseY, canvasWidth, canvasHeight) {
    return mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight
}

export default function sketchCircumRadiusCenterNode(p) {
    const sensingRate = 60;
    const padding = 20;
    let nodes = [
        new Node(190 - padding, 90, 0, sensingRate, true, false),
        new Node(130 - padding, 180, 1, sensingRate),
        new Node(230 - padding, 185, 2, sensingRate),
    ];
    p.setup = function () {
        console.log("Coverage Holes");
        // console.log(div1.offsetWidth - 90);
        p.createCanvas(350, 350);
        p.fill('black');
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    };

    p.draw = function () {
        p.background(200);
        if (nodes) {
            nodes.forEach((node, i) => {
                if (node.active) {
                    p.stroke('black');
                    p.ellipse(node.x, node.y, 6, 6);
                    p.stroke('black');
                    p.text('Node ' + (i) + '', node.x - 16, node.y + 15);
                    p.stroke('black');
                    p.fill('rgba(0,255,0, 0.10)');

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
                p.line(nodes[0].x, nodes[0].y, nodes[1].x, nodes[1].y);
                p.line(nodes[1].x, nodes[1].y, nodes[2].x, nodes[2].y);
                p.line(nodes[2].x, nodes[2].y, nodes[0].x, nodes[0].y);
                p.stroke('black');
                p.fill('rgba(0,0,0, 0.9)');
                p.ellipse(165, 150, 10, 10);
                p.text('Z', 160, 150 + 18);
                // p.fill('rgba(236,20,21,0.9)');
                p.stroke('rgba(236,20,21,0.9)');
                p.line(165, 150, nodes[0].x, nodes[0].y);
                p.text('R', 170, 120 + 18);



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
