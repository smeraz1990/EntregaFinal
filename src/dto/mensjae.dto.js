export default class MensajesDTO {
    constructor({ username, _id, nombre,txtmensje,horaenvio,avatar},usuariolog) {

      this.username = username;
      this.id = _id.toString();
      this.nombre = nombre;
      this.txtmensje = txtmensje;
      this.horaenvio = horaenvio;
      this.avatar = avatar;
    }
  }