import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BaseDialog from './BaseDialog';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {bindActionCreators} from "redux";
import * as demoActions from "../../actions/demo";
import {connect} from "react-redux";

const logo = require('../../images/logo.svg');

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const styles = theme => ({
    container: {
        maxWidth: 600,
        maxHeight: 300,
        flexGrow: 1,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    stepsContainer: {
        marginLeft: 72,
        textAlign: 'left',
        marginTop: 20,
        height: 65
    },
    bottomMargin: {
        marginBottom: theme.spacing(2)
    }
});

class SwipeDialog extends Component {


    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };

    handleStepChange = activeStep => {
        this.setState({activeStep});
    };

    handleClose = () => {
        this.props.onClose()
    };

    handleCloseOk = () => {
        const topologyChecked = this.state.topologies.filter((topo) => topo.checked)[0];
        this.props.onOk(topologyChecked.name)
    };

    state = {
        checked: this.props.nodes ? this.props.nodes.filter((val) => val.isReference).map((val, index) => index) : [],
        topologies: [{
            name: "Topology 1",
            checked: false
        }, {
            name: "Topology 2",
            checked: false
        }, {
            name: "Topology 3",
            checked: false
        },{
            name: "Topology 4",
            checked: false
        }],
        checkedVal: []
    };
    handleToggles = topo => () => {
        let copy = {
            ...this.state,
        };
        this.state.topologies.forEach((topos, index) => {
            copy.topologies[index].checked = false;
        });
        copy.topologies[topo].checked = true;
        this.setState(copy)
    };

    render() {
        const {classes} = this.props;
        const {topologies} = this.state;

        return (
            <BaseDialog {...this.props}>
                <div className={classes.container}>
                    <div>
                        <Typography variant="h5" gutterBottom>
                            Choose a Topology
                        </Typography>
                        <List dense className={classes.root}>
                            {this.state.topologies.map((topo, index) => {
                                const labelId = `checkbox-list-secondary-label-${index}`;
                                return (
                                    <ListItem key={index} button>
                                        <ListItemIcon>
                                            <SettingsInputAntennaIcon/>
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={`${topo.name}`}/>
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                edge="end"
                                                checked={topo.checked}
                                                onChange={this.handleToggles(index)}
                                                inputProps={{'aria-labelledby': labelId}}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}
                        </List>
                        <Button autoFocus onClick={this.handleClose} color="default">
                            Cancel
                        </Button>
                        <Button onClick={this.handleCloseOk} color="primary">
                            Ok
                        </Button>
                    </div>
                </div>
            </BaseDialog>
        )
    }
}

function mapStateToProps(state) {
    return {
        nodes: state.demo.nodes,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...demoActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SwipeDialog)))
