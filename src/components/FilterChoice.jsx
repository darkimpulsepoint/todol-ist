import React from "react";
import CheckBoxFilter from "./filters/CheckBoxFilter.jsx";
import InputTextFilter from "./filters/InputTextFilter.jsx";
import MultiSelectFilter from "./filters/MultiSelectFilter.jsx";
import TodoListService from "../utils/TodoListService.js";
import {hashtagsOptsToCheckboxOpts, severitiesToCheckboxOpts} from "../utils/todoPropsToCheckboxOptions.js";
import styles from "../assets/styles/filters.module.css";
import TodoDB from "../db/TodoDB.js";

export default class FilterChoice extends React.Component {

    render() {
        return (
            <div className={styles.filterChoice}>
                <CheckBoxFilter
                    filter={{
                        name: "undone",
                        value: "undone",
                        fun: todos => todos.filter(todo => !todo.done)
                    }}
                    onAddFilter={this.props.onAddFilter}
                    onRemoveFilter={this.props.onRemoveFilter}
                />

                <InputTextFilter
                    filter={{
                        name: "search",
                        fun: searchWord => todos => todos.filter(todo => (todo.title.includes(searchWord) || todo.description.includes(searchWord)))
                    }}
                    onChange={this.props.onAddFilter}
                />
                <MultiSelectFilter
                    filter={{
                        name: "severity",
                        options: severitiesToCheckboxOpts(this.props.severities),
                        fun: severities => todos => {
                            if ((this.props.severities.length - TodoListService.uniqueSeveritiesOptions(
                                TodoDB.getAll()
                            ).length === severities.size) || !severities.size) {
                                this.props.onRemoveFilter("severity");
                                severities.clear()
                                return todos
                            } else return todos.filter(todo => severities.has(todo.severity))
                        }
                    }}
                    onChange={this.props.onAddFilter}
                />
                <MultiSelectFilter
                    filter={{
                        name: "hashtags",
                        options: hashtagsOptsToCheckboxOpts(this.props.hashtags),
                        fun: hashtags => todos => {
                            if (!hashtags.size) {
                                return todos
                            } else return todos.filter(todo => {
                                const todoHashtags = TodoListService.uniqueHashTagsOptions([todo])
                                return (new Set(hashtags).intersection(new Set(todoHashtags))).size !== 0
                            })
                        }
                    }}
                    onChange={this.props.onAddFilter}
                />
            </div>
        )
    }
}