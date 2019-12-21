

export class LocalStorageService<T> {

    constructor(private key: string) {

    }

    saveToStorage(items: Array<T> | T) {
        const savedItems = localStorage.setItem(this.key, JSON.stringify(items));
        return savedItems;
    }

    getFromStorage(key?: string) {
        let savedItems;
        if (key != null) {
            savedItems = JSON.parse(localStorage.getItem(key));
        } else {
            savedItems = JSON.parse(localStorage.getItem(this.key));
        }
        return savedItems;
    }

    clearItemsFromLocalstorage(key?: string) {
        if (key != null) {
            const items = null;
            localStorage.setItem(key, JSON.stringify(items));

        } else {
            localStorage.clear();
        }

    }
}
