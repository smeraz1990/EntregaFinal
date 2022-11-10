export default class CarritoDTO {
    constructor({ usuarioid, _id, productos}) {
      this.usuarioid = usuarioid;
      this.id = _id;
      this.productos = productos;
    }
  }