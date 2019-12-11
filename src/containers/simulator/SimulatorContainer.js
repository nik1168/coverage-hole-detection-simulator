import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import P5Wrapper from 'react-p5-wrapper';
import sketch from '../../sketches/sketch';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as demoActions from "../../actions/demo";
import {
    Node
} from "../../utils/geometryUtils";
import Typography from "@material-ui/core/Typography";
import Slider from '@material-ui/core/Slider';
import Grid from "@material-ui/core/Grid";
import TriangleSketch from "../../sketches/Triangle";

const marks = [
    {
        value: 10,
        label: '0°C',
    },
    {
        value: 20,
        label: '20°C',
    },
    {
        value: 30,
        label: '37°C',
    },
    {
        value: 40,
        label: '100°C',
    },
];

const styles = theme => ({
    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
        color: theme.palette.text.secondary
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
        marginLeft: theme.spacing(4),
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
        marginLeft: theme.spacing(4),
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

function valuetext(value) {
    return `${value}°C`;
}

class SimulatorContainer extends Component {
    onChangeSlider = (e, val) => {
        console.log("On change slider");
        console.log(val);
        this.props.addSensingRateCreator(val)
    };
    getCoords = (x, y) => {
        if (this.props.addingNodes) {
            this.props.addNodeCreator(new Node(x, y, this.props.nodes.length))
        }
    };


    componentDidMount() {
    }

    render() {
        const {classes, referenceNodes, nodes} = this.props;

        let instruction = '';
        if (this.props.addingNodes) {
            instruction = "Click on screen to start adding nodes :)"
        } else {
            instruction = ""
        }

        return (
            <div className={classes.root}>
                <Paper className={classes.paper} id={'paper'}>

                    <Typography color='secondary' variant="h6" gutterBottom>
                        {instruction}
                    </Typography>

                    <Grid container justify="center">
                        <Grid spacing={7} alignItems="center" justify="center" container>
                            <Grid container item xs={12}>
                                <Grid item xs={9} id={'gridWidth'}>
                                    <P5Wrapper sketch={sketch}
                                               getCoords={this.getCoords}
                                               nodes={this.props.nodes}
                                               sensingRate={this.props.sensingRate}
                                               addingNodes={this.props.addingNodes}
                                               circumCenter={this.props.circumCenter}/>
                                </Grid>
                                <Grid style={{paddingLeft: 10}} item xs={3}>
                                    <div style={{width: 300}}>
                                        <Typography color='secondary' variant="h6" gutterBottom>
                                            Sensing rate
                                        </Typography>
                                        <Slider
                                            defaultValue={this.props.sensingRate}
                                            getAriaValueText={valuetext}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            onChangeCommitted={this.onChangeSlider}
                                            step={10}
                                            marks
                                            min={10}
                                            max={110}
                                        />
                                        <Typography color='secondary' variant="h6" gutterBottom>
                                            Reference Node:
                                        </Typography>
                                        {
                                            referenceNodes === -1 && (
                                                <Typography variant="body1" gutterBottom>
                                                    Not Selected
                                                </Typography>
                                            )
                                        }
                                        {
                                            referenceNodes >= 0 && (
                                                <div>
                                                    <Typography variant="body1" gutterBottom>
                                                        Node {referenceNodes}
                                                    </Typography>
                                                </div>

                                            )
                                        }
                                    </div>

                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>


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
        circumCenter: state.demo.circumCenter,
        referenceNodes: state.demo.referenceNodes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...demoActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SimulatorContainer)))
