import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import {withRouter, Link} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import SimpleLineChart from '../components/SimpleLineChart';
import Months from './common/Months';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Loading from './common/Loading';

import Topbar from './Topbar';
import MathNotation from "../components/MathNotation";
import Lemma1 from "./dialogs/proofs/Lemma1";

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
    box: {
        marginBottom: 40,
        height: 65
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

class TheoreticalAnalysis extends Component {

    state = {
        loading: true,
        modals: {
            active: false,
            lemma1: {
                active: false,
                content: ''
            },
            lemma2: false,
            lemma3: false,
            lemma4: false,
            lemma5: false,
            lemma6: false,
            lemma7: false,
            lemma8: false,
            lemma9: false,
            theorem1: false,
            theorem2: false,
            theorem3: false
        }
    };

    componentDidMount() {
    }

    dialogClose = (lt) => {
        this.setState({modals: {[lt]: {['active']: false}}})
    };

    openDialog = (lt) => {
        console.log("Open dialog");
        // this.setState({modals: {[lt]: true}})
        this.setState({modals: {[lt]: {['active']: true}}})
    };

    render() {
        const {classes} = this.props;
        const currentPath = this.props.location.pathname
        return (
            <React.Fragment>
                <CssBaseline/>
                <Topbar currentPath={currentPath}/>
                <div className={classes.root}>
                    <Grid container justify="center">
                        <Grid spacing={4} alignItems="center" justify="center" container className={classes.grid}>
                            <Grid spacing={4} container item xs={12}>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Axiom 1
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    The triangle (acute, right or obtuse) formed by a reference node
                                                    with any pair of its neighbors (one-hop or two- hop) must be
                                                    enclosed within the effective sensing range of those three nodes.
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button color='primary' variant="contained"
                                                        className={classes.actionButtom}>
                                                    Learn more
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Axiom 2
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    The circum radius (R) of the triangle (acute, right or obtuse)
                                                    formed by a reference node with any pair of its neighbors (one-hop
                                                    or two-hop) must be either rRs or 4Rs.
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button color='primary' variant="contained"
                                                        className={classes.actionButtom}>
                                                    Learn more
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Axiom 3
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    The circum center (Z) of the triangle (acute, right or obtuse)
                                                    formed by a reference node with any pair of its neighbors (one-hop
                                                    or two-hop) must be located inside or outside the sensing range of
                                                    those three sensors.
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button color='primary' variant="contained"
                                                        className={classes.actionButtom}>
                                                    Learn more
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>

                            <Grid spacing={4} container item xs={12}>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Lemma 1
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    If an acute triangle is formed by a reference node with its one-hop
                                                    neighbors, then no coverage hole exists within those three sensors.
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button
                                                    onClick={() => this.openDialog('lemma1')}
                                                    color='primary' variant="contained"
                                                    className={classes.actionButtom}>
                                                    Proof
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Lemma 2
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    If an obtuse triangle is formed by a reference node with its one-hop
                                                    neighbors such that its circum radius R r Rs , then no hole exists
                                                    within those sensors.
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button color='primary' variant="contained"
                                                        className={classes.actionButtom}>
                                                    Proof
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Lemma 3
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    If an obtuse triangle is formed by a reference node with its one-hop
                                                    neighbors such that its circum radius R4Rs, and circum center (Z) is
                                                    not covered by any of its neighbors, then there must be a hole
                                                    besides those sensors.
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button color='primary' variant="contained"
                                                        className={classes.actionButtom}>
                                                    Proof
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Lemma 4
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    If an acute triangle is formed by a reference node with its two-hop
                                                    neighbors and its circum radius R 4 Rs , then there must be a
                                                    coverage hole within those sensors, otherwise no coverage hole
                                                    exists
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button color='primary' variant="contained"
                                                        className={classes.actionButtom}>
                                                    Proof
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Lemma 5
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    If an obtuse triangle is formed by a reference node with its two-hop
                                                    neighbors such that the angle subtended at the reference
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button color='primary' variant="contained"
                                                        className={classes.actionButtom}>
                                                    Proof
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Lemma 6
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    If an obtuse triangle is formed by a reference node with its two-hop
                                                    neighbors and the angle subtended at the reference node is obtuse,
                                                    coverage hole exists in between those two-hop neighbors.
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button color='primary' variant="contained"
                                                        className={classes.actionButtom}>
                                                    Proof
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Lemma 7
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    If an acute triangle is formed by a reference node with one of its
                                                    one-hop neighbor and another one with its two-hop neighbors, no hole
                                                    exists if R r Rs , otherwise, coverage hole exists within them.
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button color='primary' variant="contained"
                                                        className={classes.actionButtom}>
                                                    Proof
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Lemma 8
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    If an obtuse triangle is formed by a reference node with one of its
                                                    one-hop neighbor and another one with its two-hop neighbors, such
                                                    that angle subtended at the reference node is acute, no hole exists
                                                    within them if RrRs, otherwise a hole must exist if circum center Z
                                                    is not covered by any other sensor.
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button color='primary' variant="contained"
                                                        className={classes.actionButtom}>
                                                    Proof
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Lemma 9
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    If the triangle formed by a reference node with one of its one-hop
                                                    neighbor and another one with its two-hop neighbors subtends an
                                                    obtuse angle at the reference node, hole exists within those
                                                    neighbors.
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button color='primary' variant="contained"
                                                        className={classes.actionButtom}>
                                                    Proof
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid spacing={4} container item xs={12}>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Theorem 1
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    Coverage hole may or may not exist in the network, if
                                                    an acute triangle is formed by a reference node with its neighbors.
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button color='primary' variant="contained"
                                                        className={classes.actionButtom}>
                                                    Proof
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Theorem 2
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    Coverage hole may or may not exist in the network, if an obtuse
                                                    triangle is formed by a reference node with its neighbors.
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button color='primary' variant="contained"
                                                        className={classes.actionButtom}>
                                                    Proof
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box}>
                                                <Typography color='secondary' gutterBottom>
                                                    Theorem 3
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    Presence or absence of coverage hole in the network depends on the
                                                    nature of angle formed by a reference node with its neighbors.
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button color='primary' variant="contained"
                                                        className={classes.actionButtom}>
                                                    Proof
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Lemma1
                        open={this.state.modals.lemma1.active}
                        identifier={'lemma1'}
                        onClose={this.dialogClose}/>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles)(TheoreticalAnalysis));
