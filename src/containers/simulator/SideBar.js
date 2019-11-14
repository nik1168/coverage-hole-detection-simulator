import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HelpIcon from '@material-ui/icons/Help';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import {Node, timesClicked, Triangle} from '../../sketches/sketch';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as demoActions from "../../actions/demo";
import green from '@material-ui/core/colors/green';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {red} from "@material-ui/core/colors";
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
import SwipeDialog from "../dialogs/SwipeDialog";
import {checkPointInsideCircle} from "../../utils/geometryUtils";
import {joinArrays} from "../../utils/generalUtils";


const styles = theme => ({
    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
        color: theme.palette.text.secondary
    },
    outlinedButtom: {
        textTransform: 'uppercase',
        margin: theme.spacing(1)
    },
    avatar: {
        margin: 10,
        backgroundColor: theme.palette.grey['200'],
        color: theme.palette.text.primary,
    },
    avatarContainer: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginBottom: theme.spacing(4)
        }
    },
    itemContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }
    },
    baseline: {
        alignSelf: 'baseline',
        marginLeft: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginLeft: 0
        }
    },
    inline: {
        display: 'inline-block',
        marginLeft: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0
        }
    },
    inlineRight: {
        width: '30%',
        textAlign: 'right',
        marginLeft: 50,
        alignSelf: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: 0,
            textAlign: 'center'
        }
    },
    backButton: {
        marginRight: theme.spacing(2)
    }
})

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: red
    },
});


class SideBar extends Component {

    state = {
        learnMoredialog: false
    };

    openDialog = (event) => {
        this.setState({learnMoredialog: true});
    };
    dialogClose = (event) => {
        this.setState({learnMoredialog: false});
    };

    dialogCloseOk = (referenceNodes) => {
        this.setState({learnMoredialog: false});
        this.getNeighbors()
    };

    handleAddNodes = () => {
        this.props.addingNodesCreator()
    };

    getNodeNeighbors = (referenceNode, nodes) => {
        const {oneHopeNeighbors, twoHopeNeighbors} = this.nodesThatListenedMessageWithRespectToRadius(referenceNode, nodes, true, "message");
    }

    getNeighbors = () => {
        this.props.neighborDiscoveryPhaseCreator();
        console.log("Well, are you ready to rumble?, don't forget single responsibility");
        const nodes = this.props.nodes;
        const referenceNodes = nodes.filter((val) => val.isReference).map((valM) => valM.id);
        console.log("In this part we will iterate over the reference nodes to init the process of get Neighbor phase, for performance purposes we will do it for only one reference node");
        console.log("There are two ways of finding one and two hope neighbors");
        console.log();
        referenceNodes.forEach((referenceNode) => {
            console.log("We iterate for every node that is not the reference node and we send a message");
            console.log("Nodes that listened to my message :)");
            const message = "HELLO!!";
            const {oneHopeNeighbors, twoHopeNeighbors} = this.nodesThatListenedMessageWithRespectToRadius(referenceNode, nodes, true, message);
            console.log("Just for testing purposes, let's see the union");
            const union = joinArrays(oneHopeNeighbors, twoHopeNeighbors);
            console.log(union);
            this.props.addNodeOneHopeNeighborCreator(referenceNode, oneHopeNeighbors);
            this.props.addNodeTwoHopeNeighborCreator(referenceNode, twoHopeNeighbors)
        });
        this.props.neighborDiscoveryPhaseCreator();
    };

