export default class ProductDTO {
    constructor({ name, _id, price, thumbnail }) {
      this.name = name;
      this.id = _id.toString();
      this.price = price;
      this.thumbnail = thumbnail
    }
  }