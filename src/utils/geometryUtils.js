import {getCombinations, joinArrays} from "./generalUtils";
import {Point, Triangle} from "../sketches/sketch";

export function checkPointInsideCircle(referenceNode, nodeToCompare, radius) {
    const square_dist = Math.sqrt(Math.pow((referenceNode.x - nodeToCompare.x), 2) + Math.pow((referenceNode.y - nodeToCompare.y), 2));
    return square_dist <= radius
}

export function squareDistanceBetweenPoints(nodeA, nodeB) {
    // (xA − xB)2 + (yA − yB)2
    return Math.pow((nodeA.x - nodeB.x), 2) + Math.pow((nodeA.y - nodeB.y), 2)
}

export function nodesThatListenedMessageWithRespectToRadius(referenceNode, nodes, oneHop, message) {
    let response = {
        oneHopeNeighbors: [],
        twoHopeNeighbors: []
    };
    nodes.forEach((node, index) => {
        if (referenceNode !== index) {
            if (checkPointInsideCircle(nodes[referenceNode], node, node.sensingRate)) {
                response.oneHopeNeighbors.push(index)
            }
            if (checkPointInsideCircle(nodes[referenceNode], node, 2 * node.sensingRate)) {
                response.twoHopeNeighbors.push(index)
            }
        }
    });
    return response
};

export function nodesThatCoverCircumCenter(circumCenter, nodes) {
    let response = [];
    nodes.forEach((node) => {
        if (checkPointInsideCircle(node, circumCenter, node.sensingRate)) {
            response.push(node)
        }
    });
    return response
};


