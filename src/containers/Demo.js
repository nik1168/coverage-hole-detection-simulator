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
    nodesThatListenedMessageWithRespectToRadius, Point, Triangle, Node, checkClickInside
} from "../utils/geometryUtils";
import SwipeDialog from "./dialogs/SwipeDialog";
import DetailsCoverageHoles from "./dialogs/DetailsCoverageHoles";
import Help from "./dialogs/Help";
import {HEIGHT, PADDING} from "../constants";


const backgroundShape = require('../images/shape.svg');


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey['A500'],
        overflow: 'hidden',
        // background: `url(${backgroundShape}) no-repeat`,
        // backgroundSize: 'cover',
        // backgroundPosition: '0 400px',
        // marginTop: 20,
        padding: 10,
        // paddingBottom: 200
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
        learnMoredialog: false,
        topologies: false,
        help: false
    };

    openDialog = (event) => {
        this.setState({learnMoredialog: true});
    };
    openDialogHelp = (event) => {
        this.setState({help: true});
    };
    openDialogTopologies = (event) => {
        this.setState({topologies: true});
    };
    dialogCloseTopologies = (event) => {
        this.setState({topologies: false});
    };
    dialogClose = (event) => {
        this.setState({learnMoredialog: false});
    };
    dialogCloseHelp = (event) => {
        this.setState({help: false});
    };

    dialogCloseOk = (topoSelected) => {
        this.setState({learnMoredialog: false});
        // this.getNeighbors()
    };
    dialogCloseToposOk = (topo) => {
        this.setState({topologies: false});
        this.props.reset();
        if (topo === 'Topology 1') {
            this.drawStar()
        } else if (topo === 'Topology 2') {
            this.drawPeerToPeer()
        } else if (topo === 'Topology 3'){
            this.drawPaperExample()
        }
        else{
            this.drawTopologyExample()
        }
        setTimeout(() => this.handleCoverageDetectionPhase(), 0.0001)

        // this.forceUpdate()
    };

    drawStar = () => {
        this.props.addNodeCreator(new Node(330, 379, 0, 80));
        this.props.addNodeCreator(new Node(246, 364, 1, 80));
        this.props.addNodeCreator(new Node(184, 305, 2));
        this.props.addNodeCreator(new Node(149, 239, 3));
        this.props.addNodeCreator(new Node(135, 166, 4));
        this.props.addNodeCreator(new Node(177, 101, 5));
        this.props.addNodeCreator(new Node(251, 75, 6));

        this.props.addNodeCreator(new Node(325, 70, 7));
        this.props.addNodeCreator(new Node(397, 65, 8));
        this.props.addNodeCreator(new Node(446, 69, 9));
        this.props.addNodeCreator(new Node(507, 72, 10));
        this.props.addNodeCreator(new Node(584, 80, 11));
        this.props.addNodeCreator(new Node(663, 89, 12));
        this.props.addNodeCreator(new Node(727, 99, 13));
        this.props.addNodeCreator(new Node(779, 127, 14));
        this.props.addNodeCreator(new Node(783, 210, 15));
        this.props.addNodeCreator(new Node(768, 290, 16));
        this.props.addNodeCreator(new Node(719, 344, 17));
        this.props.addNodeCreator(new Node(648, 372, 18));
        this.props.addNodeCreator(new Node(548, 393, 19));
        this.props.addNodeCreator(new Node(429, 386, 20));
        this.props.addNodeCreator(new Node(443, 296, 21));
        this.props.addNodeCreator(new Node(455, 188, 22));

    };

    drawPeerToPeer = () => {
        this.props.addNodeCreator(new Node(265, 115, 0, 80));
        this.props.addNodeCreator(new Node(358, 120, 1, 80));
        this.props.addNodeCreator(new Node(412, 188, 2));
        this.props.addNodeCreator(new Node(413, 269, 3));
        this.props.addNodeCreator(new Node(388, 313, 4));
        this.props.addNodeCreator(new Node(323, 348, 5));
        this.props.addNodeCreator(new Node(269, 332, 6));
        this.props.addNodeCreator(new Node(226, 297, 7));
        this.props.addNodeCreator(new Node(213, 228, 8));

    };
    drawTopologyExample = () => {
        this.props.addNodeCreator(new Node(469.4566699123661, 244.0703125, 0));
        this.props.addNodeCreator(new Node(413.4021421616358, 224.0703125, 1));
        this.props.addNodeCreator(new Node(374.36416747809153, 138.0703125, 2));
        this.props.addNodeCreator(new Node(577.5618305744888, 196.0703125, 3));
        this.props.addNodeCreator(new Node(588.572541382668, 305.0703125, 4));
        this.props.addNodeCreator(new Node(484.47127555988317, 361.0703125, 5));
        this.props.addNodeCreator(new Node(346.3369036027264, 327.0703125, 6));
        this.props.addNodeCreator(new Node(316.3076923076923, 261.0703125, 7));
    };

    drawPaperExample = () => {
        this.props.addNodeCreator(new Node(71, 166.40625, 0));
        this.props.addNodeCreator(new Node(123, 101.40625, 1));
        this.props.addNodeCreator(new Node(209, 70.40625, 2));
        this.props.addNodeCreator(new Node(250, 68.40625, 3));
        this.props.addNodeCreator(new Node(295, 64.40625, 4));
        this.props.addNodeCreator(new Node(352, 63.40625, 5));
        this.props.addNodeCreator(new Node(416, 47.40625, 6));
        this.props.addNodeCreator(new Node(461, 49.40625, 7));
        this.props.addNodeCreator(new Node(511, 62.40625, 8));
        this.props.addNodeCreator(new Node(558, 77.40625, 9));
        this.props.addNodeCreator(new Node(592, 66.40625, 10));
        this.props.addNodeCreator(new Node(644, 67.40625, 11));
        this.props.addNodeCreator(new Node(693, 70.40625, 12));
        this.props.addNodeCreator(new Node(742, 72.40625, 13));
        this.props.addNodeCreator(new Node(786, 68.40625, 14));
        this.props.addNodeCreator(new Node(818, 73.40625, 15));
        this.props.addNodeCreator(new Node(850, 100.40625, 16));
        this.props.addNodeCreator(new Node(850, 155.40625, 17));
        this.props.addNodeCreator(new Node(838, 207.40625, 18));
        this.props.addNodeCreator(new Node(5837, 246.40625, 19));
        this.props.addNodeCreator(new Node(837, 297.40625, 20));
        this.props.addNodeCreator(new Node(828, 338.40625, 21));
        this.props.addNodeCreator(new Node(806, 384.40625, 22));
        this.props.addNodeCreator(new Node(759, 392.40625, 7));
        this.props.addNodeCreator(new Node(695, 392.40625, 23));
        this.props.addNodeCreator(new Node(660, 387.40625, 24));
        this.props.addNodeCreator(new Node(621, 387.40625, 25));
        this.props.addNodeCreator(new Node(546, 394.40625, 26));
        this.props.addNodeCreator(new Node(479, 401.40625, 27));
        this.props.addNodeCreator(new Node(404, 405.40625, 28));
        this.props.addNodeCreator(new Node(336, 389.40625, 29));
        this.props.addNodeCreator(new Node(304, 393.40625, 30));

        this.props.addNodeCreator(new Node(238, 386.40625, 31));
        this.props.addNodeCreator(new Node(169, 363.40625, 32));
        this.props.addNodeCreator(new Node(110, 330.40625, 33));
        this.props.addNodeCreator(new Node(70, 269.40625, 34));
        this.props.addNodeCreator(new Node(653, 152.40625, 35));
        this.props.addNodeCreator(new Node(705, 156.40625, 36));
        this.props.addNodeCreator(new Node(725, 190.40625, 37));
        this.props.addNodeCreator(new Node(612, 224.40625, 38));
        this.props.addNodeCreator(new Node(548, 178.40625, 39));
        this.props.addNodeCreator(new Node(558, 293.40625, 40));
        this.props.addNodeCreator(new Node(492, 210.40625, 41));
        this.props.addNodeCreator(new Node(468, 151.40625, 42));
        this.props.addNodeCreator(new Node(436, 251.40625, 43));
        this.props.addNodeCreator(new Node(372, 176.40625, 44));
    };

    handleAddNodes = () => {
        this.props.addingNodesCreator();

    };

    handleTopologies = () => {
        // this.props.addingNodesCreator();
        this.openDialogTopologies()
    };

    handleNeighborPhase = () => {
        // this.props.addingNodesCreator();
        this.props.addingNeighborsCreator();
        // this.openDialog()
    };

    handleCoverageDetectionPhase = () => {
        this.props.coverageHoleDetectionPhaseCreator();
        const {nodes} = this.props;
        let holes = [];
        nodes.forEach((node) => {
            if (node.active) {
                this.getNeighbors(node.id);
                this.handleHolesAroundNode(node.id);
                if (node.coverageHolesAroundNode.length > 0) {
                    holes = holes.concat(node.coverageHolesAroundNode)
                }
            }
        });
        this.props.addGeneralHolesCreator(holes);
        this.props.coverageHoleDetectionPhaseCreator();
    };


    handleHolesAroundNode = (nodeId) => {
        const holesAroundHole = this.coverageHoleDetection(nodeId);
        this.props.addCoverageHole(nodeId, holesAroundHole);
    };

    handleNodeError = () => {
        this.props.addingFailureNodeCreator();
    };

    handleHelp = () => {
        this.openDialogHelp();
    };

    getNeighbors = (referenceNodeId) => {
        this.props.neighborDiscoveryPhaseCreator();

        console.log("Well, are you ready to rumble?, don't forget single responsibility");
        const nodes = this.props.nodes.filter((val) => val.active);
        const refNodeIn = nodes.findIndex(node => node.id === referenceNodeId);
        console.log("In this part we will iterate over the reference nodes to init the process of get Neighbor phase, for performance purposes we will do it for only one reference node");
        console.log("There are two ways of finding one and two hope neighbors");
        console.log();
        console.log("We iterate for every node that is not the reference node and we send a message");
        console.log("Nodes that listened to my message :)");
        const message = "HELLO!!";
        const {oneHopeNeighbors, twoHopeNeighbors} = nodesThatListenedMessageWithRespectToRadius(refNodeIn, nodes, this.props.sensingRate);
        console.log("Just for testing purposes, let's see the union");
        const union = joinArrays(oneHopeNeighbors, twoHopeNeighbors);
        console.log(union);
        this.props.addNodeOneHopeNeighborCreator(refNodeIn, oneHopeNeighbors);
        this.props.addNodeTwoHopeNeighborCreator(refNodeIn, twoHopeNeighbors);
        this.props.neighborDiscoveryPhaseCreator();
    };

    findHoleBetweenReferenceNodeAndPairNeighbors = (referenceNode, Ai, Aj) => {
        let div2 = document.getElementById("gridWidth");
        const width = div2.offsetWidth;
        const response = [];
        const triangle = new Triangle(referenceNode, Ai, Aj);
        const {nodes, sensingRate} = this.props;
        const activeNodes = nodes.filter(node => node.active);
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
        // this.props.drawCircumCenterCreator(Z);
        // this.props.addCoverageHole(referenceNode.id, Z);
        // Step 9: Verify if XAiAj is an acute or obtuse triangle;
        const isObtuse = triangle.isObtuse();
        const isAcute = triangle.isAcute();

        // Step 10: If (X forms an acute triangle with its neighbors Ai and Aj)
        if (isAcute) {
            if (R <= sensingRate) {
                console.log("%cNo hole exists around the reference node " + referenceNode.id + "", "color: green; font-size:15px;")
            } else {
                let noHoleDetected = nodesThatCoverCircumCenter(Z, activeNodes, sensingRate).length > 0;
                if (!noHoleDetected) {
                    if (checkClickInside(Z.x, Z.y, width - PADDING, HEIGHT)) {
                        console.log("%cThere exists a hole around the reference node " + referenceNode.id + "", "color: red; font-size:15px;");
                        this.props.drawCircumCenterCreator(Z);
                        response.push({
                            refId: referenceNode.id,
                            circumCenter: Z,
                            triangle,
                            reason: "Acute trinagle, cirucm radius R " + R + " is greater than sensing Range " + sensingRate + ""
                        });
                    }
                }

                // this.props.addCoverageHole(referenceNode.id, Z, triangle);
            }
        }
        if (isObtuse) {
            if (R <= sensingRate) {
                console.log("%cNo hole exists around the reference node " + referenceNode.id + "", "color: green; font-size:15px;")
            } else {
                // Check if circum center Z is covered by any other sensor
                let noHoleDetected = nodesThatCoverCircumCenter(Z, activeNodes, sensingRate).length > 0;
                if (noHoleDetected) {
                    console.log("%cNo hole exists around the reference node " + referenceNode.id + "", "color: green; font-size:15px;")
                } else {
                    if (checkClickInside(Z.x, Z.y, width - PADDING, HEIGHT)) {
                        console.log("%cThere exists a hole around the reference node " + referenceNode.id + "", "color: red; font-size:15px;");
                        this.props.drawCircumCenterCreator(Z);
                        response.push(
                            {
                                refId: referenceNode.id,
                                circumCenter: Z,
                                triangle,
                                reason: "Obtuse triangle, circum center Z is not covered by any other sensor"
                            });
                    }
                }
            }
        }
        return response
    };

    coverageHoleDetection = (referenceNodeId) => {
        let holesAroundNode = [];
        let i = 0;
        const nodes = this.props.nodes.filter((node) => node.active);
        // Step 1: Select any node X randomly as a reference node;
        // const referenceNodes = nodes.filter((val) => val.id === referenceNodeId).map((valM) => valM.id);
        // const X = referenceNodes[0];
        // Step 2: Find one and two-hop neighbors of X;
        // const {oneHopeNeighbors, twoHopeNeighbors} = nodesThatListenedMessageWithRespectToRadius(X, nodes, this.props.sensingRate);
        // Assign those nodes to set N

        const nodeX = nodes.find((node) => node.id === referenceNodeId);
        const N = joinArrays(nodeX.oneHopeNeighbors, nodeX.twoHopeNeighbors);

        // Step 3: Select nodes from set N whose y-coordinate >= b; Assign those nodes to set Nu
        const N_u = N.filter((val) => val.y <= nodeX.y);

        // Step 4: Arrange nodes of Nu with their x-coordinate in ascending order and put them in a new set Nux,
        const N_uX = N_u.sort(function (a, b) {
            return a.x - b.x
        });
        let firstN_uX = N_uX.length > 0 ? N_uX[0] : -1;

        // Step 5: Select nodes from set N whose y-coordinate < b; Assign those nodes to set Nd;
        const N_d = N.filter((val) => val.y > nodeX.y);

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
                const hole = this.findHoleBetweenReferenceNodeAndPairNeighbors(nodeX, Ai, Aj);
                if (hole.length > 0) {
                    holesAroundNode.push(hole[0])
                }
                // Step 13: Update Nux’Nux􏰁fAig
                N_uX.shift();
                const whileCond = N_uX.length !== 1;
                i++;
            } while (N_uX.length !== 1);
        } else {
            console.log("X");
            console.log(nodeX);
            // const Z = new Point(0, 0);
            // console.log("%cThere exists a hole around the reference node " + nodeX.id + "", "color: red; font-size:15px;");
            // this.props.addCoverageHole(nodeX.id, Z);
        }

        // Step 14: Choose the 1st node Ai of Ndx and last balance node Aj of Nux;
        if (N_dX.length > 0) {
            do {
                let Ai = 0;
                let Aj = 0;
                if (isFirstTime && N_uX.length > 0) {
                    Ai = N_dX[0];
                    Aj = N_uX[0];
                    const hole = this.findHoleBetweenReferenceNodeAndPairNeighbors(nodeX, Ai, Aj);
                    if (hole.length > 0) {
                        holesAroundNode.push(hole[0])
                        if(Aj.id === firstN_uX.id){
                            firstN_uX = -1
                        }
                    }

                } else if (N_dX.length > 1) {
                    Ai = N_dX[0];
                    Aj = N_dX[1];
                    const hole = this.findHoleBetweenReferenceNodeAndPairNeighbors(nodeX, Ai, Aj);
                    if (hole.length > 0) {
                        holesAroundNode.push(hole[0])
                    }
                }

                if (isFirstTime) {
                    isFirstTime = false
                } else {
                    N_dX.shift()
                }


            } while (N_dX.length !== 1);
        }
        if (N_dX.length > 0 && firstN_uX !== -1) {
            const hole = this.findHoleBetweenReferenceNodeAndPairNeighbors(nodeX, N_dX[0], firstN_uX);
            if (hole.length > 0) {
                holesAroundNode.push(hole[0])
            }
        }
        // return holesAroundNode;
        return holesAroundNode
    };


    componentDidMount() {
        this.props.reset();
    }


    render() {
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
                                <TopButtonBar
                                    handleAddNodes={this.handleAddNodes}
                                    handleTopologies={this.handleTopologies}
                                    handleNeighbor={this.handleNeighborPhase}
                                    handleCoverage={this.handleCoverageDetectionPhase}
                                    handleNodeError={this.handleNodeError}
                                    handleHelp={this.handleHelp}
                                    learnMoredialog={this.state.learnMoredialog}
                                />
                            </Grid>
                            <Grid item xs={12} id={'gridNetworks'}>
                                <SimulatorContainer getNeighbors={this.getNeighbors}
                                                    coverageHoleDetection={this.handleHolesAroundNode}
                                                    handleDetails={this.openDialog}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <DetailsCoverageHoles
                        open={this.state.learnMoredialog}
                        onClose={this.dialogClose}
                        onOk={this.dialogCloseOk}/>
                    <SwipeDialog
                        open={this.state.topologies}
                        onClose={this.dialogCloseTopologies}
                        onOk={this.dialogCloseToposOk}/>
                    <Help
                        open={this.state.help}
                        onClose={this.dialogCloseHelp}/>
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
        addingNeighbors: state.demo.addingNeighbors,
        addingFailureNode: state.demo.addingFailureNode,
        neighborDiscoveryPhase: state.demo.neighborDiscoveryPhase,
        referenceNode: state.demo.referenceNodes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...demoActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Demo)))

