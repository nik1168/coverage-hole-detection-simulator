import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BaseDialog from './BaseDialog';
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

class DetailsCoverageHoles extends Component {

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
                        Details coverage Holes
                    </Typography>
                    <Typography variant="body2" style={{textAlign: 'left'}} gutterBottom>
                        <b>Coverage Holes around the following nodes :</b>
                    </Typography>
                    <Typography variant="body2" style={{textAlign: 'left'}} gutterBottom>
                        {
                            holes.map((hole, key) => (
                                <span key={key}>
                                    - Node {hole.triangle.pointA.id},&nbsp;
                                    Node {hole.triangle.pointB.id},&nbsp;
                                    Node {hole.triangle.pointC.id}&nbsp; <br/>
                                </span>
                            ))
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(DetailsCoverageHoles)))

