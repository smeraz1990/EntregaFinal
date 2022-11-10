import { faker } from '@faker-js/faker'
faker.locale = "es";

function generateUser() {
  return {
    username: String(faker.internet.email()),
    password: String(faker.internet.password()),
    nombre: String(faker.name.fullName()),
    direccion: String(faker.address.streetAddress()),
    edad: String(faker.datatype.number({min:18, max:50})),
    telefono: String(faker.phone.number()),
    avatar: String(faker.image.avatar())
  };
}
export default {
  generateUser,
};
