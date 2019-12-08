import MathNotation from "../components/MathNotation";

export const DATA_THEO = {
    "Axioms": [
        {
            "title": "Axiom 1",
            "description": "A triangle formed by a reference node with any pair of its neighbors must be covered by the sensing range of those three nodes [1]."
        },
        {
            "title": "Axiom 2",
            "description": "Let T be the triangle formed by a reference node RN and with a pair of neighbors, the circum radius (R) of T must be either <= R_s or >R_s where R_s is the sensing range of a node [1]."
        },
        {
            "title": "Axiom 3",
            "description": "Let T be the triangle formed by a reference node RN and with a pair of neighbors, the circum center (Z) of T must be located inside or outside the sensing range of those three sensors [1]."
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
            "description": "\"If an acute triangle is formed by a reference node with its one-hop neighbors, then no coverage hole exists within those three sensors\" Extracted as it is from [1].",
            "proof": {
                "img": "",
                "description": "- Let T be a triangle formed by a reference node RN and any of its neighbors, call these nodes X and Y. " +
                    "</br> - The maximum acute angle of T must be at most &pi;/2" +
                    "- Circum center Z  has to be located at most at one side of T, (see example above) <br>" +
                    "- Circum Radius (R) is lower or equal than the sensing range (R_s), therefore there exists a common sensing region" +
                    "- There isn't a coverage hole within those nodes"
            }
        },
        {
            "title": "Lemma 2",
            "description": "\"If an obtuse triangle is formed by a reference node with its one-hop neighbors such that its circum radius R <= Rs , then no hole exists within those sensors.\" Extracted as it is from [1].",
            "proof": {
                "img": "",
                "description": "- Let T be an <b>obtuse</b> triangle formed by a reference node RN and any of its neighbors, call these nodes X and Y. Suppose R <= Rs </br>" +
                    "- Circum center Z has to be covered by a sensor, this is clear since R <= Rs, therefore no coverage hole exists between those nodes"
            }
        },
        {
            "title": "Lemma 3",
            "description": "\"If an obtuse triangle is formed by a reference node with its one-hop neighbors such that its circum radius R>Rs, and circum center (Z) is not covered by any of its neighbors, then there must be a hole besides those sensors.\" Extracted as it is from [1]",
            "proof": {
                "img": "",
                "description": "- Let T be an <b>obtuse</b> triangle formed by a reference node RN and any of its neighbors, call these nodes X and Y. Suppose R > Rs </br>" +
                    "- Circum center Z is not covered by any of the three sensors </br>" +
                    "- A coverage hole exits if Z is not covered by any other sensor"
            }
        },
        {
            "title": "Lemma 4",
            "description": "If an acute triangle is formed by a reference node with its two-hop neighbors and its circum radius R > Rs , then there must be a coverage hole within those sensors, otherwise no coverage hole exists",
            "proof": {
                "img": "",
                "description": "- Let T be an <b>acute</b> triangle formed by a reference node RN and any of its neighbors, call these nodes X and Y. </br>" +
                    "- For contradiction purposes, let's assume that circum radius R is lower or equal than the sensing rate Rs (R <= Rs) </br>" +
                    "- As a consequence of Lemma 1, there must be a common sensing region within the three nodes that form T, therefore there is not a coverage hole </br>" +
                    "- However, if there is no common sensing range as it can be seen in the example above then we have that R > Rs, therefore Z must be located outside the sensing region " +
                    "leading to a coverage hole"
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
