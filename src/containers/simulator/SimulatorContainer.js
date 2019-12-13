import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import P5Wrapper from 'react-p5-wrapper';
import sketch from '../../sketches/sketch';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as demoActions from "../../actions/demo";
import {
    distanceBetweenTwoPoints,
    Node, nodesThatListenedMessageWithRespectToRadius, Point
} from "../../utils/geometryUtils";
import Typography from "@material-ui/core/Typography";
import Slider from '@material-ui/core/Slider';
import Grid from "@material-ui/core/Grid";
import TriangleSketch from "../../sketches/Triangle";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import green from "@material-ui/core/colors/green";
import {red} from "@material-ui/core/colors";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {voronoi} from "d3-voronoi"

const styles = theme => ({
    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
        color: theme.palette.text.secondary
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
});

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: red
    },
});

function valuetext(value) {
    return `${value}°C`;
}

class SimulatorContainer extends Component {

    onChangeSlider = (e, val) => {
        const {referenceNodes} = this.props;
        console.log("On change slider");
        console.log(val);
        this.props.addSensingRateCreator(val);
        if (referenceNodes !== -1) {
            this.props.getNeighbors(referenceNodes)
        }
    };
    getCoords = (x, y) => {
        let point = new Point(x, y);
        let min = 1000000000;
        let i = 0;
        if (this.props.addingNodes) {
            this.props.addNodeCreator(new Node(x, y, this.props.nodes.length))
            if (this.props.referenceNodes !== -1) {
                this.props.getNeighbors(this.props.referenceNodes)
            }
        }
        if (this.props.addingNeighbors) {
            this.setState({buttonPressed : false})
            let indexReference = -2;
            this.props.nodes.forEach((node, index) => {
                if (node.isReference) {
                    indexReference = index
                }
                const distance = distanceBetweenTwoPoints(node, point);
                if (distance < min) {
                    min = distance;
                    i = index
                }
            });
            if (indexReference !== -2) {
                this.props.setReferenceCreator(indexReference);
                this.props.addCoverageHole(indexReference, [])
            }
            if (min < 20) {
                this.props.setReferenceCreator(i);
                this.props.getNeighbors(i);
                // this.props.coverageHoleDetection(i);
                // this.forceUpdate()
            }
        }

        if (this.props.addingFailureNode) {
            this.props.nodes.forEach((node, index) => {
                const distance = distanceBetweenTwoPoints(node, point);
                if (distance < min) {
                    min = distance;
                    i = index
                }
            });
            if (min < 20) {
                this.props.setFailure(i);
                console.log("references nodes??");
                console.log(this.props.referenceNodes);
                if (this.props.referenceNodes !== -1) {
                    this.props.getNeighbors(this.props.referenceNodes);
                    this.props.coverageHoleDetection(this.props.referenceNodes);
                }
            }
        }
    };


