import React from "react"
import { Provider } from "react-redux"
import { createHashHistory } from "history";
import { Router, Route, HashRouter, Switch } from "react-router-dom"
import { syncHistoryWithStore } from "react-router-redux"
import store from "./store.js"
import Layout from "./routers/Layout.jsx"
import Home from "./routers/Home.jsx"
import Viewer from "./routers/Viewer.jsx"

const history = syncHistoryWithStore(createHashHistory(), store);

const App = () => {
    return (
        <Provider store={store}>
            <HashRouter history={history}>
                <Layout>
                    <Switch>
                        <Route path="/viewer/:index" component={Viewer} />
                        <Route path="/viewer" component={Viewer} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Layout>
            </HashRouter>
        </Provider>
    )
};

export default App;