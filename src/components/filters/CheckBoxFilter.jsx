import React from "react"

export default class CheckBoxFilter extends React.PureComponent {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         checked: false,
    //     }
    // }

    render() {
        const filter = this.props.filter
        return (
            <div>
                <input
                    name={filter.name}
                    type="checkbox"
                    onChange={e => {
                        if (e.target.checked) {
                            this.props.onAddFilter(filter.value, filter.fun)
                        } else {
                            this.props.onRemoveFilter(filter.value)
                        }
                    }}
                />
                <label>{filter.name}</label>
            </div>
        )
    }
}