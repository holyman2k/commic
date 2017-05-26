import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {expand, collapse} from "../actions/settingsActions";

const Nav = ({ expanded, onToggleExpand }) => {
    return (
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <Link to="/" class="navbar-brand">Comic</Link>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            {expanded ?
                                <a href="#" onClick={e => onToggleExpand(e, expanded)}><span class="glyphicon glyphicon-resize-small"></span></a>
                                :
                                <a href="#" onClick={e => onToggleExpand(e, expanded)}><span class="glyphicon glyphicon-resize-full"></span></a>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default connect(
    (store) => {
        return {
            expanded: store.settings.expand,
        }
    },
    (dispatch) => {
        return {
            onToggleExpand: (e, expanded) => {
                e.preventDefault();
                e.stopPropagation();
                if (expanded) {
                    dispatch(collapse());
                } else {
                    dispatch(expand());
                }
            },
        }
    }
)(Nav);


