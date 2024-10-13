import React from "react";
import trashPng from "../assets/svg/trash.png"
import savePng from "../assets/svg/save.png"
import editPng from "../assets/svg/edit.png"
import {validateTitle} from "../validators/validateTitle.js";
import {todoSeverity} from "../utils/todoSeverity.js";
import styles from "../assets/styles/todo.module.css";
import todoAddStyles from "../assets/styles/todoAdd.module.css";

export class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            title: this.props.todo.title,
            description: this.props.todo.description,
            severity: this.props.todo.severity,
            errors: ""
        }
    }

    render() {
        const todoClassname = this.props.todo.done ? `${styles.todo} ${styles.done}` : styles.todo
        return (
            <div className={todoClassname}>
                <input
                    type="checkbox"
                    checked={this.props.todo.done}
                    onChange={() => this.props.onCheck(this.props.todo.id)}
                />
                <div>
                    {this.state.isEditing
                        ? <form className={styles.fields} onSubmit={this.#handleSaveTodo}>
                            <input
                                className={todoAddStyles.taskInput}
                                value={this.state.title}
                                onChange={(e) => {
                                    this.setState({title: e.target.value})
                                }}
                            />
                            <input
                                className={todoAddStyles.taskInput}
                                value={this.state.description}
                                onChange={(e) => {
                                    this.setState({description: e.target.value})
                                }}
                            />
                            <select
                                className={todoAddStyles.severityInput}
                                value={this.state.severity}
                                onChange={(e) => {
                                    this.setState({severity: e.target.value})
                                }}
                            >
                                {Object.keys(todoSeverity).map(severity =>
                                    <option key={"opt-edit" + severity}
                                            value={severity}>{todoSeverity[severity]}</option>
                                )}
                            </select>
                            <button style={{display: "none"}}/>
                        </form>
                        : <>
                            <h3 className={styles.infoText}>{this.props.todo.title}</h3>
                            <p className={styles.infoText}>{this.props.todo.description}</p>
                            <p>{todoSeverity[this.props.todo.severity]}</p>
                        </>
                    }
                    {this.state.errors ? <p className={"errors"}>{this.state.errors}</p> : <></>}
                    <p>created at {this.props.todo.timeCreated}</p>
                </div>
                <div className={styles.btns}>
                    <button onClick={() => {
                        return this.state.isEditing
                            ? this.#handleSaveTodo()
                            : this.setState({isEditing: true})
                    }
                    } className={styles.actionButton}>
                        {this.state.isEditing
                            ? <img className={styles.imgInBtn} src={savePng}/>
                            : <img className={styles.imgInBtn} src={editPng}/>}
                    </button>

                    <button
                        onClick={() => this.props.onDelete(this.props.todo.id)}
                        className={styles.actionButton}
                    >
                        <img className={styles.imgInBtn} src={trashPng}/>
                    </button>
                </div>
            </div>
        )
    }

    #handleSaveTodo = (e) => {
        if (e) e.preventDefault()
        const errors = validateTitle(this.state.title)
        if (errors) {
            this.setState({errors})
        } else {
            this.props.todo.title = this.state.title
            this.props.todo.description = this.state.description
            this.props.todo.severity = +this.state.severity

            this.props.onUpdateTodo(this.props.todo)

            this.setState({isEditing: false, errors: ""})
        }
    }
}