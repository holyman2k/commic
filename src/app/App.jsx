import React from "react"
import { Provider } from "react-redux"
import { createHashHistory } from "history";
import { Router, Route, HashRouter, Switch } from "react-router-dom"
import store from "./store.js"
import Layout from "./routers/Layout.jsx"
import Home from "./routers/Home.jsx"
import Viewer from "./routers/Viewer.jsx"

const history = createHashHistory();

const App = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <Layout>
                    <Switch>
                        <Route path="/viewer/:index" component={Viewer} />
                        <Route path="/viewer" component={Viewer} />
                        <Route path="/:query" component={Home} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Layout>
            </HashRouter>
        </Provider>
    )
};

export default App;