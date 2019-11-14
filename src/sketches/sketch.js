export let timesClicked = 0;

export class Node {
    constructor(x, y, id = 0, sensingRate = 80, isActive = true, isReference = false) {
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

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Triangle {
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

    findCircumCenter(A = this.pointA, B = this.pointB, C = this.pointC) {
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

    }
}

function checkClickInside(mouseX, mouseY, canvasWidth, canvasHeight) {
    return mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight
}

export default function sketch(p) {
    let div1 = document.getElementById("paper");
    p.setup = function () {

        console.log("div1 width");
        console.log(div1.offsetWidth - 90);
        // p.createCanvas(div1.offsetWidth, div1.offsetHeight);
        p.createCanvas(div1.offsetWidth - 60, 600);
        p.fill('black');
        // let canvas = p.createCanvas(canvasWidth, canvasHeight);
        // canvas.parent('sketchH1');
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        console.log("myCustomRedrawAccordingToNewPropsHandler");
        if (props.getCoords) {
            p.sendCoords = props.getCoords;
        }
        if (props.nodes) {
            p.nodes = props.nodes
        }
        if (props.addingNodes !== undefined) {
            p.addingNodes = props.addingNodes
        }
    };

    p.draw = function () {
        p.background(200);
        if (p.nodes) {
            for (let i = 0; i < p.nodes.length; i++) {
                p.ellipse(p.nodes[i].x, p.nodes[i].y, 6, 6);
                p.text('Node ' + (i + 1) + '', p.nodes[i].x - 16, p.nodes[i].y + 15);
                p.stroke('black');
                p.fill('rgba(0,255,0, 0.25)')
                p.circle(p.nodes[i].x, p.nodes[i].y, p.nodes[i].sensingRate)
            }
        }
    };

    p.mousePressed = function () {
        if (checkClickInside(p.mouseX, p.mouseY, div1.offsetWidth - 60, 600)) {
            p.sendCoords(p.mouseX, p.mouseY);
        }
    }

    p.windowResized = function () {
        let div1 = document.getElementById("paper");
        p.resizeCanvas(div1.offsetWidth - 60, 600);
    }
};