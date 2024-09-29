import React from "react";
import trashPng from "../assets/trash.png"
import savePng from "../assets/save.png"
import editPng from "../assets/edit.png"
import {validateTitle} from "../validators/validateTitle.js";

export class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            title: this.props.todo.name,
            description: this.props.todo.description,
            errors: ""
        }
    }

    render() {
        return (
            <div className={this.props.todo.done ? "todo done" : "todo"}>
                <input
                    type="checkbox"
                    checked={this.props.todo.done}
                    onChange={() => this.props.onCheck(this.props.todo.id)}
                />
                <div className={"info"}>
                    {this.state.isEditing
                        ? <form className={"editForm"} onSubmit={this.#handleSaveTodo}><input value={this.state.title}
                                                                                              onChange={(e) => {
                                                                                                  this.setState({title: e.target.value})
                                                                                              }}
                        />
                            <input value={this.state.description}
                                   onChange={(e) => {
                                       this.setState({description: e.target.value})
                                   }}
                            />
                            <button style={{display: "none"}}/>
                        </form>
                        : <>
                            <h3>{this.props.todo.name}</h3>
                            <p>{this.props.todo.description}</p>
                        </>
                    }
                    {this.state.errors ? <p className={"errors"}>{this.state.errors}</p> : <></>}
                    <p>created at {this.props.todo.timeCreated}</p>
                </div>
                <div>
                    <button onClick={() => this.state.isEditing
                        ? this.#handleSaveTodo()
                        : this.setState({isEditing: true})
                    } className={"editButton"}>
                        {this.state.isEditing ? <img src={savePng}/> : <img src={editPng}/>}
                    </button>

                    <button onClick={() => this.props.onDelete(this.props.todo.id)} className={"deleteButton"}>
                        <img src={trashPng}/>
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
            this.props.todo.name = this.state.title
            this.props.todo.description = this.state.description
            this.props.onUpdateTodo(this.props.todo)
            this.setState({isEditing: false, errors: ""})
        }
    }
}