    coverageHoleDetectionProofOfConcept = () => {
        this.props.coverageHoleDetectionPhaseCreator();
        // console.log("Init coverage hole detection phase");
        // console.log("I think this is one of the most important phases of the algorithm :)");
        // console.log("We will do a proof of concept with a reference node and two neighbors");
        // const nodes = this.props.nodes;
        // console.log("nodes");
        // console.log(nodes);
        // const referenceNodes = nodes.filter((val) => val.isReference).map((valM) => valM.id);
        // console.log("reference nodes ", referenceNodes);
        // const referenceNode = nodes[referenceNodes[0]];
        // const neighbors = joinArrays(referenceNode.oneHopeNeighbors, referenceNode.twoHopeNeighbors);
        // console.log("neighbors");
        // console.log(neighbors);
        // const n1 = nodes[neighbors[0]];
        // const n2 = nodes[neighbors[1]];
        // TEST FORMULAS :)
        const A = new Node(3, 2, 0);
        const B = new Node(1, 4, 1);
        const C = new Node(5, 4, 2);
        const triangle = new Triangle(A, B, C);
        // const triangle = new Triangle(referenceNode, n1, n2);
        console.log("Triangle");
        console.log(triangle);
        console.log("Area of triangle");
        console.log(triangle.getArea());
        console.log("Triangle sides");
        console.log("Distance A", triangle.getDistanceAB());
        console.log("Distance B", triangle.getDistanceBC());
        console.log("Distance C", triangle.getDistanceAC());

        console.log("Triangle circum radius");
        console.log(triangle.getCircumRadius());
        console.log("Triangle circum center");
        triangle.getCircumCenter();
        console.log("Angle A", triangle.getAngleA());
        console.log("Angle B", triangle.getAngleB());
        console.log("Angle C", triangle.getAngleC());


        this.props.coverageHoleDetectionPhaseCreator();
    };

    coverageHoleDetection = () => {
        this.props.coverageHoleDetectionPhaseCreator();
        const nodes = this.props.nodes;
        // Step 1: Select any node X randomly as a reference node;
        const referenceNodes = nodes.filter((val) => val.isReference).map((valM) => valM.id);
        const X = referenceNodes[0];
        // Step 2: Find one and two-hop neighbors of X;
        const {oneHopeNeighbors, twoHopeNeighbors} = this.nodesThatListenedMessageWithRespectToRadius(X, nodes, true, "Hello");
        // Assign those nodes to set N
        const N = joinArrays(oneHopeNeighbors, twoHopeNeighbors);
        const nodeX = nodes[X];

        // Step 3: Select nodes from set N whose y-coordinate >= b; Assign those nodes to set Nu
        const N_u = N.map((val) => nodes[val]).filter((val) => val.y <= nodeX.y);

        // Step 4: Arrange nodes of Nu with their x-coordinate in ascending order and put them in a new set Nux,
        const N_uX = N_u.sort(function (a, b) {
            return a.x - b.x
        });

        // Step 5: Select nodes from set N whose y-coordinate < b; Assign those nodes to set Nd;
        const N_d = N.map((val) => nodes[val]).filter((val) => val.y > nodeX.y);

        // Step 6: Arrange nodes of Nd with their x-coordinate in descending order and put them in a new set Ndx
        const N_dX = N_d.sort(function (a, b) {
            return b.x - a.x
        });

        // Step 7: Select 1st two nodes Ai and Aj from Nux such that x-coordinate of Ai < Aj
        let isFirstTime = true;
        do {
            let Ai = N_uX[0];
            let Aj = N_uX[1];
            // Step 8: Compute circum radius R and circum center Z of triangle XAiAj;
            const triangle = new Triangle(nodeX, Ai, Aj);
            const R = triangle.getCircumRadius();
            const Z = triangle.getCircumCenter();
            // Step 9: Verify if XAiAj is an acute or obtuse triangle;
            const isObtuse = triangle.isObtuse();
            const isAcute = triangle.isAcute();
            // Step 10: If (X forms an acute triangle with its neighbors Ai and Aj)
            if (isAcute) {
                if (R < nodeX.sensingRate) {
                    console.log("No hole exists around the reference node X")
                } else {
                    console.log("There exists a hole around the reference node X")
                }
            }
            // Step 11: If (X forms an obtuse triangle with its neighbors Ai and Aj)
            if (isObtuse) {
                if (R < nodeX.sensingRate) {
                    console.log("No hole exists around the reference node X")
                } else {
                    // Check if circum center Z is covered by any other sensor
                    let response = false;
                    nodes.forEach((node, index) => {
                        if (checkPointInsideCircle(Z, node, node.sensingRate)) {
                            response = true
                        }
                    });
                    if (response) {
                        console.log("No hole exists around the reference node X")
                    } else {
                        console.log("There exists a hole around the reference node X")
                    }
                }
            }
            // Step 13: Update Nux’Nux􏰁fAig
            N_uX.shift()

        } while (N_uX.length !== 1);
        // Step 14: Choose the 1st node Ai of Ndx and last balance node Aj of Nux;
        do {
            let Ai = 0;
            let Aj = 0;
            if (isFirstTime) {
                Ai = N_dX[0];
                Aj = N_uX[0];
                isFirstTime = false
            } else {
                Ai = N_dX[0];
                Aj = N_dX[1];
            }
            // Step 8: Compute circum radius R and circum center Z of triangle XAiAj;
            const triangle = new Triangle(nodeX, Ai, Aj);
            const R = triangle.getCircumRadius();
            const Z = triangle.getCircumCenter();
            // Step 9: Verify if XAiAj is an acute or obtuse triangle;
            const isObtuse = triangle.isObtuse();
            const isAcute = triangle.isAcute();
            // Step 10: If (X forms an acute triangle with its neighbors Ai and Aj)
            if (isAcute) {
                if (R < nodeX.sensingRate) {
                    console.log("No hole exists around the reference node X")
                } else {
                    console.log("There exists a hole around the reference node X")
                }
            }
            // Step 11: If (X forms an obtuse triangle with its neighbors Ai and Aj)
            if (isObtuse) {
                if (R < nodeX.sensingRate) {
                    console.log("No hole exists around the reference node X")
                } else {
                    // Check if circum center Z is covered by any other sensor
                    let response = false;
                    nodes.forEach((node, index) => {
                        if (checkPointInsideCircle(node, Z, node.sensingRate)) {
                            response = true
                        }
                    });
                    if (response) {
                        console.log("No hole exists around the reference node X")
                    } else {
                        console.log("There exists a hole around the reference node X")
                    }
                }
            }
            // Step 13: Update Ndx
            N_dX.shift()

        } while (N_dX.length !== 0);

        this.props.coverageHoleDetectionPhaseCreator();
    };

