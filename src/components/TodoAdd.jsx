import React from "react";
import {validateTitle} from "../validators/validateTitle.js";
import {todoSeverity} from "../utils/todoSeverity.js";
import styles from "../assets/styles/todoAdd.module.css"

export class TodoAdd extends React.Component {

    constructor(args) {
        super(args);

        this.state = {title: "", descr: "", errors: "", severity: 1}
    }

    render() {
        return (
            <div className={styles.todoAddDiv}>
                <form className={styles.todoAdd} onSubmit={this.#handleTodoAdd}>
                    <input
                        className={styles.taskInput}
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
                        className={styles.taskInput}
                    />
                    <div className={styles.severityDiv}>
                        <label>
                            Severity:
                        </label>
                        <select
                            className={styles.severityInput}
                            onChange={(e) => {
                                this.setState({severity: +e.target.value})
                            }}
                        >
                            {Object.keys(todoSeverity).map(key =>
                                <option key={"addopt" + key} value={key}>{todoSeverity[key]}</option>)}
                        </select>
                    </div>
                    <div className={styles.errors}>{this.state.errors ? this.state.errors : ""}</div>
                    <button className={styles.buttonAdd}>add</button>
                </form>
                <button
                    className={styles.buttonAdd} onClick={this.props.onRemoveAll}>Remove all
                </button>
                <button
                    className={styles.buttonAdd} onClick={this.props.onGen1000Todos}>Gen 1000 Todos
                </button>
            </div>
        )
    }

    #handleTodoAdd = (e) => {
        const errors = validateTitle(this.state.title);
        if (errors.length) {
            this.setState({
                errors: errors
            })
            e.preventDefault();
        } else {
            this.props.onTodoAdd(this.state.title, this.state.descr, this.state.severity)
            this.setState({
                title: "",
                descr: "",
                errors: "",
                severity: 1
            })
        }
    }
}