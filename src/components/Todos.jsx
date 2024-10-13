import React from "react";
import {Todo} from "./Todo.jsx";
import styles from '../assets/styles/todos.module.css'

export class Todos extends React.Component {
    render() {
        const todos = this.props.todos.map((todo) =>
            <Todo
                key={todo.id}
                todo={todo}
                onCheck={this.props.onCheck}
                onUpdateTodo={this.props.onUpdateTodo}
                onDelete={this.props.onTodoDelete}
            />
        )
        return (
            <div className={styles.todosDiv}>
                <h1>TODO LIST:</h1>
                <div className={styles.todos}>
                    {todos.length ? todos : "No results :("}
                </div>
            </div>
        )
    }
}