    nodesThatListenedMessageWithRespectToRadius = (referenceNode, nodes, oneHop, message) => {
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


    componentDidMount() {
        console.log("Props Card Item");
        console.log(this.props)
    }

    render() {
        const {classes, neighborDiscoveryPhase, addingNodes} = this.props;
        console.log("NEIGHBOR DISCOVERY PHASE");
        console.log(neighborDiscoveryPhase);

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <div className={classes.itemContainer}>
                        <div className={classes.baseline}>
                            <div className={classes.inline}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    disabled={neighborDiscoveryPhase}
                                    onClick={this.handleAddNodes}
                                    className={classes.outlinedButtom}
                                    startIcon={!addingNodes ? <AddIcon/> : <StopIcon/>}
                                >
                                    Create Nodes
                                </Button>
                            </div>
                            <div className={classes.inline}>
                                <MuiThemeProvider theme={theme}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={addingNodes || neighborDiscoveryPhase}
                                        className={classes.outlinedButtom}
                                        startIcon={<PlayArrowIcon/>}
                                    >
                                        Start simulation
                                    </Button>
                                </MuiThemeProvider>

                            </div>
                            <div className={classes.inline}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.coverageHoleDetection}
                                    disabled={addingNodes || neighborDiscoveryPhase}
                                    className={classes.outlinedButtom}
                                    startIcon={<SettingsInputAntennaIcon/>}
                                >
                                    Find Coverage Holes
                                </Button>
                            </div>
                            <div className={classes.inline}>
                                <Button
                                    variant="contained"
                                    color="default"
                                    onClick={this.openDialog}
                                    disabled={addingNodes}
                                    className={classes.outlinedButtom}
                                    startIcon={<PersonAddIcon/>}
                                >
                                    Neighbor Discovery
                                </Button>
                            </div>
                            <div className={classes.inline}>
                                <MuiThemeProvider theme={theme}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        disabled={addingNodes || neighborDiscoveryPhase}
                                        className={classes.outlinedButtom}
                                        startIcon={<SignalWifiOffIcon/>}
                                    >
                                        Node error
                                    </Button>
                                </MuiThemeProvider>
                            </div>
                            <div className={classes.inline}>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.outlinedButtom}
                                    startIcon={<HelpIcon/>}
                                >
                                </Button>
                            </div>
                        </div>
                    </div>
                </Paper>
                <SwipeDialog
                    open={this.state.learnMoredialog}
                    onClose={this.dialogClose}
                    onOk={this.dialogCloseOk}
                    nodes={this.props.nodes}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        nodes: state.demo.nodes,
        sensingRate: state.demo.sensingRate,
        addingNodes: state.demo.addingNodes,
        neighborDiscoveryPhase: state.demo.neighborDiscoveryPhase
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...demoActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SideBar)))
