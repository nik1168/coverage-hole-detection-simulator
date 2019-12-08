export const DATA_THEO = {
    "Axioms": [
        {
            "title": "Axiom 1",
            "description": "The triangle (acute, right or obtuse) formed by a reference node with any pair of its neighbors (one-hop or two- hop) must be enclosed within the effective sensing range of those three nodes."
        },
        {
            "title": "Axiom 2",
            "description": "The circum radius (R) of the triangle (acute, right or obtuse) formed by a reference node with any pair of its neighbors (one-hop or two-hop) must be either rRs or 4Rs."
        },
        {
            "title": "Axiom 3",
            "description": "The circum center (Z) of the triangle (acute, right or obtuse) formed by a reference node with any pair of its neighbors (one-hop or two-hop) must be located inside or outside the sensing range of those three sensors."
        }
    ],
    "Theorems": [
        {
            "title": "Theorem 1",
            "description": "Coverage hole may or may not exist in the network, if an acute triangle is formed by a reference node with its neighbors.",
            "proof": {
                "img": "",
                "description": ""
            }
        },
        {
            "title": "Theorem 2",
            "description": "Coverage hole may or may not exist in the network, if an obtuse triangle is formed by a reference node with its neighbors",
            "proof": {
                "img": "",
                "description": ""
            }
        },
        {
            "title": "Theorem 3",
            "description": "Presence or absence of coverage hole in the network depends on the nature of angle formed by a reference node with its neighbors",
            "proof": {
                "img": "",
                "description": ""
            }
        }
    ],
    "Lemmas": [
        {
            "title": "Lemma 1",
            "description": "If an acute triangle is formed by a reference node with its one-hop neighbors, then no coverage hole exists within those three sensors.",
            "proof": {
                "img": "",
                "description": "Let an acute triangle be formed by a reference node A with its one pair of one-hop neighbors as shown in Fig. 5.\n" +
                    "The maximum acute angle of that triangle must be rp=2"
            }
        },
        {
            "title": "Lemma 2",
            "description": "If an obtuse triangle is formed by a reference node with its one-hop neighbors such that its circum radius R r Rs , then no hole exists within those sensors.",
            "proof": {
                "img": "",
                "description": ""
            }
        },
        {
            "title": "Lemma 3",
            "description": "If an obtuse triangle is formed by a reference node with its one-hop neighbors such that its circum radius R4Rs, and circum center (Z) is not covered by any of its neighbors, then there must be a hole besides those sensors.",
            "proof": {
                "img": "",
                "description": ""
            }
        },
        {
            "title": "Lemma 4",
            "description": "If an acute triangle is formed by a reference node with its two-hop neighbors and its circum radius R 4 Rs , then there must be a coverage hole within those sensors, otherwise no coverage hole exists",
            "proof": {
                "img": "",
                "description": ""
            }
        },
        {
            "title": "Lemma 5",
            "description": "If an obtuse triangle is formed by a reference node with its two-hop neighbors such that the angle subtended at the reference",
            "proof": {
                "img": "",
                "description": ""
            }
        },
        {
            "title": "Lemma 6",
            "description": "If an obtuse triangle is formed by a reference node with its two-hop neighbors and the angle subtended at the reference node is obtuse, coverage hole exists in between those two-hop neighbors.",
            "proof": {
                "img": "",
                "description": ""
            }
        },
        {
            "title": "Lemma 7",
            "description": "If an acute triangle is formed by a reference node with one of its one-hop neighbor and another one with its two-hop neighbors, no hole exists if R r Rs , otherwise, coverage hole exists within them.",
            "proof": {
                "img": "",
                "description": ""
            }
        },
        {
            "title": "Lemma 8",
            "description": "If an obtuse triangle is formed by a reference node with one of its one-hop neighbor and another one with its two-hop neighbors, such that angle subtended at the reference node is acute, no hole exists within them if RrRs, otherwise a hole must exist if circum center Z is not covered by any other sensor.",
            "proof": {
                "img": "",
                "description": ""
            }
        },
        {
            "title": "Lemma 9",
            "description": "If the triangle formed by a reference node with one of its one-hop neighbor and another one with its two-hop neighbors subtends an obtuse angle at the reference node, hole exists within those neighbors.",
            "proof": {
                "img": "",
                "description": ""
            }
        }
    ]
}