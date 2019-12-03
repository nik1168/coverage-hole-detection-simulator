import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BaseDialog from './../BaseDialog';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import { autoPlay } from 'react-swipeable-views-utils';

const logo = require('../../../images/logo.svg');

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
  buttonOk:{
    marginTop: theme.spacing(2),
    textAlign: 'right'
  }
});

class Lemma1 extends Component {

  state = {
    activeStep: 0
  };

  handleClose = () => {
    this.props.onClose(this.props.identifier)
  };

  render() {
    const { identifier,classes, img, description } = this.props;
    const { activeStep } = this.state;
    return (
      <BaseDialog {...this.props}>
        <div className={classes.container}>
          <div className={classes.gutterBottom}>
            <img width={100} src={img} alt="" />
          </div>
          <div className={classes.stepsContainer}>
            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
              Proof :)
            </Typography>
            <Typography variant="body2" gutterBottom>
              {description}
            </Typography>
          </div>

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

export default withRouter(withStyles(styles)(Lemma1));
