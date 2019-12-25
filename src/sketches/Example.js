import {
    checkClickInside,
    distanceBetweenTwoPoints,
    nodesThatListenedMessageWithRespectToRadius,
    Point,
    squareDistanceBetweenPoints
} from "../utils/geometryUtils";
import {
    Node
} from "../utils/geometryUtils";
import {joinArrays} from "../utils/generalUtils";


export default function exampleAlgo(p) {
    const sensingRate = 60;
    const paddingx = 150;
    const paddingy = 70;
    let firstTime = true;
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
        if (props.clickOnNodes) {
            p.clickOnNodes = props.clickOnNodes;
        }
        if (props.sendNeighbors) {
            p.sendNeighbors = props.sendNeighbors;
        }
    };

    p.draw = function () {
        p.background(200);
        if (nodes) {
            nodes.forEach((node, i) => {
                if (node.active) {
                    p.fill('rgba(0,0,0, 1)');
                    p.ellipse(node.x, node.y, 6, 6);
                    p.text('Node ' + (i) + '', node.x - 16, node.y + 15);
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
        if (p.circumCenter) {
            // p.ellipse(p.circumCenter.x, p.circumCenter.y, 6, 6);
            // p.text('Circum center', p.circumCenter.x - 16, p.circumCenter.y + 15);
        }
        if(firstTime && p.sendNeighbors){
            const {oneHopeNeighbors, twoHopeNeighbors} = nodesThatListenedMessageWithRespectToRadius(0, nodes, nodes[0].sensingRate);
            console.log("oneHopeNeighbors",oneHopeNeighbors);
            console.log("twoHopeNeighbors",twoHopeNeighbors);
            p.sendNeighbors(nodes[0], oneHopeNeighbors, twoHopeNeighbors);
            firstTime = false
        }
        if (p.clickOnNodes) {
            p.text('Click on a node to set it as reference node', 10, 15);
        }
    };

    p.mousePressed = function () {
        if (p.clickOnNodes) {
            if (checkClickInside(p.mouseX, p.mouseY, 600, 350)) {
                let point = new Point(p.mouseX, p.mouseY);
                let min = 1000000000;
                let i = 0;
                nodes.forEach((node, index) => {
                    const distance = distanceBetweenTwoPoints(node, point);
                    if (distance < min) {
                        min = distance;
                        i = index
                    }
                });
                if (min < 20) {
                    nodes.forEach((node, index) => {
                        node.isReference = false;
                    });
                    nodes[i].isReference = true;
                    const {oneHopeNeighbors, twoHopeNeighbors} = nodesThatListenedMessageWithRespectToRadius(i, nodes, nodes[0].sensingRate);
                    console.log("oneHopeNeighbors",oneHopeNeighbors)
                    console.log("twoHopeNeighbors",twoHopeNeighbors)
                    p.sendNeighbors(nodes[i], oneHopeNeighbors, twoHopeNeighbors);
                }
            }
        }

    };

    p.windowResized = function () {
        // let div1 = document.getElementById("paper");
        // p.resizeCanvas(div1.offsetWidth - 60, 300);
    }
};
