import React from 'react'
import {Route, HashRouter, Switch} from 'react-router-dom'
import Main from './containers/Main'
import {Provider} from 'react-redux'
import ScrollToTop from './components/ScrollTop'

export default ({store}) => (
    <Provider store={store}>
        <HashRouter>
            <ScrollToTop>
                <Switch>
                    <Route exact path='/' component={Main}/>
                </Switch>
            </ScrollToTop>
        </HashRouter>
    </Provider>
)