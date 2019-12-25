import {
    checkClickInside,
    distanceBetweenTwoPoints,
    nodesThatListenedMessageWithRespectToRadius,
    Point,
    squareDistanceBetweenPoints, Triangle
} from "../utils/geometryUtils";
import {
    Node
} from "../utils/geometryUtils";
import {joinArrays} from "../utils/generalUtils";


export default function TriangleSketch(p) {
    const sensingRate = 60;
    const paddingx = 150;
    const paddingy = 70;

    p.setup = function () {
        console.log("Coverage Holes");
        // console.log(div1.offsetWidth - 90);
        p.createCanvas(600, 350);
        p.fill('black');
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        console.log("Will recevive props");
        console.log(props);
        if (props.triangle) {
            p.triangle = props.triangle;
            p.nodes = [p.triangle.pointA, p.triangle.pointB, p.triangle.pointC]
        }
        if (props.computeCircumData && p.nodes && p.nodes.length > 2) {
            p.computeCircumData = props.computeCircumData;
            p.R = p.triangle.getCircumRadius();
            p.Z = p.triangle.getCircumCenter();
            p.isObtuse = p.triangle.isObtuse();
            p.isAcute = p.triangle.isAcute();
            p.angles = p.triangle.getAngles();
        }
        if (props.drawTriangle) {
            p.drawTriangle = props.drawTriangle;
            // p.nodes.forEach((n) => n.y += props.padding)
        }
        if (props.drawCircle) {
            p.drawCircle = props.drawCircle;
            // p.nodes.forEach((n) => n.y += props.padding)
        }
        if (props.drawRadiusLine){
            p.drawRadiusLine = props.drawRadiusLine
        }
        if (props.otherNodes) {
            p.nodes = props.otherNodes
        }
        if(props.modal){
            p.resizeCanvas(250, 250);
        }
        if(props.idLine){
            p.idLine = props.idLine
        }
    };

    p.draw = function () {
        p.background(200);
        if (p.triangle && p.nodes) {
            p.nodes.forEach((node, i) => {
                if (node.active) {
                    p.fill('rgba(0,0,0, 1)');
                    p.ellipse(node.x, node.y, 6, 6);
                    p.text('Node ' + (node.id) + '', node.x - 16, node.y + 15);
                    p.stroke('black');
                    p.fill('rgba(0,255,0, 0.15)');

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
        if (p.computeCircumData) {
            p.ellipse(p.Z.x, p.Z.y, 6, 6);
            p.text('Z', p.Z.x - 16, p.Z.y + 15);
            p.fill('rgba(0,255,0, 0.00)');
            if (p.drawCircle) {
                p.circle(p.Z.x, p.Z.y, 2 * p.R);
            }
            if(p.drawRadiusLine){
                const idLine = p.idLine || 0;
                p.line(p.nodes[idLine].x, p.nodes[idLine].y, p.Z.x, p.Z.y);
            }
        }
        if (p.drawTriangle) {
            p.line(p.nodes[0].x, p.nodes[0].y, p.nodes[1].x, p.nodes[1].y);
            p.line(p.nodes[1].x, p.nodes[1].y, p.nodes[2].x, p.nodes[2].y);
            p.line(p.nodes[2].x, p.nodes[2].y, p.nodes[0].x, p.nodes[0].y);
        }
    };

    p.mousePressed = function () {

    };

    p.windowResized = function () {
        // let div1 = document.getElementById("paper");
        // p.resizeCanvas(div1.offsetWidth - 60, 300);
    }
};
