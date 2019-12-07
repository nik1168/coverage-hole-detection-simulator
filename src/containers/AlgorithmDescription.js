import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import {withRouter} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Topbar from './Topbar';
import {DATA_THEO} from "../data/theo";
import P5Wrapper from "react-p5-wrapper";
import MathNotation from "../components/MathNotation";
import sketchSensingRate from "../sketches/SensingRate";
import sketchReferenceNode from "../sketches/ReferenceNode";
import sketchNeighborNode from "../sketches/Neighbors";
import sketchCircumRadiusCenterNode from "../sketches/CircumRadiusCenter";
import exampleAlgo from "../sketches/Example";
import {joinArrays} from "../utils/generalUtils";
import {
    Node
} from "../utils/geometryUtils";

const numeral = require('numeral');
numeral.defaultFormat('0,000');

const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey['100'],
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundPosition: '0 400px',
        paddingBottom: 200
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    grid: {
        width: 1200,
        marginTop: 40,
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 20px)'
        }
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    rangeLabel: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing(2)
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32
    },
    outlinedButtom: {
        textTransform: 'uppercase',
        margin: theme.spacing(1)
    },
    actionButtom: {
        textTransform: 'uppercase',
        margin: theme.spacing(1),
        width: 152
    },
    blockCenter: {
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    block: {
        padding: theme.spacing(2),
    },
    box1: {
        marginBottom: 40,
        height: 450
    },
    inlining: {
        display: 'inline-block',
        marginRight: 10
    },
    buttonBar: {
        display: 'flex'
    },
    alignRight: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    noBorder: {
        borderBottomStyle: 'hidden'
    },
    loadingState: {
        opacity: 0.05
    },
    loadingMessage: {
        position: 'absolute',
        top: '40%',
        left: '40%'
    }
});

class AlgorithmDescription extends Component {


    state = {
        loading: true,
        selectedImage: "",
        selectedTest: "",
        oneHopeNeighbors: [],
        twoHopeNeighbors: [],
        referenceNode: new Node(0, 0, 0),
        modals: {
            active: false,
            lemma1: {
                active: false,
                content: ''
            }
        }
    };

    componentDidMount() {

    }

    dialogClose = (lt) => {
        this.setState({modals: {['lemma1']: {['active']: false}}})
    };

    openDialog = (proof) => {
        console.log("Open dialog");
        // this.setState({modals: {[lt]: true}})
        this.setState({
            modals: {['lemma1']: {['active']: true}},
            selectedImage: proof['img'],
            selectedTest: proof['description']
        })
    };

    receiveNeighbors = (referenceNode, oneHopeNeighbors, twoHopeNeighbors) => {
        this.setState({oneHopeNeighbors, twoHopeNeighbors, referenceNode: referenceNode})
    };

