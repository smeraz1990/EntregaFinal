export default class OrdenDTO {
    constructor({ usuarioid, _id, productos,fechaCreacion,status}) {
      this.usuarioid = usuarioid;
      this.id = _id.toString();
      this.productos = productos;
      this.fechaCreacion = fechaCreacion;
      this.status = status;
    }
  }