import { expect } from "chai";
import supertest from "supertest";
import userFactory from "./factory/user.factory.js";

let request;
let userId;
let carritoId;

describe("Testing user routes", () => {
  before(() => {
    request = supertest("http://localhost:3000");
  });

  describe("- POST /api/user", () => {
    const userToCreate = userFactory.generateUser();
    let response;

    it("Should return 201", async () => {
      response = await request
        .post("/api/user")
        .send({ ...userToCreate, password: "saymon" });
      expect(response.status).to.eql(201);
    });

    it("Should return the created user", () => {
      expect(response.body.username).to.eql(userToCreate.username);
      expect(response.body).to.keys("id", "username", "password");
      userId = response.body.id;
    });
  });

  describe("- POST /api/carrito", () => {
    let response;
    it("Should return 201", async () => {
      response = await request
        .post("/api/carrito")
        .send({usuarioid:userId});
      expect(response.status).to.eql(201);
    });

    it("Should return the created carrito", () => {
      expect(response.body.usuarioid).to.eql(userId);
      expect(response.body).to.keys("id", "usuarioid", "productos");
      carritoId = response.body.id;
    });
  });
});
