import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as theoremsActions from './actions/theoretical';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Editss <code>src/App.js</code> and save to reloads.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React p
        </a>
      </header>
    </div>
  );
}
function mapStateToProps(state){
  return {
    theorems: state.theorems.theorems
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators({...theoremsActions}, dispatch)
}

// export default App;

export default connect(mapStateToProps,mapDispatchToProps)(App)
