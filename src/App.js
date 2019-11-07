import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect, Provider} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as theoremsActions from './actions/theoretical';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import { blue, indigo } from '@material-ui/core/colors'
import Routes from './routes'
import {Route} from "react-router-dom";
import configureStore from "./store/configureStore";
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});
const store = configureStore();
class App extends Component {
  render() {
    return (
        <div>
          <ThemeProvider theme={theme}>
            <Routes store={store} />
          </ThemeProvider>
        </div>
    );
  }
}

// class App extends Component {
//   render() {
//     return (
//         <div>
//           <ThemeProvider theme={theme}>
//             <Routes />
//           </ThemeProvider>
//         </div>
//     );
//   }
// }

// const App = ({ store }) => (
//     <Provider store={store}>
//       <ThemeProvider theme={theme}>
//         <Routes />
//       </ThemeProvider>
//     </Provider>
// );

function mapStateToProps(state){
  return {
    theorems: state.theorems.theorems
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators({...theoremsActions}, dispatch)
}

export default App;

// export default connect(mapStateToProps,mapDispatchToProps)(App)
