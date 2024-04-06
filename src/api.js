export default class API {
    constructor(base) {
        this.base = base;
    }

    async get(endpoint) {
        const response = await fetch(`${this.base}${endpoint}`);
        return response.json();
    }

    async getCategories() {
        return this.get("categories.php");
    }

    async getRandom() {
        return this.get("random.php");
    }
}