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

const marks = [
    {
        value: 10,
        label: '0°C',
    },
    {
        value: 20,
        label: '20°C',
    },
    {
        value: 30,
        label: '37°C',
    },
    {
        value: 40,
        label: '100°C',
    },
];

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
            }
            if (min < 20) {
                this.props.setReferenceCreator(i)
                this.props.getNeighbors(i)
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
                this.props.getNeighbors(this.props.referenceNodes);
                this.props.coverageHoleDetection(this.props.referenceNodes);
            }
        }
    };


    componentDidMount() {
    }

    render() {
        const {classes, referenceNodes, nodes} = this.props;
        const refNode = nodes[referenceNodes];
        console.log("Ref node");
        console.log(refNode);

        let instruction = '';
        if (this.props.addingNodes) {
            instruction = "Click on screen to start adding nodes"
        } else if (this.props.addingNeighbors) {
            instruction = "Click on a node to set it as reference"
        } else {
            instruction = ""
        }

        return (
            <div className={classes.root}>
                <Paper className={classes.paper} id={'paper'}>

                    <Typography color='secondary' variant="h6" gutterBottom>
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
                                        <Typography color='secondary' variant="h6" gutterBottom>
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
                                                        Node {refNode.id}
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        One hop- Neighbors : {
                                                        refNode.oneHopeNeighbors.map((node, ind) => (
                                                            <span key={ind}>{node.id}</span>
                                                        ))
                                                    }
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        Two hop- Neighbors : {
                                                        refNode.twoHopeNeighbors.map((node, ind) => (
                                                            <span key={ind}>{node.id}</span>
                                                        ))
                                                    }
                                                    </Typography>
                                                    <Button
                                                        onClick={() => this.props.coverageHoleDetection(referenceNodes)}
                                                        style={{textAlign: 'left'}} color='primary' variant="text"
                                                        size="small">
                                                        Get coverage holes around reference node
                                                    </Button>
                                                    {
                                                        refNode.coverageHolesAroundNode.length > 0 && (
                                                            <Typography variant="body1" gutterBottom>
                                                               <b>Coverage Hole Detected around:</b>  <br/>
                                                                {
                                                                    refNode.coverageHolesAroundNode.map((hole, key) => (
                                                                        <span key={key}>
                                                                           - Node {hole.triangle.pointA.id},&nbsp;
                                                                            Node {hole.triangle.pointB.id},&nbsp;
                                                                            Node {hole.triangle.pointC.id}&nbsp; <br/>
                                                                        </span>
                                                                    ))
                                                                }
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
        circumCenter: state.demo.circumCenter,
        referenceNodes: state.demo.referenceNodes,
        neighborDiscoveryPhase: state.demo.neighborDiscoveryPhase
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...demoActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SimulatorContainer)))
