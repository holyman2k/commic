import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import clone from "clone";
import { busy } from "../actions/busyActions"

const fetchedUrls = [];

class Viewer extends React.Component {

    prefetch() {
        const { index, startPrefetch, settings: { list } } = this.props;
        const prefetchCount = 5;
        const fetchList = list.slice(index, index + prefetchCount);
        startPrefetch(fetchList);
    }

    componentWillMount() {
        const { index, history, settings, dispatch } = this.props;
        dispatch(busy(true));
        this.prefetch();

        $(window).on('keydown', (event) => {
            if (event.keyCode == 37 && index > 0) {  // left
                history.push(`/viewer/${index - 1}`);
            } else if (event.keyCode == 39 && index <= settings.list.length) {   // right
                history.push(`/viewer/${index + 1}`);
            } else if (event.keyCode == 38) { // up
                event.preventDefault();
                event.stopPropagation();
                $('html, body').stop().animate({ scrollTop: $(document).scrollTop() - 400 }, 300, 'swing');
            } else if (event.keyCode == 40) { // down
                event.preventDefault();
                event.stopPropagation();
                $('html, body').stop().animate({ scrollTop: $(document).scrollTop() + 400 }, 300, 'swing');
            }
        });
    }

    componentWillUnmount() {
        $(window).off('keydown');
    }

    componentWillReceiveProps(newProps) {
        if (newProps.index !== this.props.index) {
            const { dispatch } = this.props;
            this.prefetch();
            $('html, body').stop().animate({ scrollTop: 52 }, 300, 'swing');
            dispatch(busy(true));
        }
    }

    onLoaded() {
        this.props.dispatch(busy(false));
    }

    render() {
        const { settings, index, expanded } = this.props;
        const list = settings.list || [];
        const url = list[index] || "";
        const imgClasses = ["img-responsive", "center-block", "image"];
        if (expanded) {
            imgClasses.push("width-full");
        }
        return (
            <div>
                <Link to={`/viewer/${Math.min(index + 1, list.length)}`}>
                    <img class={imgClasses.join(" ")} src={url} onLoad={() => this.onLoaded()} onError={() => this.onLoaded()} />
                </Link>
                <nav aria-label="pager">
                    <ul class="pager">
                        <li><Link to={`/viewer/${Math.max(index - 1, 0)}`}>Previous</Link></li>
                        <li><Link to={`/viewer/${Math.min(index + 1, list.length)}`}>Next</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default withRouter(connect(
    (store, props) => {
        const index = props.match.params.index != null ? parseInt(props.match.params.index) : 0;
        return {
            settings: store.images.settings,
            index: index,
            expanded: store.settings.expand,
        }
    },
    (dispatch, props) => {
        return {
            dispatch,
            startPrefetch: (list) => {
                list.forEach((url) => {
                    const image = new Image();
                    if (fetchedUrls.indexOf(url) === -1) {
                        fetchedUrls.push(url);
                        image.src = url;
                    }
                });
            },
        }
    }
)(Viewer));
