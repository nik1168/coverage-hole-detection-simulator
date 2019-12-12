import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HelpIcon from '@material-ui/icons/Help';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
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
        padding: theme.spacing(2.5),
        textAlign: 'left',
        color: theme.palette.text.secondary
    },
    outlinedButtom: {
        textTransform: 'uppercase',
        margin: theme.spacing(1)
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
        marginLeft: theme.spacing(3),
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
        // marginLeft: theme.spacing(4),
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

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: red
    },
});


class TopButtonBar extends Component {
    handleAddNodes = () => {
        this.props.handleAddNodes()
    };
    handleSimulation = () => {
        this.props.handleSimulation()
    };
    handleNeighbors = () => {
        this.props.handleNeighbor()
    };
    handleCoverageHole = () => {
        this.props.handleCoverage()
    };
    handleNodeError = () => {
        this.props.handleNodeError()
    };
    handleHelp = () => {
        this.props.handleHelp()
    };


    componentDidMount() {
        console.log("TOP BUTTON BAR");
        console.log(this.props)
    }

    render() {
        console.log("RENDER TOP BUTTON BAR COMPONENT");
        const {classes, neighborDiscoveryPhase, addingNodes, nodes, addingNeighbors, addingFailureNode} = this.props;
        const areThereReferenceNodes = nodes.filter((val) => val.isReference).length > 0;
        console.log("NEIGHBOR DISCOVERY PHASE");
        console.log(neighborDiscoveryPhase);

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <div className={classes.itemContainer}>
                        <div className={classes.baseline}>
                            <div className={classes.inline}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    disabled={neighborDiscoveryPhase || addingNeighbors || addingFailureNode}
                                    onClick={this.handleAddNodes}
                                    className={classes.outlinedButtom}
                                    startIcon={!addingNodes ? <AddIcon/> : <StopIcon/>}
                                >
                                    Create Nodes
                                </Button>
                            </div>
                            <div className={classes.inline}>
                                <MuiThemeProvider theme={theme}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={addingNodes || neighborDiscoveryPhase || addingNeighbors || !areThereReferenceNodes}
                                        onClick={this.handleSimulation}
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
                                    onClick={this.handleCoverageHole}
                                    disabled={addingNodes || nodes.length === 0 || addingNeighbors}
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
                                    onClick={this.handleNeighbors}
                                    disabled={addingNodes || nodes.length === 0 || addingFailureNode}
                                    className={classes.outlinedButtom}
                                    startIcon={!addingNeighbors ? <PersonAddIcon/> : <StopIcon/>}
                                >
                                    Neighbor Discovery
                                </Button>
                            </div>
                            <div className={classes.inline}>
                                <MuiThemeProvider theme={theme}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={this.handleNodeError}
                                        disabled={addingNodes || addingNeighbors || neighborDiscoveryPhase || nodes.length === 0}
                                        className={classes.outlinedButtom}
                                        startIcon={!addingFailureNode ? <SignalWifiOffIcon/> : <StopIcon/>}

                                    >
                                        Node error
                                    </Button>
                                </MuiThemeProvider>
                            </div>
                            <div className={classes.inline}>
                                <Button
                                    variant="contained"
                                    size="medium"
                                    color="default"
                                    onClick={this.handleHelp}
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
        sensingRate: state.demo.sensingRate,
        addingNodes: state.demo.addingNodes,
        addingNeighbors: state.demo.addingNeighbors,
        addingFailureNode: state.demo.addingFailureNode,
        neighborDiscoveryPhase: state.demo.neighborDiscoveryPhase
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...demoActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(TopButtonBar)))
