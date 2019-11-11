import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HelpIcon from '@material-ui/icons/Help';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {timesClicked} from '../../sketches/sketch';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as demoActions from "../../actions/demo";
import green from '@material-ui/core/colors/green';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {red} from "@material-ui/core/colors";
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';


const styles = theme => ({
    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
        color: theme.palette.text.secondary
    },
    outlinedButtom: {
        textTransform: 'uppercase',
        margin: theme.spacing(1)
    },
    avatar: {
        margin: 10,
        backgroundColor: theme.palette.grey['200'],
        color: theme.palette.text.primary,
    },
    avatarContainer: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginBottom: theme.spacing(4)
        }
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
})

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: red
    },
});


class SideBar extends Component {
    getCoords = (x, y) => {
        console.log("Geto coords from component :)");
        console.log(x, y);
        console.log("Times clicked");
        console.log(timesClicked)
        this.props.addNodeCreator(new Node(x, y))
    };

    componentDidMount() {
        console.log("Props Card Item")
        console.log(this.props)
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <div className={classes.itemContainer}>
                        <div className={classes.baseline}>
                            <div className={classes.inline}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.outlinedButtom}
                                    startIcon={<AddIcon/>}
                                >
                                    Create Nodes
                                </Button>
                            </div>
                            <div className={classes.inline}>
                                <MuiThemeProvider theme={theme}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.outlinedButtom}
                                        startIcon={<PlayArrowIcon/>}
                                    >
                                        Start simulation
                                    </Button>
                                </MuiThemeProvider>

                            </div>
                            <div className={classes.inline}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.outlinedButtom}
                                    startIcon={<SettingsInputAntennaIcon/>}
                                >
                                    Find Coverage Holes
                                </Button>
                            </div>
                            <div className={classes.inline}>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.outlinedButtom}
                                    startIcon={<PersonAddIcon/>}
                                >
                                    Neighbor Discovery
                                </Button>
                            </div>
                            <div className={classes.inline}>
                                <MuiThemeProvider theme={theme}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.outlinedButtom}
                                        startIcon={<SignalWifiOffIcon/>}
                                    >
                                        Node error
                                    </Button>
                                </MuiThemeProvider>
                            </div>
                            <div className={classes.inline}>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.outlinedButtom}
                                    startIcon={<HelpIcon/>}
                                >
                                </Button>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        nodes: state.demo.nodes,
        sensingRate: state.demo.sensingRate
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...demoActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SideBar)))
