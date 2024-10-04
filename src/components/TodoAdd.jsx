import React from "react";
import {validateTitle} from "../validators/validateTitle.js";

export class TodoAdd extends React.Component {

    constructor(args) {
        super(args);

        this.state = {title: "", descr: "", errors: ""}
    }


    handleTodoAdd = (e) => {
        const errors = validateTitle(this.state.title);
        if (errors.length) {
            this.setState({
                errors: errors
            })
            e.preventDefault();
        } else {
            this.props.onTodoAdd(this.state.title, this.state.descr)
            this.setState({
                title: "",
                descr: "",
                errors: ""
            })
        }
    }

    render() {
        return (
            <form className={"todoAdd"} onSubmit={this.handleTodoAdd}>
                <input
                    className={"task-input"}
                    placeholder="todo title"
                    onChange={(e) => {
                        this.setState({title: e.target.value})
                    }}
                />
                <input
                    placeholder="todo description"
                    onChange={(e) => {
                        this.setState({descr: e.target.value})
                    }}
                    className="task-input"
                />
                <div className="errors">{this.state.errors ? this.state.errors : ""}</div>
                <button className={"button-add"}>add</button>
            </form>
        )
    }
}