import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import Loader from "../components/Loader.jsx";

const Layout = ({ children }) => {

    return (
        <div>
            <NavBar />
            <div class="main container">
                {children}
            </div>
            <Loader />
        </div>
    )
}

export default withRouter(connect(
    (store) => {
        return {}
    },
)(Layout));