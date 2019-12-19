import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import {withRouter} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Topbar from './Topbar';
import Lemma1 from "./dialogs/proofs/Lemma1";
import {DATA_THEO} from "../data/theo";
import P5Wrapper from "react-p5-wrapper";
import sketch_ch_definition from "../sketches/CoverageHoleDefinition";
import MathNotation from "../components/MathNotation";
import MathJax from "react-mathjax";
import sketchSensingRate from "../sketches/SensingRate";
import sketchReferenceNode from "../sketches/ReferenceNode";
import sketchNeighborNode from "../sketches/Neighbors";
import sketchCircumRadiusCenterNode from "../sketches/CircumRadiusCenter";

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

class DefinitionsAndNotations extends Component {

    state = {
        loading: true,
        selectedImage: "",
        selectedTest: "",
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

    render() {
        const {classes} = this.props;
        const currentPath = this.props.location.pathname;
        const keys = Object.keys(DATA_THEO);
        return (
            <React.Fragment>
                <CssBaseline/>
                <Topbar currentPath={currentPath}/>
                <div className={classes.root}>
                    <Grid container justify="center">
                        <Grid spacing={4} alignItems="center" justify="left" container className={classes.grid}>
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <div className={classes.box1} style={{height:370}}>
                                        <Typography color='secondary' variant="h4" gutterBottom>
                                            Coverage Hole
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            In a wireless sensor network, a coverage hole can be defined as an area
                                            within the network that is not covered by any
                                            sensor node, this can result in lack of monitoring of that specific area.
                                            What we define as coverage depends on the context
                                            of the application. For instance, in the art gallery problem, where the main
                                            objective is to get the minimum number of "cameras"
                                            that cover an art gallery room such that every point is seen by at least one
                                            camera. In this context, the coverage is determined by
                                            the visibility of the observers. As mentioned above, the coverage of a
                                            point, in the context of WSN, denotes that the point is located within de
                                            sensing range
                                            of a node [1,2]. In the example below, there is a coverage hole in the red colored
                                            area.
                                        </Typography>
                                        <div style={{textAlign: 'left'}}>
                                            <P5Wrapper sketch={sketch_ch_definition}/>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <div className={classes.box1} style={{height:350}}>
                                        <Typography color='secondary' variant="h4" gutterBottom>
                                            Sensing and Communication Range (<MathNotation inline={true} text={"R_s"}/>)
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            The sensing range of a node is the circumference of radius <MathNotation
                                            inline={true} text={"R_s"}/>
                                            represented as a disk around the node. Any object that falls within this
                                            area can be detected by
                                            the node. For this particular case, the communication range <MathNotation
                                            inline={true} text={"R_c"}/> of a sensor will have the same value as the
                                            sensing rate [1]. In the example below, the sensing rate of "Node 0" is
                                            represented by the green area.
                                        </Typography>
                                        <div style={{textAlign: 'left'}}>
                                            <P5Wrapper sketch={sketchSensingRate}/>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <div className={classes.box1} style={{height:450}}>
                                        <Typography color='secondary' variant="h4" gutterBottom>
                                            Reference Node (<MathNotation inline={true} text={"RN"}/>)
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            A Reference Node <MathNotation inline={true} text={"RN"}/>, is in charge of
                                            initializing the coverage hole detection algorithm.
                                            It does this by first finding its neighbors information in a range
                                            of <MathNotation inline={true} text={"2R_s"}/>. In the example below, "Node
                                            0" is a reference node and Nodes 1, 2 and 3 are its neighbors [1].

                                        </Typography>
                                        <div style={{textAlign: 'left'}}>
                                            <P5Wrapper sketch={sketchReferenceNode}/>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <div className={classes.box1}>
                                        <Typography color='secondary' variant="h4" gutterBottom>
                                            Neighbors
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>

                                            If Node 0 and Node 1 are two nodes where the distance between them is lower
                                            or equal than the sensing range (<MathNotation inline={true}
                                                                                           text={"distance(AB) \\leq\t R_s"}/>),
                                            then Node 0 and 1 are one-hope neighbors.
                                            On the other hand if the distance between them is lower or equal than twice
                                            the sensing range <MathNotation inline={true}
                                                                            text={"distance(AB) \\leq\t 2R_s"}/>, then
                                            they are two-hop neighbors.
                                            In the example below, Node 3 is a one hope neighbor of Node 0 since the
                                            distance between them is lower or equal than the sensing range of Node 0,
                                            whereas Nodes 1 and 2 are two-hop neighbors of Node 0 since the distance
                                            between
                                            them and is lower or equal than twice the sensing range of Node 0 [1].

                                        </Typography>
                                        <div style={{textAlign: 'left'}}>
                                            <P5Wrapper sketch={sketchNeighborNode}/>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <div className={classes.box1}>
                                        <Typography color='secondary' variant="h4" gutterBottom>
                                            Circum Radius (<MathNotation inline={true} text={"R"}/>) and Circum Center (<MathNotation
                                            inline={true} text={"Z"}/>)
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>

                                            Circum Radius <MathNotation inline={true} text={"R"}/> is denoted as the
                                            radius of the circum circle denoted by the location of three nodes as the
                                            vertices of a triangle.
                                            In the example below, <MathNotation inline={true} text={"R"}/> is the circum
                                            radius of the triangle <MathNotation inline={true} text={"T"}/> formed by
                                            NODE0-NODE1-NODE2.
                                            Let <MathNotation inline={true} text={"p"}/>, <MathNotation inline={true}
                                                                                                        text={"q"}/> and <MathNotation
                                            inline={true} text={"r"}/> denote de length of each side of the
                                            triangle <MathNotation inline={true} text={"T"}/> and <MathNotation
                                            inline={true} text={"\\Delta\t"}/> be its area,
                                            then <MathNotation inline={true} text={"R = \\frac{pqr}{4\\Delta\t}\t"}/>
                                            <br/>
                                            <br/>

                                            Circum Center <MathNotation inline={true} text={"Z"}/> is denoted as the
                                            center of the circum circle formed by the location of three nodes as the
                                            vertices of a triangle.
                                            In the example below, <MathNotation inline={true} text={"R"}/> is the circum
                                            radius of the triangle <MathNotation inline={true} text={"T"}/> formed by
                                            NODE0-NODE1-NODE2.
                                            Let <MathNotation inline={true} text={"(x_1,y_1)"}/> , <MathNotation
                                            inline={true} text={"(x_2,y_2)"}/> and <MathNotation inline={true}
                                                                                               text={"(x_3,y_3)"}/> be the
                                            coordinates of the vertices of triangle <MathNotation inline={true} text={"T"}/> then the coordinates
                                            <MathNotation inline={true} text={"(x_0,y_0)"}/>  of <MathNotation inline={true} text={"Z"}/> can be found by
                                            solving the following linear equations: <br/>
                                            <MathNotation inline={true} text={"x_0(x_2 -x_1) + y_0(y_2 - y_1) + c1"}/>
                                            <br/>
                                            <MathNotation inline={true} text={"x_0(x_3 -x_2) + y_0(y_3 - y_1) + c2"}/>


                                        </Typography>
                                        <div style={{textAlign: 'left'}}>
                                            <P5Wrapper sketch={sketchCircumRadiusCenterNode}/>
                                        </div>
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

export default withRouter(withStyles(styles)(DefinitionsAndNotations));
