import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import SimulatorContainer from './simulator/SimulatorContainer';
import TopButtonBar from './simulator/TopButtonBar';
import Topbar from './Topbar';
import SectionHeader from './typo/SectionHeader';
import {bindActionCreators} from "redux";
import * as demoActions from "../actions/demo";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getCombinations, joinArrays} from "../utils/generalUtils";
import {
    checkPointInsideCircle,
    nodesThatCoverCircumCenter,
    nodesThatListenedMessageWithRespectToRadius, Point, Triangle
} from "../utils/geometryUtils";
import SwipeDialog from "./dialogs/SwipeDialog";

const backgroundShape = require('../images/shape.svg');


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey['A500'],
        overflow: 'hidden',
        background: `url(${backgroundShape}) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: '0 400px',
        marginTop: 20,
        padding: 20,
        paddingBottom: 200
    },
    grid: {},
    gridSide: {
        marginLeft: 10,
        marginBottom: theme.spacing(4),
        width: 500
    }
});

class Demo extends Component {
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
        console.log("Handle Add Nodess");
        this.props.addingNodesCreator();
        // this.props.addNodeCreator(new Node(469.4566699123661, 244.0703125, 0, 80, true, true));
        // this.props.addNodeCreator(new Node(413.4021421616358, 224.0703125, 1, 80, false));
        // this.props.addNodeCreator(new Node(374.36416747809153, 138.0703125, 2));
        // this.props.addNodeCreator(new Node(577.5618305744888, 196.0703125, 3));
        // this.props.addNodeCreator(new Node(588.572541382668, 305.0703125, 4));
        // this.props.addNodeCreator(new Node(484.47127555988317, 361.0703125, 5));
        // this.props.addNodeCreator(new Node(346.3369036027264, 327.0703125, 6));
        // this.props.addNodeCreator(new Node(316.3076923076923, 261.0703125, 7));
    };

    handleStartSimulation = () => {
        // this.props.addingNodesCreator();
        console.log("Start simulation")
    };

    handleNeighborPhase = () => {
        // this.props.addingNodesCreator();
        console.log("Handle neighbor phase");
        this.openDialog()
    };

    handleCoverageDetectionPhase = () => {
        // this.props.addingNodesCreator();
        console.log("Handle coverage hole phase");
        this.coverageHoleDetection()
    };

    handleNodeError = () => {
        // this.props.addingNodesCreator();
        console.log("Handle node error");
    };

    handleHelp = () => {
        // this.props.addingNodesCreator();
        console.log("Handle help");
    };

    getNeighbors = () => {
        this.props.neighborDiscoveryPhaseCreator();
        console.log("Well, are you ready to rumble?, don't forget single responsibility");
        const nodes = this.props.nodes.filter((val) => val.active);
        const referenceNodes = nodes.filter((val) => val.isReference).map((valM) => valM.id);
        console.log("In this part we will iterate over the reference nodes to init the process of get Neighbor phase, for performance purposes we will do it for only one reference node");
        console.log("There are two ways of finding one and two hope neighbors");
        console.log();
        referenceNodes.forEach((referenceNode) => {
            console.log("We iterate for every node that is not the reference node and we send a message");
            console.log("Nodes that listened to my message :)");
            const message = "HELLO!!";
            const {oneHopeNeighbors, twoHopeNeighbors} = nodesThatListenedMessageWithRespectToRadius(referenceNode, nodes, true, message);
            console.log("Just for testing purposes, let's see the union");
            const union = joinArrays(oneHopeNeighbors, twoHopeNeighbors);
            console.log(union);
            this.props.addNodeOneHopeNeighborCreator(referenceNode, oneHopeNeighbors);
            this.props.addNodeTwoHopeNeighborCreator(referenceNode, twoHopeNeighbors)
        });
        this.props.neighborDiscoveryPhaseCreator();
    };

    findHoleBetweenReferenceNodeAndPairNeighbors = (referenceNode, Ai, Aj) => {

        const triangle = new Triangle(referenceNode, Ai, Aj);
        const {nodes, sensingRate} = this.props;
        console.log("--------------------------------------------");
        console.log("Triangle between reference node and points:");
        console.log(referenceNode.id);
        console.log(Ai.id);
        console.log(Aj.id);
        console.log("--------------------------------------------");
        // Step 8: Compute circum radius R and circum center Z of triangle XAiAj;
        const R = triangle.getCircumRadius();
        const Z = triangle.getCircumCenter();
        console.log("Circum center: ", Z);
        console.log("Circum Raduis: ", R);
        console.log("Sensing rate: ", sensingRate);
        this.props.drawCircumCenterCreator(Z);
        this.props.addCoverageHole(referenceNode.id, Z);
        // Step 9: Verify if XAiAj is an acute or obtuse triangle;
        const isObtuse = triangle.isObtuse();
        const isAcute = triangle.isAcute();

        // Step 10: If (X forms an acute triangle with its neighbors Ai and Aj)
        if (isAcute) {
            if (R < referenceNode.sensingRate) {
                console.log("%cNo hole exists around the reference node " + referenceNode.id + "", "color: green; font-size:15px;")
            } else {
                console.log("%cThere exists a hole around the reference node " + referenceNode.id + "", "color: red; font-size:15px;");
                this.props.addCoverageHole(referenceNode.id, Z);
            }
        }
        if (isObtuse) {
            if (R < referenceNode.sensingRate) {
                console.log("%cNo hole exists around the reference node " + referenceNode.id + "", "color: green; font-size:15px;")
            } else {
                // Check if circum center Z is covered by any other sensor
                let noHoleDetected = nodesThatCoverCircumCenter(Z, nodes).length > 0;
                if (noHoleDetected) {
                    console.log("No hole exists around the reference node " + referenceNode.id + "", "color: green; font-size:15px;")
                } else {
                    console.log("%cThere exists a hole around the reference node " + referenceNode.id + "", "color: red; font-size:15px;");
                    this.props.addCoverageHole(referenceNode.id, Z);
                }
            }
        }

    };

    coverageHoleDetection = () => {
        let i = 0;
        this.props.coverageHoleDetectionPhaseCreator();
        const nodes = this.props.nodes.filter((node) => node.active);
        // Step 1: Select any node X randomly as a reference node;
        const referenceNodes = nodes.filter((val) => val.isReference).map((valM) => valM.id);
        const X = referenceNodes[0];
        // Step 2: Find one and two-hop neighbors of X;
        const {oneHopeNeighbors, twoHopeNeighbors} = nodesThatListenedMessageWithRespectToRadius(X, nodes, true, "Hello");
        // Assign those nodes to set N
        const N = joinArrays(oneHopeNeighbors, twoHopeNeighbors);
        const nodeX = nodes[X];

        // Step 3: Select nodes from set N whose y-coordinate >= b; Assign those nodes to set Nu
        const N_u = N.map((val) => nodes[val]).filter((val) => val.y <= nodeX.y);

        // Step 4: Arrange nodes of Nu with their x-coordinate in ascending order and put them in a new set Nux,
        const N_uX = N_u.sort(function (a, b) {
            return a.x - b.x
        });
        const firstN_uX = N_uX.length > 0 ? N_uX[0] : 0;

        // Step 5: Select nodes from set N whose y-coordinate < b; Assign those nodes to set Nd;
        const N_d = N.map((val) => nodes[val]).filter((val) => val.y > nodeX.y);

        // Step 6: Arrange nodes of Nd with their x-coordinate in descending order and put them in a new set Ndx
        const N_dX = N_d.sort(function (a, b) {
            return b.x - a.x
        });
        const combiNUx = getCombinations(N_u, 2);
        console.log("combiNUx");
        console.log(combiNUx);

        // Step 7: Select 1st two nodes Ai and Aj from Nux such that x-coordinate of Ai < Aj
        let isFirstTime = true;
        if (N_uX.length >= 2) {
            do {
                console.log("Entro!!");
                let Ai = N_uX[0];
                let Aj = N_uX[1];
                this.findHoleBetweenReferenceNodeAndPairNeighbors(nodeX, Ai, Aj);
                // Step 13: Update Nux’Nux􏰁fAig
                N_uX.shift();
                const whileCond = N_uX.length !== 1;
                i++;
            } while (N_uX.length !== 1);
        } else {
            console.log("X");
            console.log(nodeX);
            const Z = new Point(0, 0);
            console.log("%cThere exists a hole around the reference node " + nodeX.id + "", "color: red; font-size:15px;");
            this.props.addCoverageHole(nodeX.id, Z);
        }

        // Step 14: Choose the 1st node Ai of Ndx and last balance node Aj of Nux;
        if (N_dX.length > 0) {
            do {
                let Ai = 0;
                let Aj = 0;
                if (isFirstTime && N_uX.length > 0) {
                    Ai = N_dX[0];
                    Aj = N_uX[0];
                    this.findHoleBetweenReferenceNodeAndPairNeighbors(nodeX, Ai, Aj);
                } else if (N_dX.length > 1) {
                    Ai = N_dX[0];
                    Aj = N_dX[1];
                    this.findHoleBetweenReferenceNodeAndPairNeighbors(nodeX, Ai, Aj);
                }

                if (isFirstTime) {
                    isFirstTime = false
                } else {
                    N_dX.shift()
                }


            } while (N_dX.length !== 1);
        }
        if (N_dX.length > 0) {
            this.findHoleBetweenReferenceNodeAndPairNeighbors(nodeX, N_dX[0], firstN_uX);
        }


        this.props.coverageHoleDetectionPhaseCreator();
    };


    componentDidMount() {
        console.log("DEMO COMPONENT");
        this.props.reset();
    }


    render() {
        console.log("RE RENDER COMPONENT DEMO");
        const {classes} = this.props;
        const currentPath = this.props.location.pathname;

        return (
            <React.Fragment>
                <CssBaseline/>
                <Topbar currentPath={currentPath}/>
                <div className={classes.root}>
                    <Grid container direction="row" justify="center" spacing={2}>
                        <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
                            <Grid item xs={12} id={'gridNetworks'}>
                                <SectionHeader title="Simulator" subtitle="Coverage holes detection"/>
                                <TopButtonBar
                                    handleAddNodes={this.handleAddNodes}
                                    handleSimulation={this.handleStartSimulation}
                                    handleNeighbor={this.handleNeighborPhase}
                                    handleCoverage={this.handleCoverageDetectionPhase}
                                    handleNodeError={this.handleNodeError}
                                    handleHelp={this.handleHelp}
                                    learnMoredialog={this.state.learnMoredialog}
                                />
                            </Grid>
                            <Grid item xs={12} id={'gridNetworks'}>
                                <SimulatorContainer/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <SwipeDialog
                        open={this.state.learnMoredialog}
                        onClose={this.dialogClose}
                        onOk={this.dialogCloseOk}/>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Demo)))

