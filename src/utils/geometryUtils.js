import {getCombinations, joinArrays} from "./generalUtils";


export class Node {
    constructor(x, y, id = 0, sensingRate = 80, isActive = true, isReference = false) {
        this.x = x;
        this.y = y;
        this.sensingRate = sensingRate;
        this.oneHopeNeighbors = [];
        this.twoHopeNeighbors = [];
        this.coverageHolesAroundNode = [];
        this.active = isActive;
        this.isReference = isReference;
        this.id = id
    }
}

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Triangle {
    rightAngle = 1.571; // 90 degrees equivalence
    constructor(nodeA, nodeB, nodeC) {
        this.pointA = nodeA;
        this.pointB = nodeB;
        this.pointC = nodeC;
    }

    getArea() {
        return Math.abs(0.5 * (this.pointA.x * (this.pointB.y - this.pointC.y) + this.pointB.x * (this.pointC.y - this.pointA.y) + this.pointC.x * (this.pointA.y - this.pointB.y)))
    }

    getDistanceAB() {
        return Math.hypot(this.pointB.x - this.pointA.x, this.pointB.y - this.pointA.y)
    }

    getDistanceAC() {
        return Math.hypot(this.pointC.x - this.pointA.x, this.pointC.y - this.pointA.y)
    }

    getDistanceBC() {
        return Math.hypot(this.pointC.x - this.pointB.x, this.pointC.y - this.pointB.y)
    }

    getCircumRadius() {
        return (this.getDistanceAB() * this.getDistanceAC() * this.getDistanceBC()) / (4 * this.getArea())
    }

    getAngleA() {
        return Math.asin(this.getDistanceAB() / (2 * this.getCircumRadius()))
    }

    getAngleC() {
        return Math.asin(this.getDistanceAC() / (2 * this.getCircumRadius()))
    }

    getAngleB() {
        return Math.asin(this.getDistanceBC() / (2 * this.getCircumRadius()))
    }

    getAngleADegree() {
        return Math.asin(this.getDistanceAB() / (2 * this.getCircumRadius())) * (180 / Math.PI)
    }

    getAngleCDegree() {
        return Math.asin(this.getDistanceAC() / (2 * this.getCircumRadius())) * (180 / Math.PI)
    }

    getAngleBDegree() {
        return Math.asin(this.getDistanceBC() / (2 * this.getCircumRadius())) * (180 / Math.PI)
    }

    getAngles() {
        const a2 = squareDistanceBetweenPoints(this.pointB, this.pointC);
        const b2 = squareDistanceBetweenPoints(this.pointA, this.pointC);
        const c2 = squareDistanceBetweenPoints(this.pointA, this.pointB);

        const a = Math.sqrt(a2);
        const b = Math.sqrt(b2);
        const c = Math.sqrt(c2);

        const alpha = Math.acos((b2 + c2 - a2) / (2 * b * c));
        const betta = Math.acos((a2 + c2 - b2) / (2 * a * c));
        const gamma = Math.acos((a2 + b2 - c2) / (2 * a * b));
        return {alpha, betta, gamma}
    }

    isObtuse() {
        const {alpha, betta, gamma} = this.getAngles();
        const isA = alpha > this.rightAngle;
        const isB = betta > this.rightAngle;
        const isC = gamma > this.rightAngle;
        return isA || isB || isC
    }

    isAcute() {
        const {alpha, betta, gamma} = this.getAngles();
        const isA = alpha < this.rightAngle;
        const isB = betta < this.rightAngle;
        const isC = gamma < this.rightAngle;
        return isA && isB && isC
    }

    // Function to find the line given two points
    lineFromNodes(nodeA, nodeB) {
        const a = nodeB.y - nodeA.y;
        const b = nodeA.x - nodeB.x;
        const c = a * (nodeA.x) + b * (nodeA.y);
        return {
            a,
            b,
            c
        }
    }

    // Function which converts the input line to its
    // perpendicular bisector. It also inputs the points
    // whose mid-point lies on the bisector
    perpendicularBisectorFromLine(nodeA, nodeB, oa, ob, oc) {
        const mid_point = new Point((nodeA.x + nodeB.x) / 2,
            (nodeA.y + nodeB.y) / 2);
        // c = -bx + ay
        const c = -ob * (mid_point.x) + oa * (mid_point.y);
        const temp = oa;
        const a = -ob;
        const b = temp;
        return {
            a,
            b,
            c
        }
    }

    // Returns the intersection point of two lines
    lineLineIntersection(a1, b1, c1, a2, b2, c2) {
        const determinant = a1 * b2 - a2 * b1;
        if (determinant === 0) {
            // The lines are parallel. This is simplified
            // by returning a pair of FLT_MAX
            return new Point(Number.MAX_VALUE, Number.MAX_VALUE);
        } else {
            const x = (b2 * c1 - b1 * c2) / determinant;
            const y = (a1 * c2 - a2 * c1) / determinant;
            return new Point(x, y);
        }
    }

    getCircumCenter(A = this.pointA, B = this.pointB, C = this.pointC) {
        // Line AB is represented as ax + by = c
        let resA = this.lineFromNodes(A, B);
        let oa = resA.a;
        let ob = resA.b;
        let oc = resA.c;

        // Line BC is represented as ex + fy = g
        let resB = this.lineFromNodes(B, C);
        let oe = resB.a;
        let of = resB.b;
        let og = resB.c;

        // Converting lines PQ and QR to perpendicular
        // vbisectors. After this, L = ax + by = c
        // M = ex + fy = g
        let {a, b, c} = this.perpendicularBisectorFromLine(A, B, oa, ob, oc);
        let resC = this.perpendicularBisectorFromLine(B, C, oe, of, og);
        let e = resC.a;
        let f = resC.b;
        let g = resC.c;

        // The point of intersection of L and M gives
        // the circumcenter
        const circumcenter =
            this.lineLineIntersection(a, b, c, e, f, g);

        if (circumcenter.x === Number.MAX_VALUE &&
            circumcenter.y === Number.MAX_VALUE) {
            console.log("The two perpendicular bisectors found come parallel");
            console.log("Thus, the given points do not form a triangle and are collinear");
        } else {
            console.log("The circumcenter of the triangle PQR is: ");
            console.log(circumcenter.x, circumcenter.y);
        }
        return circumcenter
    }
}

