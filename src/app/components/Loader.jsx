import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import ReactLoader from 'react-loader-advanced';
import Spinner from './Spinner.jsx';

const Loader = ({isBusy = false}) => {
    
    const backgroundStyle = {
        zIndex: 100000,
    };

    return (
        <ReactLoader show={isBusy} message={<Spinner />} backgroundStyle={backgroundStyle} />
    );
};

export default withRouter(connect(
    (store) => {
        return {
            isBusy: store.busy.isBusy,
        };
    },
)(Loader));