import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import {Link, withRouter} from 'react-router-dom';
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
    Node, nodesThatCoverCircumCenter, Point, Triangle
} from "../utils/geometryUtils";
import TriangleSketch from "../sketches/Triangle";
import Button from "@material-ui/core/Button";
import PseudoDescription from "./dialogs/pseudoDescription";

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
        oneHopeNeighbors: [new Node(2, 2, 1), new Node(3, 3, 2)],
        twoHopeNeighbors: [],
        referenceNode: new Node(0, 0, 0),
        pseudoDescription: false,
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
        this.setState({pseudoDescription: false})
    };

    openDialog = () => {
        this.setState({
            pseudoDescription: true
        })
    };

    receiveNeighbors = (referenceNode, oneHopeNeighbors, twoHopeNeighbors) => {
        console.log("Receive neighbors")
        console.log(referenceNode)
        console.log(oneHopeNeighbors)
        console.log(twoHopeNeighbors)
        this.setState({oneHopeNeighbors, twoHopeNeighbors, referenceNode: referenceNode})
    };

    render() {
        const {classes} = this.props;
        const currentPath = this.props.location.pathname;
        const N = joinArrays(this.state.oneHopeNeighbors, this.state.twoHopeNeighbors);
        const nodes = N.concat(this.state.referenceNode);
        const N_u = N.filter((val) => val.y <= this.state.referenceNode.y);
        let N_uX = N_u.sort(function (a, b) {
            return a.x - b.x
        });
        N_uX = N_uX.length >= 2 ? N_uX : [new Node(2, 2, -1), new Node(3, 3, -2)]
        const N_d = N.filter((val) => val.y > this.state.referenceNode.y);
        const N_dX = N_d.sort(function (a, b) {
            return b.x - a.x
        });
        const triangle = new Triangle(this.state.referenceNode, N_uX[0], N_uX[1]);
        const R = triangle.getCircumRadius();
        const Z = triangle.getCircumCenter();
        let noHoleDetected = nodesThatCoverCircumCenter(Z, nodes, nodes.sensingRate).length > 0;
        return (
            <React.Fragment>
                <CssBaseline/>
                <Topbar currentPath={currentPath}/>
                <div className={classes.root}>
                    <Grid container justify="center">
                        <Grid spacing={4} alignItems="center" justify="left" container className={classes.grid}>
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <div className={classes.box1} style={{height: 400}}>
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
                                            distributed manner [1].

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
                                    <div className={classes.box1} style={{height: N_uX[0].id !== -1 ? 700 : 270}}>
                                        <Typography color='secondary' variant="h4" gutterBottom>
                                            Hole detection phase
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <Button
                                                onClick={this.openDialog}
                                                color='contained'
                                                variant="outlined"
                                                className={classes.actionButtomR}>
                                                See pseudo code
                                            </Button> <br/>
                                            This phase can be executed in a distributed way once every node knows its
                                            one and two hop neighbors.
                                            The algorithm is as follows:<br/>
                                            <b>1.- Get one and two hop neighbors of the Reference node and assign them
                                                to a set M </b><br/>
                                            M = {N.map((s) => s.id.toString() + ' ')} <br/>
                                            <b>2.- Get nodes from M whose y-coordinate is greater or equal than the
                                                y-coordinate of the reference node and assign them to set M_u </b><br/>
                                            M_u = {N_u.map((s) => s.id.toString() + ' ')}<br/>
                                            <b>3.- Sort M_u in ascending order by x coordinate and assign it to a new
                                                set M_uX </b><br/>
                                            M_uX = {N_uX.map((s) => s.id.toString() + ' ')}<br/>
                                            <b>4.- Get nodes from M whose y-coordinate is lower than the y-coordinate of
                                                the reference node and assign them to set M_d</b><br/>
                                            M_d = {N_d.map((s) => s.id.toString() + ' ')}<br/>
                                            <b>5.- Sort M_d in descending order by x coordinate and assign it to a new
                                                set M_dX </b><br/>
                                            M_dX = {N_dX.map((s) => s.id.toString() + ' ')}<br/>
                                            <b>6.- Select first two nodes A_i (Node {N_uX[0].id}) and A_j
                                                (Node {N_uX[1].id}) from set M_uX </b><br/>

                                            {
                                                N_uX.length >= 2 && N_uX[0].id !== -1 && (
                                                    <P5Wrapper sketch={TriangleSketch}
                                                               clickOnNodes={false}
                                                               triangle={triangle}
                                                               nodes={[this.state.referenceNode, N_uX[0], N_uX[1]]}/>
                                                )
                                            }
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <div className={classes.box1} style={{height: N_uX[0].id !== -1 ? 815 : 200}}>
                                        <Typography variant="body1" gutterBottom>
                                            <b>7.- Compute the circum radius R and circum center Z of triangle formed by
                                                the reference node (Node {this.state.referenceNode.id}) and A_i
                                                (Node {N_uX[0].id}),
                                                A_j (Node {N_uX[1].id}) </b><br/>
                                            {
                                                N_uX.length >= 2 && N_uX[0].id !== -1 && (
                                                    <P5Wrapper sketch={TriangleSketch}
                                                               clickOnNodes={false}
                                                               triangle={triangle}
                                                               drawCircle={true}
                                                               drawRadiusLine={true}
                                                               computeCircumData={true}/>
                                                )
                                            }
                                            <b>8.- Verify if the triangle formed by A_i (Node {N_uX[0].id}),
                                                A_j (Node {N_uX[1].id}) and the reference node
                                                (Node{this.state.referenceNode.id})
                                                forms an obtuse or acute triangle </b><br/>
                                            {
                                                N_uX.length >= 2 && N_uX[0].id !== -1 && (
                                                    <P5Wrapper sketch={TriangleSketch}
                                                               clickOnNodes={false}
                                                               triangle={triangle}
                                                               drawCircle={true}
                                                               drawRadiusLine={true}
                                                               drawTriangle={true}
                                                               computeCircumData={false}/>
                                                )
                                            }
                                            {

                                                N_uX.length >= 2 && N_uX[0].id !== -1 && (
                                                    <span>
                                                        Angles: <br/>
                                                        <MathNotation inline={true}
                                                                      text={"\\alpha\t"}/> : {triangle.getAngles().alpha * (180 / Math.PI)}
                                                        <br/>
                                                   <MathNotation inline={true}
                                                                 text={"\\beta\t"}/> : {triangle.getAngles().betta * (180 / Math.PI)}
                                                        <br/>
                                                   <MathNotation inline={true}
                                                                 text={"\\gamma\t"}/> : {triangle.getAngles().gamma * (180 / Math.PI)}
                                                        <br/>
                                                        {
                                                            triangle.isAcute() && (
                                                                <span>Triangle is acute (All angles have a value less than 90°)</span>
                                                            )
                                                        }
                                                        {
                                                            triangle.isObtuse() && (
                                                                <span>Triangle is obtuse (One angle is greater than 90°)</span>
                                                            )
                                                        }
                                                    </span>

                                                )
                                            }

                                            <br/>
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                {
                                    N_uX.length >= 2 && N_uX[0].id !== -1 && triangle.isObtuse() && (
                                        <Grid item xs={12}>
                                            <div className={classes.box1} style={{height: 750}}>
                                                <Typography variant="body1" gutterBottom>
                                                    <br/>
                                                    <b> 9.- In this case the triangle is obtuse, therefore we need to
                                                        first
                                                        compare <MathNotation inline={true}
                                                                              text={"R_s"}/> with <MathNotation
                                                            inline={true} text={"R"}/>. </b><br/>
                                                    {
                                                        N_uX.length >= 2 && (
                                                            <span>


                                            <b>If <MathNotation inline={true} text={"R \\leq\t R_s"}/> then there is not
                                                a coverage hole around the reference node (Node {this.state.referenceNode.id}) and A_i (Node {N_uX[0].id}), A_j (Node {N_uX[1].id}) </b><br/>
                                                <b>R: </b> {R} <br/>
                                            <b>R_s: </b>{this.state.referenceNode.sensingRate} <br/>
                                                                {
                                                                    R <= this.state.referenceNode.sensingRate && (
                                                                        <span>
                                                                 No coverage hole detected around reference node (Node {this.state.referenceNode.id}) and A_i (Node {N_uX[0].id}), A_j (Node {N_uX[1].id})
                                                                    <br/><b>10.- Repeat process for any pair of nodes and reference node of set <MathNotation
                                                                            inline={true}
                                                                            text={"M_uX"}/> and <MathNotation
                                                                            inline={true} text={"M_dX"}/></b>
                                                                 </span>
                                                                    )
                                                                }
                                                                {
                                                                    R > this.state.referenceNode.sensingRate && (
                                                                        <span>
                                                                            In this case, <MathNotation inline={true}
                                                                                                        text={"R > R_s"}/>, therefore we need to check if Z is covered by any other node.
                                                                            <P5Wrapper sketch={TriangleSketch}
                                                                                       clickOnNodes={false}
                                                                                       drawCircle={false}
                                                                                       drawTriangle={false}
                                                                                       otherNodes={nodes}
                                                                                       triangle={triangle}
                                                                                       computeCircumData={true}/>
                                                                            {
                                                                                !noHoleDetected && (
                                                                                    <span>
                                                                                        <b>There is a coverage hole since Z is not covered by any other node</b>
                                                                                        <br/><b>10.- Repeat process for any pair of nodes and reference node of set <MathNotation
                                                                                        inline={true}
                                                                                        text={"M_uX"}/> and <MathNotation
                                                                                        inline={true}
                                                                                        text={"M_dX"}/></b>
                                                                                    </span>

                                                                                )
                                                                            }
                                                                            {
                                                                                noHoleDetected && (
                                                                                    <span>
                                                                                        <b>There is not a coverage hole since Z is covered by a node</b>
                                                                                        <br/><b>10.- Repeat process for any pair of nodes and reference node of set <MathNotation
                                                                                        inline={true}
                                                                                        text={"M_uX"}/> and <MathNotation
                                                                                        inline={true}
                                                                                        text={"M_dX"}/></b>
                                                                                    </span>

                                                                                )
                                                                            }

                                                        </span>
                                                                    )
                                                                }
                                            </span>

                                                        )
                                                    }


                                                </Typography>
                                            </div>
                                        </Grid>
                                    )
                                }
                                {
                                    N_uX.length >= 2 && N_uX[0].id !== -1 && triangle.isAcute() && (
                                        <span>


                                            <b>9.- If <MathNotation inline={true} text={"R \\leq\t R_s"}/> then there is not
                                                a coverage hole around the reference node {this.state.referenceNode.id} and Node {N_uX[0].id}, Node {N_uX[1].id} </b><br/>
                                                <b>R: </b> {R} <br/>
                                            <b>R_s: </b>{this.state.referenceNode.sensingRate} <br/>
                                            {
                                                R <= this.state.referenceNode.sensingRate && (
                                                    <span>
                                                        Since <MathNotation inline={true}
                                                                            text={"" + R + " \\leq\t " + this.state.referenceNode.sensingRate + ""}/>, there is not
                                                        a coverage hole around the reference node {this.state.referenceNode.id} and Node {N_uX[0].id}, Node {N_uX[1].id}
                                                        <br/><b>10.- Repeat process for any pair of nodes and reference node of set <MathNotation
                                                        inline={true} text={"M_uX"}/> and <MathNotation inline={true}
                                                                                                        text={"M_dX"}/></b>
                                                    </span>
                                                )
                                            }
                                            {
                                                R > this.state.referenceNode.sensingRate && (
                                                    <span>
                                                        Since <MathNotation inline={true}
                                                                            text={"" + R + " > " + this.state.referenceNode.sensingRate + ""}/>, there is a coverage hole around the reference node {this.state.referenceNode.id} and Node {N_uX[0].id}, Node {N_uX[1].id}
                                                        <br/><b>10.- Repeat process for any pair of nodes and reference node of set <MathNotation
                                                        inline={true} text={"M_uX"}/> and <MathNotation inline={true}
                                                                                                        text={"M_dX"}/></b>
                                                    </span>
                                                )
                                            }
                                        </span>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <PseudoDescription
                        open={this.state.pseudoDescription}
                        onClose={this.dialogClose}/>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles)(AlgorithmDescription));
