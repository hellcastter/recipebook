export default class API {
  constructor(base) {
    this.base = base;
  }

  async get(endpoint) {
    const response = await fetch(`${this.base}${endpoint}`);
    return response.json();
  }

  async getCategories() {
    return this.get('categories.php');
  }

  async getRandom() {
    return this.get('random.php').then((data) => data.meals[0]);
  }

  async getMeal(id) {
    return this.get(`lookup.php?i=${id}`).then((data) => data.meals[0]);
  }
}
