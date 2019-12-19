import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BaseDialog from './BaseDialog';
import MathNotation from "../../components/MathNotation";

const styles = theme => ({
    container: {
        maxWidth: 800,
        height: 1000,
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

class PseudoDescription extends Component {

    state = {
        activeStep: 0
    };

    handleClose = () => {
        this.props.onClose(this.props.identifier)
    };

    render() {
        const {identifier, classes, img, description} = this.props;
        const {activeStep} = this.state;
        return (
            <BaseDialog {...this.props}>
                <div className={classes.container}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        Hole detection phase pseudo code
                    </Typography>
                    <Typography style={{textAlign: 'left'}} variant="body2" gutterBottom>
                        Let's check the pseudo code :) <br/>
                        <b>1.- Choose a random node <MathNotation inline={true} text={"Y"}/> and set it as reference
                            node </b><br/>
                        <b>2.- Get one and two hop neighbors of <MathNotation inline={true} text={"Y"}/> and assign them
                            to a set <MathNotation inline={true} text={"M"}/> </b><br/>
                        <b>3.- Select nodes from <MathNotation inline={true} text={"M"}/> whose y coordinate is greater
                            or equal than the y-coordinate of <MathNotation inline={true} text={"Y"}/> and
                            assign them to a new set <MathNotation inline={true} text={"M_u"}/> </b><br/>
                        <b>4.- Sort nodes from <MathNotation inline={true} text={"M_u"}/> by x-coordinate in ascending
                            order and
                            assign the result to a new set <MathNotation inline={true} text={"M_uX"}/> </b><br/>
                        <b>5.- Select nodes from <MathNotation inline={true} text={"M"}/> whose y coordinate is lower
                            than the y-coordinate of <MathNotation inline={true} text={"Y"}/> and
                            assign them to a new set <MathNotation inline={true} text={"M_d"}/> </b><br/>
                        <b>6.- Sort nodes from <MathNotation inline={true} text={"M_d"}/> by x-coordinate in descending
                            order and
                            assign the result to a new set <MathNotation inline={true} text={"M_dX"}/> </b><br/>
                        <b>7.- Choose the first to nodes <MathNotation inline={true} text={"N_i"}/> and <MathNotation
                            inline={true} text={"N_j"}/> from <MathNotation inline={true} text={"M_uX"}/> to begin the
                            process</b><br/>
                        <b>do &#123;</b> <br/>
                        <b>8.- Choose the first to nodes <MathNotation inline={true} text={"N_i"}/> and <MathNotation
                            inline={true} text={"N_j"}/> from <MathNotation inline={true} text={"M_uX"}/> to begin the
                            process</b><br/>
                        <b>9.- Verify if triangle <MathNotation inline={true} text={"T"}/> formed by <MathNotation
                            inline={true} text={"Y"}/><MathNotation inline={true} text={"N_i"}/><MathNotation
                            inline={true} text={"N_j"}/> is obtuse or acute</b><br/>
                        <b>10.- If (<MathNotation inline={true} text={"T"}/> is acute</b>)&#123; <br/>
                        &nbsp; <b> Get circum radius <MathNotation inline={true} text={"R"}/> of <MathNotation
                        inline={true} text={"T"}/> and verify the following: </b>
                        <br/>
                        &nbsp; If (<MathNotation inline={true} text={"R \\leq\t R_s"}/>)&#123; <br/>
                        &nbsp;&nbsp; <b>There is no coverage hole around <MathNotation inline={true} text={"Y"}/></b>
                        <br/>
                        &nbsp; &#125; <br/>
                        &nbsp; else &#123; <br/>
                        &nbsp;&nbsp; <b>There is a coverage hole around <MathNotation inline={true} text={"Y"}/></b>
                        <br/>
                        &nbsp; &#125; <br/>
                        &#125; <br/>
                        &#125; <br/>
                        {/*-----*/}
                        <b>11.- If (<MathNotation inline={true} text={"T"}/> is obtuse</b>)&#123; <br/>
                        &nbsp; <b> Get circum radius <MathNotation inline={true} text={"R"}/> of <MathNotation
                        inline={true} text={"T"}/> and verify the following: </b>
                        <br/>
                        &nbsp; If (<MathNotation inline={true} text={"R \\leq\t R_s"}/>)&#123; <br/>
                        &nbsp;&nbsp; <b>There is no coverage hole around <MathNotation inline={true} text={"Y"}/></b>
                        <br/>
                        &nbsp; &#125; <br/>
                        &nbsp; else &#123; <br/>
                        &nbsp;&nbsp;<b>12. Get circum center <MathNotation inline={true} text={"Z"}/> and verify the
                        following:</b> <br/>
                        &nbsp;&nbsp; If (<MathNotation inline={true} text={"Z"}/> is covered by any other sensor) &#123;
                        <br/>
                        &nbsp;&nbsp;&nbsp; <b>No coverage hole exists around <MathNotation inline={true}
                                                                                           text={"Y"}/></b> <br/>
                        &nbsp;&nbsp; &#125; <br/>
                        &nbsp;&nbsp; else &#123; <br/>
                        &nbsp;&nbsp;&nbsp; <b>A coverage hole exists around <MathNotation inline={true} text={"Y"}/></b>
                        <br/>
                        &nbsp; &nbsp; &#125; <br/>
                        &nbsp; &#125; <br/>
                        &#125; <br/>
                        &#125; <br/>
                        <b>13.- Update <MathNotation inline={true} text={"M_uX = M_uX - {A_i}"}/> </b>
                        &#125; <br/>
                        <b>while(<MathNotation inline={true} text={"M_uX.length != 1"}/>)</b>
                        <b>14.- Choose last node from <MathNotation inline={true} text={"M_uX"}/> and first node
                            from <MathNotation inline={true} text={"M_dX"}/> </b>
                        <br/>
                        <b>15.- Repeat steps 8 to 13 with nodes from set <MathNotation inline={true} text={"M_dX"}/>
                        </b> <br/>
                        <b>16.- Update <MathNotation inline={true} text={"M_dX = M_dX - {A_i}"}/> </b> <br/>
                        <b>17.- Continue until <MathNotation inline={true} text={"M_dX = \\emptyset"}/> </b> <br/>
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

export default withRouter(withStyles(styles)(PseudoDescription));
