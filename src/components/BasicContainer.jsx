import React from "react";
import TodoDB from "../db/TodoDB.js";
import {TodoAdd} from "./TodoAdd.jsx";
import {Todos} from "./Todos.jsx";
import {getFilteredArr} from "../filter/filters.js";
import FilterChoice from "./FilterChoice.jsx";
import TodoListService from "../utils/TodoListService.js";
import styles from "../assets/styles/app.module.css"
import {createRandTodo} from "../utils/createRandTodo.js";


export class BasicContainer extends React.Component {

    constructor(args) {
        super(args);
        this.state = {
            todos: TodoDB.getAll(),
            filters: []
        }
    }

    updateTodosList = () => {
        this.setState({todos: TodoDB.getAll()})
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.container__left}>
                    <FilterChoice
                        onAddFilter={this.#handleAddFilter}
                        onRemoveFilter={this.#handleRemoveFilter}
                        hashtags={TodoListService.uniqueHashTagsOptions(TodoDB.getAll())}
                        severities={TodoListService.uniqueSeveritiesOptions(TodoDB.getAll())}
                    />
                </div>
                <div className={styles.mainContainer}>
                    <TodoAdd
                        onTodoAdd={this.#handleTodoAdd}
                        onRemoveAll={this.#handleRemoveAllTodos}
                        onGen1000Todos={this.#handleGen1000Todos}/>
                    <Todos todos={getFilteredArr(
                        this.state.todos,
                        Object.values(this.state.filters)
                    ).sort((a, b) => a.done - b.done)
                    }
                           onCheck={this.#handleCheck}
                           onTodoDelete={this.#handleTodoDelete}
                           onUpdateTodo={this.#handeleUpdateTodo}
                    />
                </div>
            </div>
        )
    }

    #handleCheck = todoID => {
        const todo = this.state.todos.find(todo => todo.id === +todoID);
        todo.done = !todo.done
        TodoDB.saveAll(this.state.todos)
        this.updateTodosList()
    }

    #handleAddFilter = (name, func) => {
        const newFilters = {
            ...this.state.filters,
        }
        newFilters[name] = func;

        this.setState({
            filters: newFilters
        })
    }

    #handleRemoveFilter = name => {
        const newFilters = {
            ...this.state.filters,
        }
        delete newFilters[name]

        this.setState({
            filters: newFilters
        })
    }

    #handleTodoDelete = id => {
        TodoDB.remove(id)
        this.updateTodosList()
    }

    #handleTodoAdd = (title, descr, severity) => {
        TodoDB.create(title, descr, severity);
        this.updateTodosList();
    }

    #handeleUpdateTodo = todo => {
        TodoDB.update(todo)
        this.updateTodosList()
    }

    #handleRemoveAllTodos = () => {
        TodoDB.removeAll()
        this.updateTodosList()
    }

    #handleGen1000Todos = () => {
        Array(1000).fill(0)
            .forEach(el => {
                    createRandTodo()
                }
            )
        this.updateTodosList()
    }
}