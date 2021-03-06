import React from 'react'
import {Route, HashRouter, Switch} from 'react-router-dom'
import Main from './containers/Main'
import {Provider} from 'react-redux'
import ScrollToTop from './components/ScrollTop'
import TheoreticalAnalysis from "./containers/TheoreticalAnalysis";
import Demo from "./containers/Demo";
import DefinitionsAndNotations from "./containers/DefinitionsAndNotations";
import AlgorithmDescription from "./containers/AlgorithmDescription";

export default ({store}) => (
    <Provider store={store}>
        <HashRouter>
            <ScrollToTop>
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route exact path='/tanalysis' component={TheoreticalAnalysis}/>
                    <Route exact path='/definitions' component={DefinitionsAndNotations}/>
                    <Route exact path='/algorithm' component={AlgorithmDescription}/>
                    <Route exact path='/demo' component={Demo}/>
                </Switch>
            </ScrollToTop>
        </HashRouter>
    </Provider>
)
