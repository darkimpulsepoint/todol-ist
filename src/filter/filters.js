export const getFilteredArr = (arr, filters) => {
    return filters.reduce((acc, filtFun) => filtFun(acc), arr)
}
