import React from "react";

export default class InputTextFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterWord: "",
        }
    }

    render() {
        const filter = this.props.filter
        return (
            <div>
                <label><b>{filter.name}:</b></label>
                <input
                    name={filter.name}
                    value={this.state.filterWord}
                    onChange={e => {
                        this.setState({filterWord: e.target.value})
                        this.props.onChange(filter.name, filter.fun(e.target.value))
                    }}
                />
            </div>
        )
    }
}