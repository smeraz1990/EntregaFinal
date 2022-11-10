import { expect } from "chai";
import supertest from "supertest";
import productFactory from "./factory/product.factory.js";
import userFactory from "./factory/user.factory.js";

let request;
let token;

describe("Testing product routes", () => {
  before(async () => {
    request = supertest("http://localhost:3000");

    const postResponse = await request
      .post("/api/user")
      .send({ ...userFactory.generateUser(), password: "saymon" });

    const createdUser = postResponse.body;

    const response = await request
      .post("/api/user/login")
      .send({ username: createdUser.username, password: "saymon" });

    token = response.body.token;
  });

  describe("- POST /api/product", () => {
    const productToCreate = productFactory.generateProduct();
    //console.log('aqui vamos',productToCreate)
    let response;

    it("Should return 201", async () => {
      response = await request
        .post("/api/product")
        .set({ Authorization: `Bearer ${token}` })
        .send(productToCreate);

      expect(response.status).to.eql(201);
      //console.log('aqui vamos response',response)
      //console.log('aqui vamos create',productToCreate)
    });
    it("Should return the created product", () => {
      expect(response.body.name).to.eql(productToCreate.name);
      expect(response.body.price).to.eql(Number(productToCreate.price));
      expect(response.body.thumbnail).to.eql(String(productToCreate.thumbnail));
    });
  });
});
