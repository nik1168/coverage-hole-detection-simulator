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
        height: 400
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
                                    <div className={classes.box1}>
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
                                            of a node. In the example below, there is a coverage hole in the red colored area
                                        </Typography>
                                        <div style={{textAlign:'left'}}>
                                            <P5Wrapper sketch={sketch_ch_definition}/>
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
