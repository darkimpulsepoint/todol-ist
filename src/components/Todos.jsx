import React from "react";
import {Todo} from "./Todo.jsx";

export class Todos extends React.Component {
    render() {
        return (
            <div className="todosDiv">
                <h1>TODO LIST:</h1>
                <div className={"todos"}>
                    {this.props.todos.map((todo) => {
                            return (
                                <Todo
                                    key={todo.id}
                                    todo={todo}
                                    onCheck={this.props.onCheck}
                                    onUpdateTodo={this.props.onUpdateTodo}
                                    onDelete={this.props.onTodoDelete}
                                />
                            )
                        }
                    )}
                </div>
            </div>
        )
    }
}