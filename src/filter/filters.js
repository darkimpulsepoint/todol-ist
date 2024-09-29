export const allFilters = {
    undone: {
        id: "isTodoUndone:",
        name: "undone",
        type: "checkbox",
        fun: todos => todos.filter(todo => !todo.done)
    }
}

export const getFilteredArr = (arr, filters) => {
    return filters.reduce((acc, filt) => filt.fun(acc), arr)
}