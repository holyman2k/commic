import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import numeral from "numeral";
import clone from "clone";
import LZString from "lz-string";
import copy from 'copy-to-clipboard';
import { onSettingsChange } from "../actions/imagesActions";

const Home = ({ settings, index, onChange, onNext, onCreatePermLink }) => {
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
                    <button type="submit" class="btn btn-default" onClick={e => onCreatePermLink(e, settings)}>
                        <span class="glyphicon glyphicon-link"></span>
                    </button>
                    <button type="submit" class="btn btn-primary" style={{marginLeft:5}} onClick={e => onNext(e, index)}>Next</button>
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
        const createList = (template, length, padding) => {
            let list = [];
            const format = (new Array(parseInt(padding))).fill(0).join("");
            for (let i = 0; i < parseInt(length); i++) {
                const url = template.replace("(*)", numeral(i + 1).format(format));
                list.push(url);
            }
            return list;
        }
        const query = props.match.params.query;

        if (query != null && query.length > 0) {
            const json = LZString.decompressFromEncodedURIComponent(query);
            const settings = JSON.parse(json);
            settings.list = createList(settings.template, settings.total, settings.length);
            dispatch(onSettingsChange(settings));
        }

        return {
            onChange: (e, field, settings) => {
                const newSettings = clone(settings);
                if (field !== "list") {
                    newSettings[field] = e.target.value;
                    newSettings.list = createList(newSettings.template, newSettings.total, newSettings.length);
                } else {
                    newSettings.list = e.target.value.trim().split("\n").map(_ => _.replace(/[\",]/g, "").trim())
                }
                dispatch(onSettingsChange(newSettings));
            },
            onNext: (e, index) => {
                e.preventDefault();
                e.stopPropagation();
                props.history.push(`/viewer/${index || 0}`);
            },
            onCreatePermLink: (e, settings) => {
                e.preventDefault();
                e.stopPropagation();
                const text = clone(settings);
                delete text.list;
                const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(text));
                copy(`${window.location}${compressed}`);
                props.history.push(`/${compressed}`);
            }
        }
    }
)(Home));
