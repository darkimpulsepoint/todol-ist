import React from "react";

export default class FilterChoice extends React.Component {
    render() {
        return (
            <div className={"filterChoice"}>
                {this.props.allFilters.map((filter) =>
                    <div key={filter.id}>
                        <input
                            name={filter.name}
                            type={filter.type}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    this.props.onAddFilter(filter.name)
                                } else {
                                    this.props.onRemoveFilter(filter.name)
                                }
                            }}
                        />
                        <label>{filter.name}</label>
                    </div>
                )}
            </div>
        )
    }
}