    componentDidMount() {
        // console.log("Let's compute some voronoi diagrams")
        // const a = voronoi(this.props.nodes)
        // console.log(a)
    }
    state = {
        buttonPressed: false,
    };
    render() {

        console.log("Let's compute some voronoi diagrams")
        if (this.props.nodes.length > 0) {
            // const nodesCoords = this.props.nodes.map((n) => [n.x, n.y])
            // // console.log(this.props.nodes);
            // // const a = voronoi(this.props.nodes);
            // // console.log(a.polygons(this.props.nodes))
            // const d = voronoi().polygons(nodesCoords);
            //  console.log(d)
        }

        const {classes, referenceNodes, nodes, coverageHoleDetectionPhase} = this.props;
        console.log("Coverage Hole Detection Phase");
        console.log(coverageHoleDetectionPhase);
        console.log("referenceNodes");
        console.log(referenceNodes);
        const refNode = nodes.filter(node => node.id === referenceNodes);
        console.log("Ref node");
        console.log(refNode);
        console.log("button");
        console.log(this.state.buttonPressed);

        let instruction = '';
        if (this.props.addingNodes) {
            instruction = "Click on screen to start adding nodes"
        } else if (this.props.addingNeighbors) {
            instruction = "Click on a node to set it as reference, (click on \"Get coverage hole around\" button on side bar to see the holes within its neighbors')"
        } else if (this.props.addingFailureNode) {
            instruction = "Click on a node to emulate a failure"
        } else {
            instruction = "Start by creating some nodes or using an existing topology"
        }

        return (
            <div className={classes.root}>
                <Paper className={classes.paper} id={'paper'}>

                    <Typography color='secondary' variant="body1" gutterBottom>
                        {instruction}
                    </Typography>

                    <Grid container justify="center">
                        <Grid spacing={7} alignItems="center" justify="center" container>
                            <Grid container item xs={12}>
                                <Grid item xs={9} id={'gridWidth'}>
                                    <P5Wrapper sketch={sketch}
                                               getCoords={this.getCoords}
                                               nodes={this.props.nodes}
                                               sensingRate={this.props.sensingRate}
                                               addingNodes={this.props.addingNodes}
                                               addingFailureNode={this.props.addingFailureNode}
                                               addingNeighbors={this.props.addingNeighbors}
                                               circumCenter={this.props.circumCenter}/>
                                </Grid>
                                <Grid style={{paddingLeft: 10}} item xs={3}>
                                    <div style={{width: 300}}>
                                        <Typography color='secondary' variant="h5" gutterBottom>
                                            Sensing rate
                                        </Typography>

                                        <Slider
                                            defaultValue={this.props.sensingRate}
                                            getAriaValueText={valuetext}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            onChangeCommitted={this.onChangeSlider}
                                            step={10}
                                            marks
                                            min={10}
                                            max={110}
                                        />
                                        <Typography color='secondary' variant="h5" gutterBottom>
                                            Network Status
                                            {
                                                coverageHoleDetectionPhase && (
                                                    <MuiThemeProvider theme={theme}>
                                                        <CircularProgress color="secondary" size={20}/>
                                                    </MuiThemeProvider>
                                                )
                                            }
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {
                                                this.props.coverageHoles.length > 0 && (
                                                    <span
                                                        style={{color: 'red'}}><b>Coverage holes detected in network</b></span>
                                                )
                                            }
                                            {
                                                this.props.coverageHoles.length === 0 && (
                                                    <span
                                                        style={{color: 'green'}}><b>No coverage holes detected in network</b></span>
                                                )
                                            }

                                            <Button
                                                onClick={() => this.props.handleDetails()}
                                                style={{textAlign: 'left'}} color='secondary' variant="text"
                                                size="small">
                                                Details
                                            </Button>
                                        </Typography>
                                        <Typography color='secondary' variant="h6" gutterBottom>
                                            Reference Node:
                                        </Typography>
                                        {
                                            referenceNodes === -1 && (
                                                <Typography variant="body1" gutterBottom>
                                                    Not Selected
                                                </Typography>
                                            )
                                        }
                                        {
                                            referenceNodes >= 0 && (
                                                <div>
                                                    <Typography variant="body1" gutterBottom>
                                                        Node {refNode[0].id}
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        One hop- Neighbors : {
                                                        refNode[0].oneHopeNeighbors.map((node, ind) => (
                                                            <span key={ind}>{node.id}&nbsp;</span>
                                                        ))
                                                    }
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        Two hop- Neighbors : {
                                                        refNode[0].twoHopeNeighbors.map((node, ind) => (
                                                            <span key={ind}>{node.id}</span>
                                                        ))
                                                    }
                                                    </Typography>
                                                    <Button
                                                        onClick={() => {
                                                            this.props.coverageHoleDetection(referenceNodes)
                                                            this.setState({buttonPressed: true});
                                                        }}
                                                        style={{textAlign: 'left'}} color='primary' variant="text"
                                                        size="small">
                                                        Get coverage holes around reference node
                                                    </Button>
                                                    {
                                                        refNode[0].coverageHolesAroundNode.length > 0 && this.state.buttonPressed && (
                                                            <Typography variant="body1" gutterBottom>
                                                                <b>Coverage Hole Detected around:</b> <br/>
                                                                {
                                                                    refNode[0].coverageHolesAroundNode.map((hole, key) => (
                                                                        <span key={key}>
                                                                           - Node {hole.triangle.pointA.id},&nbsp;
                                                                            Node {hole.triangle.pointB.id},&nbsp;
                                                                            Node {hole.triangle.pointC.id}&nbsp; <br/>
                                                                            <b>Reason: </b> {hole.reason} <br/>
                                                                        </span>
                                                                    ))
                                                                }
                                                            </Typography>
                                                        )
                                                    }
                                                    {
                                                        refNode[0].coverageHolesAroundNode.length === 0 && this.state.buttonPressed && (
                                                            <Typography variant="body1" gutterBottom>
                                                                <b>No coverage hole found:</b> <br/>

                                                            </Typography>
                                                        )
                                                    }
                                                </div>

                                            )
                                        }
                                    </div>

                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>


                </Paper>
            </div>
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
        coverageHoleDetectionPhase: state.demo.coverageHoleDetectionPhase,
        coverageHoles: state.demo.coverageHoles,
        circumCenter: state.demo.circumCenter,
        referenceNodes: state.demo.referenceNodes,
        neighborDiscoveryPhase: state.demo.neighborDiscoveryPhase
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...demoActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SimulatorContainer)))
