import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import SimulatorContainer from './simulator/SimulatorContainer';
import SideBar from './simulator/SideBar';
import Topbar from './Topbar';
import SectionHeader from './typo/SectionHeader';

const backgroundShape = require('../images/shape.svg');


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey['A500'],
        overflow: 'hidden',
        background: `url(${backgroundShape}) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: '0 400px',
        marginTop: 20,
        padding: 20,
        paddingBottom: 200
    },
    grid: {},
    gridSide: {
        marginLeft: 10,
        marginBottom: theme.spacing(4),
        width: 500
    }
})

class Demo extends Component {

    render() {
        const {classes} = this.props;
        const currentPath = this.props.location.pathname

        return (
            <React.Fragment>
                <CssBaseline/>
                <Topbar currentPath={currentPath}/>
                <div className={classes.root}>
                    <Grid container direction="row" justify="center" spacing={2}>
                        <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
                            <Grid item xs={12} id={'gridNetworks'}>
                                <SectionHeader title="Simulator" subtitle="Coverage holes detection"/>
                                <SideBar/>
                            </Grid>
                            <Grid item xs={12} id={'gridNetworks'}>
                                {/*<SectionHeader/>*/}
                                <SimulatorContainer/>
                            </Grid>
                            {/*<Grid item xs={6} >*/}
                            {/*  <SectionHeader title="Simulator" subtitle="Coverage holes detection" style={{marginLeft: 10}} />*/}
                            {/*  <SideBar/>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Demo);