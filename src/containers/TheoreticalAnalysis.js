import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import {withRouter} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MathNotation from "../components/MathNotation";

import Topbar from './Topbar';
import Lemma1 from "./dialogs/proofs/Lemma1";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {DATA_THEO} from "../data/theo";

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
        selectedImage: "",
        selectedTest: "",
        identifier : "",
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

    openDialog = (axiom) => {
        console.log("Open dialog");
        // this.setState({modals: {[lt]: true}})
        this.setState({
            modals: {['lemma1']: {['active']: true}},
            selectedImage: axiom.proof['img'],
            identifier : axiom['title'],
            selectedTest: axiom.proof['description'],
            des : axiom.description
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
                    {
                        keys.map((key) => (
                            <Grid container justify="center">
                                <Grid spacing={4} alignItems="center" justify="left" container className={classes.grid}>
                                    <Typography color='secondary' variant="h4" gutterBottom>
                                        {key}
                                    </Typography>
                                    <GridList className={classes.gridList} cols={2.5} spacing={20}>
                                        {DATA_THEO[key].map((axiom, indx) => (
                                            <GridListTile key={indx}>
                                                <Paper className={classes.paper}>
                                                    <div>
                                                        <div className={classes.box}>
                                                            <Typography color='secondary' gutterBottom>
                                                                {axiom.title}
                                                            </Typography>
                                                            <Typography variant="body1" gutterBottom>
                                                                { axiom.description}
                                                            </Typography>
                                                        </div>
                                                        {
                                                            axiom['proof'] && (
                                                                <div className={classes.alignRight}>
                                                                    <Button color='primary' variant="contained"
                                                                            className={classes.actionButtom}
                                                                            onClick={() => {
                                                                                this.openDialog(axiom)
                                                                            }}
                                                                    >
                                                                        Proof!
                                                                    </Button>
                                                                </div>
                                                            )
                                                        }
                                                        <div style={{paddingTop: 8}}></div>
                                                    </div>
                                                </Paper>
                                            </GridListTile>
                                        ))}
                                    </GridList>
                                </Grid>
                            </Grid>
                        ))
                    }
                    <Lemma1
                        open={this.state.modals.lemma1.active}
                        identifier={this.state.identifier}
                        img={this.state.selectedImage}
                        des={this.state.des}
                        description={this.state.selectedTest}
                        onClose={this.dialogClose}/>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles)(TheoreticalAnalysis));
