import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import numeral from "numeral";
import clone from "clone";
import { onSettingsChange } from "../actions/imagesActions";

const Home = ({ settings, index, onChange, onNext }) => {
    return (
        <div>
            <h1>Next Page</h1>

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
                    <button type="submit" class="btn btn-primary" onClick={e => onNext(e, index)}>Next</button>
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
        return {
            onChange: (e, field, settings) => {
                const newSettings = clone(settings);
                if (field !== "list") {
                    newSettings[field] = e.target.value;
                    const format = (new Array(parseInt(newSettings.length))).fill(0).join("");
                    let list = [];
                    for (let i = 0; i < parseInt(newSettings.total); i++) {
                        const url = newSettings.template.replace("(*)", numeral(i).format(format));
                        list.push(url);
                    }
                    newSettings.list = list;
                } else {
                    newSettings.list = e.target.value.trim().split("\n");
                }
                dispatch(onSettingsChange(newSettings));
            },
            onNext: (e, index) => {
                e.preventDefault();
                e.stopPropagation();
                props.history.push(`/viewer/${index || 0}`);
            }
        }
    }
)(Home));
