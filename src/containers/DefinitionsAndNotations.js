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
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from '@material-ui/icons/StarBorder';

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

class DefinitionsAndNotations extends Component {

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
        const currentPath = this.props.location.pathname;
        const tileData = [
            {
                img: "https://png.pngtree.com/svg/20170906/sensor_609853.png",
                title: 'Image',
                author: 'author',
            },
            {
                img: "https://png.pngtree.com/svg/20170906/sensor_609853.png",
                title: 'Image',
                author: 'author',
            },
            {
                img: "https://png.pngtree.com/svg/20170906/sensor_609853.png",
                title: 'Image',
                author: 'author',
            },
            {
                img: "https://png.pngtree.com/svg/20170906/sensor_609853.png",
                title: 'Image',
                author: 'author',
            }
        ];
        return (
            <React.Fragment>
                <CssBaseline/>
                <Topbar currentPath={currentPath}/>
                <div className={classes.root}>
                    <Grid container justify="center">
                        <Grid spacing={4} alignItems="center" justify="center" container className={classes.grid}>
                            <GridList className={classes.gridList} cols={2.5} spacing={10}>
                                {tileData.map(tile => (
                                    <GridListTile key={tile.img}>
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
                                        {/*<GridListTileBar*/}
                                        {/*    title={tile.title}*/}
                                        {/*    classes={{*/}
                                        {/*        root: classes.titleBar,*/}
                                        {/*        title: classes.title,*/}
                                        {/*    }}*/}
                                        {/*    actionIcon={*/}
                                        {/*        <IconButton aria-label={`star ${tile.title}`}>*/}
                                        {/*            <StarBorderIcon className={classes.title}/>*/}
                                        {/*        </IconButton>*/}
                                        {/*    }*/}
                                        {/*/>*/}
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid spacing={4} alignItems="center" justify="center" container className={classes.grid}>
                            <GridList className={classes.gridList} cols={2.5}>
                                {tileData.map(tile => (
                                    <GridListTile key={tile.img}>
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
                                        {/*<GridListTileBar*/}
                                        {/*    title={tile.title}*/}
                                        {/*    classes={{*/}
                                        {/*        root: classes.titleBar,*/}
                                        {/*        title: classes.title,*/}
                                        {/*    }}*/}
                                        {/*    actionIcon={*/}
                                        {/*        <IconButton aria-label={`star ${tile.title}`}>*/}
                                        {/*            <StarBorderIcon className={classes.title}/>*/}
                                        {/*        </IconButton>*/}
                                        {/*    }*/}
                                        {/*/>*/}
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles)(DefinitionsAndNotations));