export function checkPointInsideCircle(referenceNode, nodeToCompare, radius) {
    const square_dist = Math.sqrt(Math.pow((referenceNode.x - nodeToCompare.x), 2) + Math.pow((referenceNode.y - nodeToCompare.y), 2));
    return square_dist <= radius
}

export function squareDistanceBetweenPoints(nodeA, nodeB) {
    // (xA − xB)2 + (yA − yB)2
    return Math.pow((nodeA.x - nodeB.x), 2) + Math.pow((nodeA.y - nodeB.y), 2)
}

export function distanceBetweenTwoPoints(pointA, pointB) {
    return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);
}


export function nodesThatListenedMessageWithRespectToRadius(referenceNode, nodes, sensingRate) {
    let response = {
        oneHopeNeighbors: [],
        twoHopeNeighbors: []
    };
    nodes.forEach((node, index) => {
        if (referenceNode !== index) {
            if (checkPointInsideCircle(nodes[referenceNode], node, sensingRate)) {
                response.oneHopeNeighbors.push(index)
            }
            if (checkPointInsideCircle(nodes[referenceNode], node, 2 * sensingRate)) {
                response.twoHopeNeighbors.push(index)
            }
        }
    });
    return response
}

export function nodesThatCoverCircumCenter(circumCenter, nodes, sensingRange) {
    let response = [];
    nodes.forEach((node) => {
        if (checkPointInsideCircle(node, circumCenter, sensingRange)) {
            response.push(node)
        }
    });
    return response
};

export function checkClickInside(mouseX, mouseY, canvasWidth, canvasHeight) {
    return mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight
}

function getDegree(pointA, pointB) {
    const a2 = squareDistanceBetweenPoints(pointA, pointB);
    return Math.sqrt(a2)
}

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
