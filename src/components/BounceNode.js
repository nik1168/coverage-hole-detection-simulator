import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';

const styles = theme => ({
    circle: {
        borderRadius: '50%',
        backgroundColor: 'deepskyblue',
        width: '150px',
        height: '150px',
        position: 'absolute',
        opacity: 0,
        animation: 'scaleIn 4s infinite cubic-bezier(.36, .11, .89, .32)'
    },
    item: {
        zIndex: 100,
        padding: 5
    },
    spaceTop: {
        marginTop: 20
    }
});

class BounceNode extends Component {

    render() {
        const {classes} = this.props;

        return (
            <div id="outerContainer">
                <div id="container">
                    <div className="item">
                        <img src="https://png.pngtree.com/svg/20170906/sensor_609853.png"
                             style={{
                                 backgroundColor: 'rgba(255,255,255,0.6)',
                                 borderRadius: '110px'
                             }}/>
                    </div>
                    <div className="circle" style={{animationDelay: '-2s'}}/>
                    <div className="circle" style={{animationDelay: '-1s'}}/>
                    <div className="circle" style={{animationDelay: '0s'}}/>

                </div>
            </div>
        )
    }
}

export default withStyles(styles)(BounceNode);
