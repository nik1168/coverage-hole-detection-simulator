export function checkPointInsideCircle(referenceNode, nodeToCompare, radius) {
    const square_dist = Math.pow((referenceNode.x - nodeToCompare.x), 2) + Math.pow((referenceNode.y - nodeToCompare.y), 2);
    return square_dist <= Math.pow((radius), 2);
}
