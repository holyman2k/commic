import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loader from "react-loader-advanced";
import NavBar from "../components/NavBar.jsx";
import Spinner from "../components/Spinner.jsx";

const Layout = ({ children }) => {

    return (
        <Loader show={false} message={<Spinner />}>
            <NavBar />
            <div class="container">
                {children}
            </div>
        </Loader>
    )
}

export default withRouter(connect(
    (store) => {
        return {}
    },
)(Layout));