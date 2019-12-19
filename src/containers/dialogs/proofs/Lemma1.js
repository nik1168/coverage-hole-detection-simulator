import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BaseDialog from './../BaseDialog';
import TriangleSketch from "../../../sketches/Triangle";
import P5Wrapper from "react-p5-wrapper";
import {Node, Triangle} from "../../../utils/geometryUtils";
import Grid from "@material-ui/core/Grid";


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
        let nodesLemma5 = [
            new Node(160 - padding, 110 - padding + py, 'RN', sensingRate, true, false),
            new Node(210 - padding, 170 - padding + py, 'X', sensingRate),
            new Node(150 - padding, 220 - padding + py, 'Y', sensingRate),
        ];
        const triangleLemma5 = new Triangle(nodesLemma5[0], nodesLemma5[1], nodesLemma5[2]);
        let nodesLemma5_a = [
            new Node(150 - padding, 170 - padding + py, 'RN', sensingRate, true, false),
            new Node(250 - padding, 170 - padding + py, 'X', sensingRate),
            new Node(220 - padding, 190 - padding + py, 'Y', sensingRate),
        ];
        const triangleLemma5_a = new Triangle(nodesLemma5_a[0], nodesLemma5_a[1], nodesLemma5_a[2]);
        let nodesLemma6 = [
            new Node(200 - padding, 100 - padding + py, 'RN', sensingRate, true, false),
            new Node(135 - padding, 150 - padding + py, 'X', sensingRate),
            new Node(290 - padding, 150 - padding + py, 'Y', sensingRate),
        ];
        const triangleLemma6 = new Triangle(nodesLemma6[0], nodesLemma6[1], nodesLemma6[2]);
        let nodesLemma7 = [
            new Node(200 - padding, 200 - padding + py, 'RN', sensingRate, true, false),
            new Node(165 - padding, 200 - padding + py, 'X', sensingRate),
            new Node(185 - padding, 130 - padding + py, 'Y', sensingRate),
        ];
        const triangleLemma7 = new Triangle(nodesLemma7[0], nodesLemma7[1], nodesLemma7[2]);

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
                        {
                            identifier === "Lemma 5" && (
                                <div>
                                    <Grid container justify="center">
                                        <Grid spacing={4} alignItems="center" justify="center" container>
                                            <Grid container item xs={12}>
                                                <Grid item xs={6}>
                                                    <P5Wrapper sketch={TriangleSketch}
                                                               modal={true}
                                                               drawCircle={false}
                                                               drawRadiusLine={true}
                                                               idLine={1}
                                                               drawTriangle={true}
                                                               computeCircumData={true}
                                                               clickOnNodes={false}
                                                               triangle={triangleLemma5}/>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <P5Wrapper sketch={TriangleSketch}
                                                               modal={true}
                                                               drawCircle={false}
                                                               drawRadiusLine={true}
                                                               idLine={0}
                                                               drawTriangle={true}
                                                               computeCircumData={true}
                                                               clickOnNodes={false}
                                                               triangle={triangleLemma5_a}/>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </div>

                            )
                        }
                        {
                            identifier === "Lemma 6" && (
                                <P5Wrapper sketch={TriangleSketch}
                                           modal={true}
                                           drawCircle={false}
                                           drawRadiusLine={true}
                                           drawTriangle={true}
                                           computeCircumData={true}
                                           clickOnNodes={false}
                                           triangle={triangleLemma6}/>
                            )
                        }
                        {
                            identifier === "Lemma 7" && (
                                <P5Wrapper sketch={TriangleSketch}
                                           modal={true}
                                           drawCircle={false}
                                           drawRadiusLine={true}
                                           drawTriangle={true}
                                           computeCircumData={true}
                                           clickOnNodes={false}
                                           triangle={triangleLemma7}/>
                            )
                        }
                    </div>
                    <Typography style={{textAlign: 'left'}} variant="h6" color='secondary' gutterBottom>
                        Proof
                    </Typography>
                    <Typography variant="body2" style={{textAlign: 'left'}} gutterBottom>
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
