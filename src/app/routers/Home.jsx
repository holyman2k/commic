import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import clone from "clone";
import copy from 'copy-to-clipboard';
import { templateChanged, listTextChanged } from "../actions/imagesActions";
import { decompressSettings, fetchSettings } from "../actions/homeActions";

const Home = ({ settings, index, onChange, onNext, onCreatePermLink, onCreateSettingsJson }) => {
    return (
        <div>
            <h1>Comic</h1>

            <form>
                <div class="form-group">
                    <label for="placeholder-length">Placeholder Length</label>
                    <input type="number" class="form-control" id="placeholder-length" value={settings.length}
                        onChange={e => onChange(e, 'length', settings)} />
                </div>
                <div class="form-group">
                    <label for="total-images">Total Images</label>
                    <input type="number" class="form-control" id="total-images" value={settings.total}
                        onChange={e => onChange(e, 'total', settings)} />
                </div>
                <div class="form-group">
                    <label for="list-template">Template, use (*) for placeholer</label>
                    <input type="text" class="form-control" id="list-template" placeholder="http://www.images/image-(*).jpg"
                        value={settings.template} onChange={e => onChange(e, 'template', settings)} />
                </div>
                <div class="form-group">
                    <label for="example">list</label>
                    <textarea type="text" class="form-control" id="example" rows="8"
                        value={settings.list.join("\n")} onChange={e => onChange(e, 'list', settings)} />
                </div>
                <div class="pull-right">
                    <button type="button" class="btn btn-default" onClick={e => onCreateSettingsJson(e, settings)}>
                        <span class="glyphicon glyphicon-floppy-disk"></span>
                    </button>
                    <button type="button" class="btn btn-default" onClick={e => onCreatePermLink(e, settings)}>
                        <span class="glyphicon glyphicon-link"></span>
                    </button>
                    <button type="button" class="btn btn-primary" style={{ marginLeft: 5 }} onClick={e => onNext(e, index)}>Next</button>
                </div>
            </form>
        </div>
    )
}

export default withRouter(connect(
    (store, props) => {
        return {
            settings: store.images.settings,
            index: store.images.index,
        }
    },
    (dispatch, props) => {
        const query = props.match.params.query;
        const params = props.location.search.replace("?", "").split("=");
        if (params[0] == "url") {
            setTimeout(() => dispatch(fetchSettings(params[1])), 0);
        } else if (query != null && query.length > 0) {
            setTimeout(() => dispatch(decompressSettings(query)), 0);
        }

        return {
            onChange: (e, field, settings) => {
                const newSettings = clone(settings);
                newSettings[field] = e.target.value;
                if (field == "list") {
                    dispatch(listTextChanged(e.target.value));
                } else {
                    dispatch(templateChanged(newSettings));
                }
            },
            onNext: (e, index) => {
                e.preventDefault();
                e.stopPropagation();
                props.history.push(`/viewer/${index || 0}`);
            },
            onCreatePermLink: (e, settings) => {
                e.preventDefault();
                e.stopPropagation();
                const json = clone(settings);
                const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(json));
                copy(`${window.location}${compressed}`);
            },
            onCreateSettingsJson: (e, settings) => {
                e.preventDefault();
                e.stopPropagation();
                const json = JSON.stringify(settings)
                copy(json);
            }
        }
    }
)(Home));
