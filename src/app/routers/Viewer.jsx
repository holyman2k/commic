import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import clone from "clone";

const Home = ({ settings, index }) => {
    return (
        <div>
            <img class="img-responsive center-block" src={settings.list[index]} />
            <nav aria-label="pager">
                <ul class="pager">
                    <li><Link to="#">Previous</Link></li>
                    <li><Link to="#">Next</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default withRouter(connect(
    (store, props) => {
        console.log( props.match.params.index );
        const index = props.match.params.index != null ? parseInt(props.match.params.index) : store.images.index;
        return {
            settings:  store.images.settings,
            index: index,
        }
    },
    (dispatch, props) => {
        return {
            onChangeIndex(index) {

            }
        }
    }
)(Home));
