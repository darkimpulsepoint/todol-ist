export class LocalStorageService {

    static setItem = (key, value) => {
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    static getItem = key => JSON.parse(window.localStorage.getItem(key)) || null

    static removeItem = key => {
        window.localStorage.removeItem(key)
    }
}