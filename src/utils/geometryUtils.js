export function checkPointInsideCircle(referenceNode, nodeToCompare, radius) {
    const square_dist = Math.sqrt(Math.pow((referenceNode.x - nodeToCompare.x), 2) + Math.pow((referenceNode.y - nodeToCompare.y), 2));
    return square_dist <= radius
}

export function squareDistanceBetweenPoints(nodeA, nodeB){
    // (xA − xB)2 + (yA − yB)2
    return Math.pow((nodeA.x - nodeB.x),2) + Math.pow((nodeA.y - nodeB.y),2)
}
