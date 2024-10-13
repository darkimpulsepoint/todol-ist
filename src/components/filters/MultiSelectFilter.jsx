import React from "react";
import CheckBoxFilter from "./CheckBoxFilter.jsx";

export default class MultiSelectFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: new Set(),
        }
    }

    render() {
        const filter = this.props.filter
        const els = filter.options.map(option => {
            return <CheckBoxFilter
                key={name + option.value}
                filter={{name: option.name, value: option.value}}
                onAddFilter={this.#handleAddOption}
                onRemoveFilter={this.#handleRemoveOption}
            />
        })
        return (
            <div className={"filter-option"}>
                <label><b>{filter.name}:</b></label>
                {
                    els.length ? els : "empty"
                }
            </div>
        )
    }

    #handleAddOption = option => {
        this.state.selected.add(option)
        this.props.onChange(this.props.filter.name, this.props.filter.fun(this.state.selected))

    }

    #handleRemoveOption = option => {
        this.state.selected.delete(option)
        this.props.onChange(this.props.filter.name, this.props.filter.fun(this.state.selected))
    }
}