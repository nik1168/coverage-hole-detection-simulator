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
    getCoords = (x, y) => {
        if (this.props.addingNodes) {
            this.props.addNodeCreator(new Node(x, y, this.props.nodes.length))
        }
    };


    componentDidMount() {
    }

    render() {
        const {classes} = this.props;
        let instruction = '';
        if (this.props.addingNodes){
            instruction = "Click on screen to start adding nodes :)"
        }
        else{
            instruction = ""
        }

        return (
            <div className={classes.root}>
                <Paper className={classes.paper} id={'paper'}>

                    <Typography color='secondary' variant="h6" gutterBottom>
                        {instruction}
                    </Typography>
                    <div style={{width : 300}}>
                        {/*<Slider*/}
                        {/*    defaultValue={30}*/}
                        {/*    getAriaValueText={valuetext}*/}
                        {/*    aria-labelledby="discrete-slider"*/}
                        {/*    valueLabelDisplay="auto"*/}
                        {/*    step={10}*/}
                        {/*    marks*/}
                        {/*    min={10}*/}
                        {/*    max={110}*/}
                        {/*/>*/}
                    </div>

                    <P5Wrapper sketch={sketch} getCoords={this.getCoords} nodes={this.props.nodes}
                               addingNodes={this.props.addingNodes} circumCenter={this.props.circumCenter}/>
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
        circumCenter: state.demo.circumCenter
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...demoActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SimulatorContainer)))
