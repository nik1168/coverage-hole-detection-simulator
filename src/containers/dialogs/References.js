import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BaseDialog from './BaseDialog';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import { autoPlay } from 'react-swipeable-views-utils';
import MathNotation from "../../components/MathNotation";

const styles = theme => ({
  container: {
    maxWidth: 800,
    height: 200,
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

class References extends Component {

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
            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
              References
            </Typography>
            <Typography style={{textAlign: 'left'}} variant="body2" gutterBottom>
              [1] Ma, Hwa-Chun & Sahoo, Prasan & Chen, Yen-Wen. (2011). Computational geometry based distributed coverage hole detection protocol for the wireless sensor networks. J. Network and Computer Applications. 34. 1743-1756. 10.1016/j.jnca.2011.06.007.

            </Typography>
          <Typography style={{textAlign: 'left'}} variant="body2" gutterBottom>
            [2] Meysam Argany, Mir Abolfazl Mostafavi, and Farid Karimipour. Voronoi-based approaches for geosensor networks coverage determination and optimisation: A survey. pages 115–123, 06 2010..

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

export default withRouter(withStyles(styles)(References));
