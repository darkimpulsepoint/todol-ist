import {LocalStorageService} from "./LocalStorageService.js";

export default class TodoDB {
    static create = (title, description, severity) => {
        const todos = LocalStorageService.getItem("todos") || []
        let lastID = +LocalStorageService.getItem("lastID") || 0

        const todo = {
            id: ++lastID,
            title,
            description,
            severity,
            timeCreated: new Date().toLocaleString(),
            done: false
        }

        const uniqueHashtags = new Set()
        todo.description.split().forEach(word => {
                if (word.startsWith("#")) {
                    uniqueHashtags.add(word)
                }
            })
        todos.push(todo)

        LocalStorageService.setItem("todos", todos)
        LocalStorageService.setItem("lastID", lastID)

        return todo;
    }

    static getById = id => {
        return LocalStorageService.getItem('todos').find(item => item.id === id)
    }

    static saveAll = todos => {
        LocalStorageService.setItem("todos", todos)
    }

    static getAll = () => {
        return LocalStorageService.getItem("todos") || []
    }

    static update = todo => {
        let todos = LocalStorageService.getItem("todos")
        if (!this.getById(todo.id)) {
            todos.push(todo)
        } else {
            todos = todos.map(t => t.id === todo.id ? todo : t)
        }

        LocalStorageService.setItem("todos", todos)
    }

    static remove = id => {
        const todos = LocalStorageService.getItem("todos")
        LocalStorageService.setItem("todos", todos.filter(item => item.id !== id))
    }

    static removeAll = () => {
        console.log("remo")
        LocalStorageService.setItem("todos", [])
    }
}