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
    "Lemmas": [
        {
            "title": "Lemma 1",
            "description": "\"If a reference node forms an acute triangle with its one-hop neighbors, then there isn't a coverage hole within them. [1]",
            "proof": {
                "img": "",
                "description": "- Let T be a triangle formed by a reference node RN and any of its neighbors, call these nodes X and Y. " +
                    "</br> - The maximum acute angle of T must be at most &pi;/2." +
                    "- Circum center Z  has to be located at most at one side of T, (see example above) <br>" +
                    "- Circum Radius (R) is lower or equal than the sensing range (R_s), therefore there exists a common sensing region." +
                    "- There isn't a coverage hole within those nodes."
            }
        },
        {
            "title": "Lemma 2",
            "description": "\"If a reference node forms an acute triangle with its one-hop neighbors in such a way that its circum radius is lower or equal than the sensing rate (R <= R_s) , then there isn't a coverage hole between them. [1]\"",
            "proof": {
                "img": "",
                "description": "- Let T be an <b>obtuse</b> triangle formed by a reference node RN and any of its neighbors, call these nodes X and Y. Suppose R <= Rs. </br>" +
                    "- Circum center Z has to be covered by a sensor, this is clear since R <= Rs, therefore no coverage hole exists between those nodes."
            }
        },
        {
            "title": "Lemma 3",
            "description": "\"If a reference node forms an acute triangle with its one-hop neighbors in such a way that its circum radius is greater than the sensing rate (R>Rs), and circum center (Z) is not covered by any of its neighbors, then there is a coverage hole besides those sensors.\" [1]",
            "proof": {
                "img": "",
                "description": "- Let T be an <b>obtuse</b> triangle formed by a reference node RN and any of its neighbors, call these nodes X and Y. Suppose R > Rs. </br>" +
                    "- Circum center Z is not covered by any of the three sensors. </br>" +
                    "- A coverage hole exits if Z is not covered by any other sensor."
            }
        },
        {
            "title": "Lemma 4",
            "description": "\"If a reference node forms an acute triangle with its two-hop neighbors and its circum radius is greater than the Sensing rate (R > Rs) , then there is a coverage hole within those sensors, otherwise no hole exists\" [1]",
            "proof": {
                "img": "",
                "description": "- Let T be an <b>acute</b> triangle formed by a reference node RN and any of its neighbors, call these nodes X and Y. </br>" +
                    "- For contradiction purposes, let's assume that circum radius R is lower or equal than the sensing rate Rs (R <= Rs). </br>" +
                    "- As a consequence of Lemma 1, there must be a common sensing region within the three nodes that form T, therefore there is not a coverage hole. </br>" +
                    "- However, if there is no common sensing range as it can be seen in the example above then we have that R > Rs, therefore Z must be located outside the sensing region. " +
                    "leading to a coverage hole"
            }
        },
        {
            "title": "Lemma 5",
            "description": "\"If a reference node forms an obtuse triangle with its two-hop neighbors in such a way that the angle subtended at the reference node is acute and the circum radius is lower or equal than the sensing rate (R <= Rs), then there isn't a hole within them, otherwise there is a a hole if circum center Z is not covered by any other sensor\" [1]",
            "proof": {
                "img": "",
                "description": "- Let T be an <b>obtuse</b> triangle formed by a reference node RN and any of its <b>two-hop neighbors</b> where angle at RN is acute, </br>" +
                    "- If R < Rs, then circum center Z must be covered by those three sensors, otherwise,  Z is not covered by them. </br>" +
                    ""
            }
        },
        {
            "title": "Lemma 6",
            "description": "\"If a reference node (RN) forms an obtuse triangle with its two-hop neighbors and the angle subtended at RN is obtuse, then, there is a coverage hole between those two-hop neighbors.\" [1]",
            "proof": {
                "img": "",
                "description": "- Let T be an <b>obtuse</b> triangle formed by a reference node RN and any of its <b>two-hop neighbors (X and Y)</b> where angle at RN is acute, </br>" +
                    "- No other nodes exist in between RN and XY since T is formed with two immediate nodes (due to ascending order of the set of neighbors). </br>" +
                    "- Since R > Rs there is a coverage hole between X and Y."
            }
        },
        {
            "title": "Lemma 7",
            "description": "\"If reference node (RN) forms an acute triangle with one of its one-hop neighbor and another one with its two-hop neighbors, then there isn't a coverage hole if R <= Rs , otherwise, there is a coverage hole within them.\" [1]",
            "proof": {
                "img": "",
                "description": "- Let T be an <b>acute</b> triangle formed by a reference node RN and any of its <b>two-hop neighbors (X and Y).</b> </br>" +
                    "- If R <= Rs, then circum center Z must be covered by XY or RN."
            }
        },
        // {
        //     "title": "Lemma 8",
        //     "description": "\"If an obtuse triangle is formed by a reference node with one of its one-hop neighbor and another one with its two-hop neighbors, such that angle subtended at the reference node is acute, no hole exists within them if R<=Rs, otherwise a hole must exist if circum center Z is not covered by any other sensor\". Extracted as it is from [1]",
        //     "proof": {
        //         "img": "",
        //         "description": ""
        //     }
        // },
        // {
        //     "title": "Lemma 9",
        //     "description": "If the triangle formed by a reference node with one of its one-hop neighbor and another one with its two-hop neighbors subtends an obtuse angle at the reference node, hole exists within those neighbors.",
        //     "proof": {
        //         "img": "",
        //         "description": ""
        //     }
        // }
    ],
    "Theorems": [
        {
            "title": "Theorem 1",
            "description": "\"A Coverage hole may or may not be present, if a reference node (RN) forms an acute triangle with its neighbors.\" [1]",
            "proof": {
                "img": "",
                "description": "- Due to Lemma 1 we conclude that no coverage hole exists given an acute triangle (T) formed by a reference node (RN) and its one-hop neighbors (X,Y). </br>" +
                    "- Given the results of Lemmas 4 and 7, there are no coverage holes within an acute triangle (T\') formed by a RN and its two hop neighbors or one of its one-hope neighbors and one two-hop neighbors whenever R <= Rs." +
                    "- On the other hand, a coverage hole exists given T\' and R > Rs, this can be derived from the second part of the proofs of Lemmas 4 and 7. </br>" +
                    "- Given these assumptions, Theorem 1 can be proved."
            }
        },
        {
            "title": "Theorem 2",
            "description": "\"A Coverage hole may or may not be present, if a reference node (RN) forms an obtuse triangle with its neighbors\" Extracted as it is from [1]",
            "proof": {
                "img": "",
                "description": "- Let T be an obtuse triangle formed by a reference node (RN) and its one-hop neighbors (X,Y). </br>" +
                    "- If R <= Rs whe know there isn't a coverage hole as a consequence of Lemma 2." +
                    "- This also applies if T was an obtuse triangle formed by RN and one of its one-hop neighbors along with one of its two-hope neighbors, meaning there isn't a coverage hole. </br>" +
                    "- On the other hand, if R > Rs, then a coverage hole exists as proved in Lemma3.",
            }
        },
        {
            "title": "Theorem 3",
            "description": "\"A Coverage hole may or may not be present depending on the nature of the angle formed by a reference node (RN) with its neighbors\" [1]",
            "proof": {
                "img": "",
                "description": "- Let T be an obtuse triangle formed by a reference node (RN) and its one-hop neighbors (X,Y) </br>" +
                    "- If there is an acute angle at RN and R <= Rs, then there is no coverage hole between RN,X and Y, this can be derived from Lemma 5. </br>" +
                    "- If there is an obtuse angle at RN either with two hop neighbors or one of its one hop neighbor and one two hop neighbor, then there is a coverage hole, this can be derived from Lemma 6."
            }
        }
    ],
};
