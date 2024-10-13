import TodoDB from "../db/TodoDB.js";

const tags = ["#first", "#last", "#second", "#third"]

export const createRandTodo = () => {
    const name = genRandStr()
    const descr = genRandStr() + " " + tags[Math.floor(Math.random() * 4)]
    const severity = Math.floor(1 + Math.random() * 3)

    TodoDB.create(name, descr, severity)
}

const genRandStr = () => Math.random().toString(36).substr(2, 9);