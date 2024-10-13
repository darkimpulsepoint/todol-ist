export default class TodoListService {
    static uniqueSeveritiesOptions = todos => {
        const severitiesUniqueValues = new Set()
        todos.forEach(todo => severitiesUniqueValues.add(todo.severity))

        return Array.from(severitiesUniqueValues);
    }

    static uniqueHashTagsOptions = todos => {
        const uniqueHashtags = new Set()
        todos.forEach(todo => {
            todo.description.split(" ").forEach(word => {
                if (word.startsWith("#") && word.length > 1) {
                    uniqueHashtags.add(word)
                }
            })
        })

        return Array.from(uniqueHashtags)
    }
}