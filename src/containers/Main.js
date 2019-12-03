import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import {Link, withRouter} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import Topbar from './Topbar';
import {bindActionCreators} from "redux";
import * as theoremsActions from "../actions/theoretical";
import BounceNode from "../components/BounceNode";

const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey['100'],
        overflow: 'hidden',
        background: `url(${backgroundShape}) no-repeat`,
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
    actionButtomR: {
        textTransform: 'uppercase',
        margin: theme.spacing(1),
        // width: 152
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
        height: 180
    },
    box2: {
        marginBottom: 40,
        height: 80
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

class Main extends Component {

    state = {
        learnMoredialog: false,
        getStartedDialog: false
    };

    componentDidMount() {
    }

    openDialog = (event) => {
        this.setState({learnMoredialog: true});
    };

    dialogClose = (event) => {
        this.setState({learnMoredialog: false});
    };

    openGetStartedDialog = (event) => {
        this.setState({getStartedDialog: true});
    };

    closeGetStartedDialog = (event) => {
        this.setState({getStartedDialog: false});
    };

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                <Topbar/>
                <div className={classes.root}>
                    <Grid container justify="center">
                        <Grid spacing={4} alignItems="center" justify="center" container className={classes.grid}>
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <div className={classes.box2}>
                                                <Typography color='secondary' variant="h5" gutterBottom>
                                                    Welcome!
                                                </Typography>
                                                <Typography variant="h6" gutterBottom>
                                                    The following project is an implementation of an algorithm that
                                                    applies computational geometry in order to find coverage holes in
                                                    wireless sensor networks
                                                </Typography>
                                            </div>
                                            <div className={classes.alignRight}>
                                                <Button component={Link} to='/definitions'  color='primary' variant="outlined"
                                                        className={classes.actionButtomR}>
                                                    Take me to some definitions!
                                                </Button>
                                                <Button component={Link} to='/demo' variant='contained' onClick={() => {
                                                }} color="primary" className={classes.actionButtomR} autoFocus>
                                                    Go to Demo!!
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={3}>
                                    <div>
                                        <div className={classes.box}>
                                            <BounceNode/>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <div className={classes.box} style={{paddingTop: '15px'}}>
                                            <BounceNode/>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <div className={classes.box}>
                                            <BounceNode/>
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

function mapStateToProps(state) {
    return {
        theorems: state.theorems.theorems
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...theoremsActions}, dispatch)
}

// export default withRouter(withStyles(styles)(Main));
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Main)))