    render() {
        const {classes} = this.props;
        const currentPath = this.props.location.pathname;
        const keys = Object.keys(DATA_THEO);
        const N = joinArrays(this.state.oneHopeNeighbors, this.state.twoHopeNeighbors);
        const N_u = N.filter((val) => val.y <= this.state.referenceNode.y);
        const N_uX = N_u.sort(function (a, b) {
            return a.x - b.x
        });
        const N_d = N.filter((val) => val.y > this.state.referenceNode.y);
        const N_dX = N_d.sort(function (a, b) {
            return b.x - a.x
        });
        return (
            <React.Fragment>
                <CssBaseline/>
                <Topbar currentPath={currentPath}/>
                <div className={classes.root}>
                    <Grid container justify="center">
                        <Grid spacing={4} alignItems="center" justify="left" container className={classes.grid}>
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <div className={classes.box1}>
                                        <Typography color='secondary' variant="h4" gutterBottom>
                                            Description
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            The algorithm proposed in [1] is divided in two parts, a neighbor discovery
                                            phase and a hole discovery phase.
                                            In order to explain both phases the following example will be used:
                                        </Typography>
                                        <div style={{textAlign: 'left'}}>
                                            <P5Wrapper sketch={exampleAlgo} clickOnNodes={false}/>
                                        </div>

                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <div className={classes.box1} style={{height: 600}}>
                                        <Typography color='secondary' variant="h4" gutterBottom>
                                            Neighbor Discovery phase
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            In order to execute this phase, a reference node <MathNotation inline={true}
                                                                                                           text={"RN"}/>
                                            must be selected (Node 0 for the present example). <MathNotation
                                            inline={true} text={"RN"}/> broadcasts a message <MathNotation
                                            inline={true} text={"M_1"}/>
                                            which contains its coordinates. Each node that receives the message
                                            calculates
                                            the distance <MathNotation inline={true} text={"d_a"}/> between themselves
                                            and the
                                            reference node. If &nbsp;
                                            <MathNotation inline={true} text={"d_a \\leq\t R_s"}/>, then that node sets
                                            itself as
                                            a one-hop neighbor of <MathNotation inline={true} text={"RN"}/> and unicast
                                            its coordinates
                                            and ID to <MathNotation inline={true} text={"RN"}/>. Next, all one-hop
                                            neighbors broadcast a
                                            message <MathNotation inline={true} text={"M_2"}/> that contains the
                                            coordinates of <MathNotation inline={true} text={"RN"}/>.
                                            The same process is applied with the nodes that receive the
                                            message <MathNotation inline={true} text={"M_2"}/>.
                                            Each node computes the distance <MathNotation inline={true}
                                                                                          text={"d_b"}/> between
                                            themselves and <MathNotation inline={true} text={"RN"}/>.
                                            If &nbsp; <MathNotation inline={true} text={"d_b \\leq\t 2R_s"}/>, then that
                                            node sets itself as a
                                            two hop-neighbor of <MathNotation inline={true} text={"RN"}/>. After the
                                            process is completed the reference node
                                            has information about its one and two hop neighbors.
                                            This process has to be completed by each node in the neighbor in a
                                            distributed manner.

                                        </Typography>
                                        <div style={{textAlign: 'left'}}>
                                            <P5Wrapper sketch={exampleAlgo} clickOnNodes={true}
                                                       sendNeighbors={this.receiveNeighbors}/>

                                        </div>
                                        <Typography variant="body1" gutterBottom>
                                            <b>INSTRUCTIONS :</b> Click on a node to set it as reference and compute its
                                            neighbors <br/>
                                            <b>Reference Node :</b> {this.state.referenceNode.id} <br/>
                                            <b>One-hop neighbors
                                                :</b> {this.state.oneHopeNeighbors.map((s) => s.id.toString() + ' ')}
                                            <br/>
                                            <b>Two-hop neighbors
                                                :</b> {this.state.twoHopeNeighbors.map((s) => s.id.toString() + ' ')}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <div className={classes.box1} style={{height: 600}}>
                                        <Typography color='secondary' variant="h4" gutterBottom>
                                            Hole detection phase
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            This phase can be executed in a distributed way once every node knows its
                                            one and two hop neighbors.
                                            The algorithm is as follows:<br/>
                                            <b>1.- Get one and two hop neighbors of the Reference node and assign them
                                                to a set N </b><br/>
                                            N = {N.map((s) => s.id.toString() + ' ')} <br/>
                                            <b>2.- Get nodes from N whose y-coordinate is greater or equal than the
                                                y-coordinate of the reference node and assign them to set N_u </b><br/>
                                            N_u = {N_u.map((s) => s.id.toString() + ' ')}<br/>
                                            <b>3.- Sort N_u in ascending order by x coordinate and assign it to a new
                                                set N_uX </b><br/>
                                            N_uX = {N_uX.map((s) => s.id.toString() + ' ')}<br/>
                                            <b>4.- Get nodes from N whose y-coordinate is lower than the y-coordinate of
                                                the reference node and assign them to set N_d</b><br/>
                                            N_d = {N_d.map((s) => s.id.toString() + ' ')}<br/>
                                            <b>5.- Sort N_d in descending order by x coordinate and assign it to a new
                                                set N_dX </b><br/>
                                            N_dX = {N_dX.map((s) => s.id.toString() + ' ')}<br/>
                                            <b>5.- Select first two nodes A_i and A_j from set N_uX </b><br/>



                                        </Typography>

                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles)(AlgorithmDescription));
