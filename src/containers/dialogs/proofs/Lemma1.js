import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BaseDialog from './../BaseDialog';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import {autoPlay} from 'react-swipeable-views-utils';
import TriangleSketch from "../../../sketches/Triangle";
import P5Wrapper from "react-p5-wrapper";
import {Node, Triangle} from "../../../utils/geometryUtils";

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
    buttonOk: {
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
        const {identifier, classes, img, description, des} = this.props;
        const {activeStep} = this.state;
        const sensingRate = 55;
        const padding = 75;
        const py = 25;
        let nodesLemma1 = [
            new Node(170 - padding, 200 - padding + py, 'RN', sensingRate, true, false),
            new Node(170 - padding, 110 - padding + py, 'X', sensingRate),
            new Node(230 - padding, 200 - padding + py, 'Y', sensingRate),
        ];
        const triangleLemma1 = new Triangle(nodesLemma1[0], nodesLemma1[1], nodesLemma1[2]);
        let nodesLemma2 = [
            new Node(175 - padding, 200 - padding + py, 'RN', sensingRate, true, false),
            new Node(175 - padding, 110 - padding + py, 'X', sensingRate),
            new Node(205 - padding, 150 - padding + py, 'Y', sensingRate),
        ];
        const triangleLemma2 = new Triangle(nodesLemma2[0], nodesLemma2[1], nodesLemma2[2]);
        let nodesLemma3 = [
            new Node(190 - padding, 200 - padding + py, 'RN', sensingRate, true, false),
            new Node(190 - padding, 110 - padding + py, 'X', sensingRate),
            new Node(205 - padding, 150 - padding + py, 'Y', sensingRate),
        ];
        const triangleLemma3 = new Triangle(nodesLemma3[0], nodesLemma3[1], nodesLemma3[2]);
        let nodesLemma4 = [
            new Node(255 - padding, 200 - padding + py, 'RN', sensingRate, true, false),
            new Node(135 - padding, 200 - padding + py, 'X', sensingRate),
            new Node(205 - padding, 130 - padding + py, 'Y', sensingRate),
        ];
        const triangleLemma4 = new Triangle(nodesLemma4[0], nodesLemma4[1], nodesLemma4[2]);
        console.log("triangle 4 is acute?");
        console.log(triangleLemma4.isAcute())
        return (
            <BaseDialog {...this.props}>
                <div className={classes.container}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        {identifier}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {des}
                    </Typography>
                    <div className={classes.gutterBottom}>
                        {
                            identifier === "Lemma 1" && (
                                <P5Wrapper sketch={TriangleSketch}
                                           modal={true}
                                           drawCircle={false}
                                           drawRadiusLine={true}
                                           drawTriangle={true}
                                           computeCircumData={true}
                                           clickOnNodes={false}
                                           triangle={triangleLemma1}/>
                            )
                        }
                        {
                            identifier === "Lemma 2" && (
                                <P5Wrapper sketch={TriangleSketch}
                                           modal={true}
                                           drawCircle={false}
                                           drawRadiusLine={false}
                                           drawTriangle={true}
                                           computeCircumData={true}
                                           clickOnNodes={false}
                                           triangle={triangleLemma2}/>
                            )
                        }
                        {
                            identifier === "Lemma 3" && (
                                <P5Wrapper sketch={TriangleSketch}
                                           modal={true}
                                           drawCircle={false}
                                           drawRadiusLine={false}
                                           drawTriangle={true}
                                           computeCircumData={true}
                                           clickOnNodes={false}
                                           triangle={triangleLemma3}/>
                            )
                        }
                        {
                            identifier === "Lemma 4" && (
                                <P5Wrapper sketch={TriangleSketch}
                                           modal={true}
                                           drawCircle={false}
                                           drawRadiusLine={true}
                                           drawTriangle={true}
                                           computeCircumData={true}
                                           clickOnNodes={false}
                                           triangle={triangleLemma4}/>
                            )
                        }
                    </div>
                  <Typography style={{textAlign:'left'}} variant="h6" color='secondary' gutterBottom>
                    Proof
                  </Typography>
                    <Typography variant="body2" style={{textAlign:'left'}} gutterBottom>
                      <div className="content" dangerouslySetInnerHTML={{__html: description}}/>
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

export default withRouter(withStyles(styles)(Lemma1));
