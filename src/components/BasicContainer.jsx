import React from "react";
import TodoDB from "../db/TodoDB.js";
import {TodoAdd} from "./TodoAdd.jsx";
import {Todos} from "./Todos.jsx";
import {allFilters, getFilteredArr} from "../filter/filters.js";
import FilterChoice from "./FilterChoice.jsx";


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
            <div className={"container"}>
                <TodoAdd onTodoAdd={this.#handleTodoAdd}/>
                <FilterChoice
                    onAddFilter={this.#handleAddFilter}
                    onRemoveFilter={this.#handleRemoveFilter}
                    allFilters={Object.values(allFilters)}
                />
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
        )
    }

    #handleCheck = todoID => {
        const todo = this.state.todos.find(todo => todo.id === +todoID);
        todo.done = !todo.done
        TodoDB.saveAll(this.state.todos)
        this.updateTodosList()
    }

    #handleAddFilter = name => {
        const newFilters = {
            ...this.state.filters,
        }
        newFilters[name] = allFilters[name];

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

    #handleTodoAdd = (title, descr) => {
        TodoDB.create(title, descr);
        this.updateTodosList();
    }

    #handeleUpdateTodo = todo => {
        TodoDB.update(todo)
        this.updateTodosList()
    }
}