//
// export function coverageHoleDetection(nodeList) {
//     let i = 0;
//     const nodes = nodeList.filter((node) => node.active);
//     // Step 1: Select any node X randomly as a reference node;
//     const referenceNodes = nodes.filter((val) => val.isReference).map((valM) => valM.id);
//     const X = referenceNodes[0];
//     // Step 2: Find one and two-hop neighbors of X;
//     const {oneHopeNeighbors, twoHopeNeighbors} = this.nodesThatListenedMessageWithRespectToRadius(X, nodes, true, "Hello");
//     // Assign those nodes to set N
//     const N = joinArrays(oneHopeNeighbors, twoHopeNeighbors);
//     const nodeX = nodes[X];
//
//     // Step 3: Select nodes from set N whose y-coordinate >= b; Assign those nodes to set Nu
//     const N_u = N.map((val) => nodes[val]).filter((val) => val.y <= nodeX.y);
//
//     // Step 4: Arrange nodes of Nu with their x-coordinate in ascending order and put them in a new set Nux,
//     const N_uX = N_u.sort(function (a, b) {
//         return a.x - b.x
//     });
//     const firstN_uX = N_uX.length > 0 ? N_uX[0] : 0;
//
//     // Step 5: Select nodes from set N whose y-coordinate < b; Assign those nodes to set Nd;
//     const N_d = N.map((val) => nodes[val]).filter((val) => val.y > nodeX.y);
//
//     // Step 6: Arrange nodes of Nd with their x-coordinate in descending order and put them in a new set Ndx
//     const N_dX = N_d.sort(function (a, b) {
//         return b.x - a.x
//     });
//     const combiNUx = getCombinations(N_u, 2);
//     console.log("combiNUx")
//     console.log(combiNUx)
//
//     // Step 7: Select 1st two nodes Ai and Aj from Nux such that x-coordinate of Ai < Aj
//     let isFirstTime = true;
//     if (N_uX.length >= 2) {
//         do {
//             console.log("Entro!!");
//             let Ai = N_uX[0];
//             let Aj = N_uX[1];
//             this.findHoleBetweenReferenceNodeAndPairNeighbors(nodeX, Ai, Aj);
//             // Step 13: Update Nux’Nux􏰁fAig
//             N_uX.shift();
//             const whileCond = N_uX.length !== 1;
//             i++;
//         } while (N_uX.length !== 1);
//     } else {
//         console.log("X");
//         console.log(nodeX)
//         const Z = new Point(0, 0)
//         console.log("%cThere exists a hole around the reference node " + nodeX.id + "", "color: red; font-size:15px;");
//         this.props.addCoverageHole(nodeX.id, Z);
//     }
//
//     // Step 14: Choose the 1st node Ai of Ndx and last balance node Aj of Nux;
//     if (N_dX.length > 0) {
//         do {
//             let Ai = 0;
//             let Aj = 0;
//             if (isFirstTime && N_uX.length > 0) {
//                 Ai = N_dX[0];
//                 Aj = N_uX[0];
//                 this.findHoleBetweenReferenceNodeAndPairNeighbors(nodeX, Ai, Aj);
//             } else if (N_dX.length > 1) {
//                 Ai = N_dX[0];
//                 Aj = N_dX[1];
//                 this.findHoleBetweenReferenceNodeAndPairNeighbors(nodeX, Ai, Aj);
//             }
//
//             if (isFirstTime) {
//                 isFirstTime = false
//             } else {
//                 N_dX.shift()
//             }
//
//
//         } while (N_dX.length !== 1);
//     }
//     if (N_dX.length > 0) {
//         this.findHoleBetweenReferenceNodeAndPairNeighbors(nodeX, N_dX[0], firstN_uX);
//     }
//
//
//     this.props.coverageHoleDetectionPhaseCreator();
// };
//
// export function findHoleBetweenReferenceNodeAndPairNeighbors(referenceNode, Ai, Aj) {
//
//     const triangle = new Triangle(referenceNode, Ai, Aj);
//     const {nodes, sensingRate} = this.props;
//     console.log("--------------------------------------------");
//     console.log("Triangle between reference node and points:");
//     console.log(referenceNode.id);
//     console.log(Ai.id);
//     console.log(Aj.id);
//     console.log("--------------------------------------------");
//     // Step 8: Compute circum radius R and circum center Z of triangle XAiAj;
//     const R = triangle.getCircumRadius();
//     const Z = triangle.getCircumCenter();
//     console.log("Circum center: ", Z);
//     console.log("Circum Raduis: ", R);
//     console.log("Sensing rate: ", sensingRate);
//     this.props.drawCircumCenterCreator(Z);
//     this.props.addCoverageHole(referenceNode.id, Z);
//     // Step 9: Verify if XAiAj is an acute or obtuse triangle;
//     const isObtuse = triangle.isObtuse();
//     const isAcute = triangle.isAcute();
//     if (isThereCoverageHole(R, Z, isObtuse, isAcute, referenceNode.sensingRate)) {
//
//     }
//
//     // Step 10: If (X forms an acute triangle with its neighbors Ai and Aj)
//     if (isAcute) {
//         if (R < referenceNode.sensingRate) {
//             console.log("%cNo hole exists around the reference node " + referenceNode.id + "", "color: green; font-size:15px;")
//         } else {
//             console.log("%cThere exists a hole around the reference node " + referenceNode.id + "", "color: red; font-size:15px;");
//
//         }
//     }
//     if (isObtuse) {
//         if (R < referenceNode.sensingRate) {
//             console.log("%cNo hole exists around the reference node " + referenceNode.id + "", "color: green; font-size:15px;")
//         } else {
//             // Check if circum center Z is covered by any other sensor
//             let noHoleDetected = this.nodesThatCoverCircumCenter(Z, nodes).length > 0;
//             if (noHoleDetected) {
//                 console.log("No hole exists around the reference node " + referenceNode.id + "", "color: green; font-size:15px;")
//             } else {
//                 console.log("%cThere exists a hole around the reference node " + referenceNode.id + "", "color: red; font-size:15px;");
//                 this.props.addCoverageHole(referenceNode.id, Z);
//             }
//         }
//     }
//
// }
//
// export function isThereCoverageHole(R, Z, isObtuse, isAcute, sensingRate,) {
//     let response = false;
//     // Step 10: If (X forms an acute triangle with its neighbors Ai and Aj)
//     if (isAcute) {
//         if (R < sensingRate) {
//             console.log("%cNo hole exists around the reference node " + referenceNode.id + "", "color: green; font-size:15px;")
//         } else {
//             console.log("%cThere exists a hole around the reference node " + referenceNode.id + "", "color: red; font-size:15px;");
//             response = true
//         }
//     }
//     if (isObtuse) {
//         if (R < referenceNode.sensingRate) {
//             console.log("%cNo hole exists around the reference node " + referenceNode.id + "", "color: green; font-size:15px;")
//         } else {
//             // Check if circum center Z is covered by any other sensor
//             let noHoleDetected = this.nodesThatCoverCircumCenter(Z, nodes).length > 0;
//             if (noHoleDetected) {
//                 console.log("No hole exists around the reference node " + referenceNode.id + "", "color: green; font-size:15px;")
//             } else {
//                 console.log("%cThere exists a hole around the reference node " + referenceNode.id + "", "color: red; font-size:15px;");
//                 response = true
//             }
//         }
//     }
//     return response
// }
