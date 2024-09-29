export const validateTitle = title => {
    return (!title.length || title.length !== title.trim().length) ? "Title cant be empty or start(end) with space!" : ""
}