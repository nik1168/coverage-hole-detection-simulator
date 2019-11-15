import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BaseDialog from './BaseDialog';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import {autoPlay} from 'react-swipeable-views-utils';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
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
        this.props.onOk()
    };

    state = {
        checked: this.props.nodes ? this.props.nodes.filter((val) => val.isReference).map((val, index) => index) : []
    };

    handleToggle = index => () => {
        this.props.setReferenceCreator(index);
        this.forceUpdate(); // Calling force update since the component was not being re rendered when calling set Reference

    };


    render() {
        const {classes} = this.props;
        const nodes = this.props.nodes ? this.props.nodes : []
        console.log("RENDER!!! DIALOG");


        return (
            <BaseDialog {...this.props}>
                <div className={classes.container}>
                    <div>
                        <Typography variant="h5" gutterBottom>
                            Choose a reference node
                        </Typography>
                        <List dense className={classes.root}>
                            {nodes.map((value, index) => {
                                const labelId = `checkbox-list-secondary-label-${value}`;
                                return (
                                    <ListItem key={index} button>
                                        <ListItemIcon>
                                            <SettingsInputAntennaIcon/>
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={`Node ${index + 1}`}/>
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                edge="end"
                                                onChange={this.handleToggle(index)}
                                                checked={value.isReference}
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
