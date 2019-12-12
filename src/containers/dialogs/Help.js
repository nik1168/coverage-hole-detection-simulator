import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BaseDialog from './BaseDialog';
import Grid from "@material-ui/core/Grid";
import {bindActionCreators} from "redux";
import * as demoActions from "../../actions/demo";
import {connect} from "react-redux";

const styles = theme => ({
    container: {
        maxWidth: 600,
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
    },
    buttonOk: {
        marginTop: theme.spacing(2),
        textAlign: 'right'
    }
});

class Help extends Component {

    state = {
        activeStep: 0
    };

    handleClose = () => {
        this.props.onClose(this.props.identifier)
    };

    render() {
        const {holes, classes} = this.props;
        return (
            <BaseDialog {...this.props}>
                <div className={classes.container}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                       Help
                    </Typography>
                    <Typography variant="body2" style={{textAlign: 'left'}} gutterBottom>
                        - To get all coverage holes in network click on "Find coverage holes" in top bar after having created some nodes or used a topology.
                    </Typography>
                    <Typography variant="body2" style={{textAlign: 'left'}} gutterBottom>
                        - To see the coverage holes around a node in specific click on "Neighbor discovery" button and select a node, on the side bar you will see the node information, along with a button called "Get coverage holes around reference node" to see the holes around it.
                    </Typography>
                    <Typography variant="body2" style={{textAlign: 'left'}} gutterBottom>
                        - To simulate a node failure, click on "Node error button" and select a node.
                    </Typography>

                </div>
                <div className={classes.buttonOk}>
                    <Button variant='contained' onClick={this.handleClose} color="primary" autoFocus>
                        Ok
                    </Button>
                </div>
            </BaseDialog>
        )
    }
}

function mapStateToProps(state) {
    return {
        holes: state.demo.coverageHoles,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...demoActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Help)))

